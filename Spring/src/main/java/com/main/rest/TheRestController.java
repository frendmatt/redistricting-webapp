package com.main.rest;

import com.fasterxml.jackson.databind.ser.std.JsonValueSerializer;
import com.main.fileserver.DistrictingFileManager;
import com.main.fileserver.GeoFileManager;
import com.main.enums.*;
import com.main.fileserver.IncumbentManager;
import com.main.fileserver.JobManager;
import com.main.fileserver.models.DistrictFile;
import com.main.fileserver.models.DistrictingFile;
import com.main.fileserver.models.DistrictingObjectiveFile;
import com.main.helper.ConversionHelper;
import com.main.rest.models.AverageDistricting;
import com.main.rest.models.Weights;
import com.main.rest.models.Constraints;
import com.main.helper.PrintHelper;
import com.sun.xml.bind.v2.runtime.unmarshaller.XsiNilLoader;
import org.json.JSONArray;
import com.main.mysql.models.Districting;
import com.main.mysql.models.Job;
import com.main.mysql.models.Precinct;
import com.main.mysql.models.State;
import com.main.mysql.models.ids.DistrictingId;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONStringer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.math.BigInteger;
import java.util.*;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "api/v1")
@CrossOrigin(origins = "http://localhost:3000")
public class TheRestController
{
    @Autowired
    private final HttpSession httpSession = null;

    /*@Autowired
    private final TheService theService = null;*/

    /*
    Things that are in the httpsession:
    SateCode state
    Job job
    Districting districting
    Constraints constraints
    Map<Integer, Float> averageRace
    Map<Integer, Float> averageParty
    ArrayList<Districting> filteredDistrictings
    Map<Integer, Float> weights
     */

    @Autowired
    public TheRestController()
    {
    }

    //Getting Session
    @GetMapping(path = "/session")
    public String session()
    {
        //Reset Single Session
        SingleSession.setInstance(new SingleSession());

        return "{}";
    }

    //Indicates selection of state
    @PostMapping(path = "/changeState/{stateCode}")
    public String changeState(@PathVariable("stateCode") int stateCode)
    {
        StateCode state = StateCode.values()[stateCode];
        httpSession.setAttribute("state", state);
        return httpSession.getAttribute("state").toString();
    }

    //Returns districtGeometry JSON
    @GetMapping(path = "/getEnactedGeometry/{stateCode}", produces = "application/json")
    public String getEnactedGeometry(@PathVariable("stateCode") int stateCode) throws Exception
    {
        DistrictingFile enacted = DistrictingFileManager.getEnacted(stateCode);
        SingleSession.getInstance().setEnacted(enacted);
        return GeoFileManager.getEnactedGeometry(stateCode);
    }

    //Returns countyGeometry JSON
    @GetMapping(path = "/getCountyGeometry/{stateCode}", produces = "application/json")
    public String getCountyGeometry(@PathVariable("stateCode") int stateCode) throws Exception
    {
        return GeoFileManager.getCountyGeometry(stateCode);
    }

    //Returns precinctGeometry JSON
    @GetMapping(path = "/getPrecinctGeometry/{stateCode}", produces = "application/json")
    public String getPrecinctGeometry(@PathVariable("stateCode") int stateCode) throws Exception
    {
        return GeoFileManager.getPrecinctGeometry(stateCode);
    }

    /*//Returns precinct info
    @GetMapping(path = "/getPrecinctInfo/{precinct}", produces = "application/json")
    public Precinct getPrecinctInfo(@PathVariable("precinct") String precinct)
    {
        return theService.getPrecinctByName(precinct);
    }*/

    @GetMapping(path = "/getDistrictInfo/{jobId}/{districting}/{district}", produces = "application/json")
    public DistrictFile getPrecinctInfo(@PathVariable("jobId") int jobid,@PathVariable("districting") int districtingId, @PathVariable("district") int district) throws IOException {
        DistrictingFile districting = DistrictingFileManager.getDistrictingFile(jobid,districtingId);
        return districting.districts.get(district);
    }

    //Returns jobSummary JSON
    @GetMapping(path = "/getJobs/{stateCode}", produces = "application/json")
    public List<Job> getJobs(@PathVariable("stateCode") int stateCode)
    {
        return JobManager.getJobsOfState(StateCode.values()[stateCode]);
    }

    @PostMapping(path = "/applyConstraints/{jobID}", consumes = "application/json", produces = "application/json")
    public String applyConstraints(@PathVariable("jobID") int jobID, @RequestBody Constraints constraints) throws Exception
    {
        var job = JobManager.getJobById(jobID);
        HashMap<String, Integer> incumbents = IncumbentManager.getIncumbentByState(job.getStateCode());
        int num_districts;
        if(job.getStateCode() == StateCode.nc)
            num_districts = 13;
        else
            num_districts = 14;

        ArrayList<Integer> protect = constraints.getIncumbents();

        List<DistrictingFile> ret = Collections.synchronizedList(new ArrayList<DistrictingFile>());
        AtomicInteger removedByCompactness = new AtomicInteger(0);
        AtomicInteger removedByPopulationEquality = new AtomicInteger(0);
        AtomicInteger removedByIncumbent = new AtomicInteger(0);
        AtomicInteger removedByMajMin = new AtomicInteger(0);
        int size = job.getNumDistrictings();

        ArrayList<Integer> positions = new ArrayList<Integer>(size);
        for(int i = 0; i < size; i++) {
            positions.add(i);
        }

        SingleSession.getInstance().setConstrainedDistrictings(null);
        SingleSession.getInstance().setConstraints(constraints);

        positions.parallelStream().forEach(positionId ->
        {
            try
            {
                if(ret.size() > 15000)
                    return;

                DistrictingFile temp = DistrictingFileManager.getDistrictingFile(jobID, positionId);

                if (constraints.compactness != 0 && temp.measures.compactness.get(CompactnessType.GRAPH_COMPACTNESS) < constraints.compactness)
                {
                    removedByCompactness.getAndIncrement();
                    //PrintHelper.printWithTime("FOUND BAD COMPACTNESS: " + temp.measures.compactness.get(CompactnessType.GRAPH_COMPACTNESS) + ">=" + constraints.compactness);
                    return;
                }
                if (temp.measures.populationDifferences.get(constraints.populationType) > constraints.populationEquality)
                {
                    removedByPopulationEquality.getAndIncrement();
                    //PrintHelper.printWithTime("FOUND BAD POPDIF: " + temp.measures.populationDifferences.get(constraints.populationType) + "<=" + constraints.populationEquality);
                    return;
                }
                boolean exit = false;
                int mm = 0;
                for (int j = 0; j < num_districts; j++)
                {
                    DistrictFile d = temp.districts.get(j);
                    if ((((float) d.populations.minorities.get(constraints.minority) / (float) d.populations.populationType.get(PopulationType.TOTAL)) >= constraints.minorityPercentThreshold))
                    {
                        mm++;
                    }
                    if (protect.size() != 0 && d.incumbents.size() > 1)
                    {
                        for (String x : d.incumbents)
                        {
                            if (protect.contains(incumbents.get(x)))
                            {

                                exit = true;
                                break;
                            }
                        }
                        if (exit)
                        {
                            break;
                        }
                    }

                }
                if (exit)
                {
                    removedByIncumbent.getAndIncrement();
                    //PrintHelper.printWithTime("FOUND BAD INCUMBENT");
                    return;
                }

                if (mm < constraints.majorityMinorityDistricts)
                {
                    removedByMajMin.getAndIncrement();
                    //PrintHelper.printWithTime(Integer.toString(mm));
                    return;
                }

                temp.majorityMinority = mm;

                //PrintHelper.printWithTime(Integer.toString(positionId) + " (" + ret.size() + ")");
                synchronized (ret)
                {
                    ret.add(temp);
                }
            } catch (Exception e)
            {
                PrintHelper.printWithTime("AHHHH\n" + e.toString());
            }
        });

        if(ret.size() >= 50 && ret.size() <= 15000)
        {
            SingleSession.getInstance().setConstrainedDistrictings(new ArrayList(ret));
            SingleSession.getInstance().setConstraints(constraints);
            averageDistricting();
        }
        JSONObject returnJson = new JSONObject();
        returnJson.put("total",size);
        returnJson.put("removedByCompactness",removedByCompactness.get());
        returnJson.put("removedByPopulationEquality",removedByPopulationEquality.get());
        returnJson.put("removedByIncumbent",removedByIncumbent.get());
        returnJson.put("removedByMajMin",removedByMajMin.get());
        returnJson.put("constrainedDistrictings",ret.size());

        PrintHelper.printWithTime("total: " + size);
        PrintHelper.printWithTime("removedByCompactness: " + removedByCompactness.get());
        PrintHelper.printWithTime("removedByPopulationEquality: " + removedByPopulationEquality.get());
        PrintHelper.printWithTime("removedByIncumbent: " + removedByIncumbent.get());
        PrintHelper.printWithTime("removedByMajMin: " + removedByMajMin.get());
        PrintHelper.printWithTime("constrainedDistrictings: " + ret.size());
        return returnJson.toString();
    }

    @PostMapping(path = "/applyWeights", consumes = "application/json", produces = "application/json")
    public List<DistrictingFile> applyWeights(@RequestBody Weights weights) throws Exception
    {
        var constrainedDistrictings = SingleSession.getInstance().getConstrainedDistrictings();
        var constraints = SingleSession.getInstance().getConstraints();

        for (DistrictingFile constrainedDistricting : constrainedDistrictings)
        {
            float equalPopulations = constrainedDistricting.measures.equalPopulations.get(constraints.populationType) * weights.populationEquality;
            //float deviationAverage = ((constrainedDistricting.measures.deviationAverageGeo * weights.deviationEnacted) + (constrainedDistricting.measures.deviationAveragePop.get(constraints.populationType))) / 2;
            float deviationAverage = constrainedDistricting.measures.deviationAveragePop.get(constraints.minority) * weights.deviationAverage;
            float deviationEnacted = ((constrainedDistricting.measures.deviationEnactedGeo * weights.deviationEnacted) + (constrainedDistricting.measures.deviationEnactedPop.get(constraints.populationType) * weights.deviationEnacted)) / 2;
            float compactness = constrainedDistricting.measures.compactness.get(CompactnessType.GRAPH_COMPACTNESS) * weights.compactness;
            float splitCounties = constrainedDistricting.measures.splitCounties * weights.splitCounties;
            float efficiencyGap = constrainedDistricting.measures.politicalFairness * weights.politicalFairness;
            float total = equalPopulations + deviationAverage + deviationEnacted + compactness + splitCounties + efficiencyGap;

            constrainedDistricting.objectiveScores = new DistrictingObjectiveFile(total, equalPopulations, deviationAverage, deviationEnacted, compactness, splitCounties, efficiencyGap);
        }

        List<DistrictingFile> result = new ArrayList<>();

        Collections.sort(constrainedDistrictings, new Comparator<DistrictingFile>() {
            @Override
            public int compare(DistrictingFile t, DistrictingFile t1) {
                return Float.compare(t1.objectiveScores.total, t.objectiveScores.total);
            }
        });

        //+10: top 10 objective scores
        int size = result.size() + 10;
        for(int i = 0; result.size() < size && i < constrainedDistrictings.size(); i++)
        {
            result.add(constrainedDistrictings.get(i));
        }
        //PrintHelper.printWithTime("+10: "  + result.size());

        //+1: lowest objective score
        if (!result.contains(constrainedDistrictings.get(constrainedDistrictings.size()-1)))
        {
            result.add(constrainedDistrictings.get(constrainedDistrictings.size()-1));
        }
        //PrintHelper.printWithTime("+1: "  + result.size());

        //+2: middle objective scores
        size = result.size() + 2;
        for (int i=0; result.size() < size && i < constrainedDistrictings.size(); i++){
            if (!result.contains(constrainedDistrictings.get(constrainedDistrictings.size()/2-i)))
            {
                result.add(constrainedDistrictings.get(constrainedDistrictings.size()/2-i));
            }
        }
        //PrintHelper.printWithTime("+2: "  + result.size());



        Collections.sort(constrainedDistrictings, new Comparator<DistrictingFile>() {
            @Override
            public int compare(DistrictingFile t, DistrictingFile t1) {
                return Float.compare(t1.objectiveScores.deviationEnacted, t.objectiveScores.deviationEnacted);
            }
        });

        //+3: top 3 deviation enacted
        size = result.size() + 3;
        for(int i = 0; result.size() < size && i < constrainedDistrictings.size(); i++)
        {
            if(!result.contains(constrainedDistrictings.get(i)))
                result.add(constrainedDistrictings.get(i));
        }
        //PrintHelper.printWithTime("+3: "  + result.size());

        //+5: different area pair (based on deviation enacted values ordered)
        size = result.size() + 5;
        for(int i = 1; result.size() < size && i < constrainedDistrictings.size(); i++)
        {
            if(!result.contains(constrainedDistrictings.get(constrainedDistrictings.size()/i-1)))
                result.add(constrainedDistrictings.get(constrainedDistrictings.size()/i-1));
        }
        //PrintHelper.printWithTime("+5: "  + result.size());

        Collections.sort(constrainedDistrictings, new Comparator<DistrictingFile>() {
            @Override
            public int compare(DistrictingFile t, DistrictingFile t1) {
                return Float.compare(t1.objectiveScores.deviationAverage, t.objectiveScores.deviationAverage);
            }
        });

        //+3: top 3 deviation average
        size = result.size() + 3;
        for(int i = 0; result.size() < size && i < constrainedDistrictings.size(); i++)
        {
            if(!result.contains(constrainedDistrictings.get(i)))
                result.add(constrainedDistrictings.get(i));
        }
        //PrintHelper.printWithTime("+3: "  + result.size());

        PrintHelper.printWithTime("Districtings To Show: "  + result.size());
        return result;
    }

    @PostMapping(path = "/calculateAverageDistricting", produces = "application/json")
    public String averageDistricting() throws IOException, JSONException {
        ArrayList<DistrictingFile> districtings = SingleSession.getInstance().getConstrainedDistrictings();
        Constraints constraints = SingleSession.getInstance().getConstraints();
        DistrictingFile enacted = SingleSession.getInstance().getEnacted();
        AverageDistricting d = new AverageDistricting(districtings,constraints.minority,enacted);
        SingleSession.getInstance().setAverageDistricting(d);
        return d.toJSON().toString();
    }

    @GetMapping(path = "/calculateAverageDistrictingCurrent/{job}/{districtingId}", produces = "application/json")
    public String averageDistrictingCurrent(@PathVariable("districtingId") int districtingId,@PathVariable("job") int jobid) throws IOException, JSONException {
        DistrictingFile districting = DistrictingFileManager.getDistrictingFile(jobid,districtingId);
        AverageDistricting ad = SingleSession.getInstance().getAverageDistricting();
        if (ad == null) {
            averageDistricting();
            ad = SingleSession.getInstance().getAverageDistricting();
        }
        ArrayList<DistrictFile> dfs = ad.orderDistricts(districting);
        JSONArray jsonArray = ad.toJSON();
        for(int i=0; i<jsonArray.length(); i++){
            float value = ad.getMinorityValue(dfs.get(i));
            JSONObject j = jsonArray.getJSONObject(i);
            j.put("current",value);
            jsonArray.put(i,j);
        }
        return jsonArray.toString();
    }

    @GetMapping(path = "/getDistrictingRows/{job}/{districtingId}", produces = "application/json")
    public String getDistrictingRows(@PathVariable("districtingId") int districtingId,@PathVariable("job") int jobid) throws IOException, JSONException {
        DistrictingFile districting = DistrictingFileManager.getDistrictingFile(jobid,districtingId);
        JSONArray ret = new JSONArray();
        Constraints constraints = SingleSession.getInstance().getConstraints();
        for (int i=0;i<districting.districts.size();i++){
            DistrictFile district = districting.districts.get(i);
            JSONObject j = new JSONObject();
            j.put("id",i+1);
            j.put("equalPopulationScore",district.measures.equalPopulations.get(constraints.populationType));
            float devEn = district.measures.deviationEnactedGeo + district.measures.deviationEnactedPop.get(constraints.populationType);
            devEn/=2;
            j.put("deviationEnactedScore",devEn);
            j.put("compactnessScore",district.measures.compactness.get(constraints.compactnessType));
            ret.put(j);
        }
        return ret.toString();
    }

    @GetMapping(path = "/getEqualPopulationDetail/{job}/{districting}", produces = "application/json")
    public String getEqualPopulationDetail(@PathVariable("job") int jobId,@PathVariable("districting") int districtig_position_id) throws Exception {
        DistrictingFile districting = DistrictingFileManager.getDistrictingFile(jobId,districtig_position_id);
        Constraints constraints = SingleSession.getInstance().getConstraints();
        JSONObject ret = new JSONObject();
        JSONArray over = new JSONArray();
        JSONArray districts = new JSONArray();
        PopulationType popType = PopulationType.valueOf(constraints.populationType.name());
        for(int i=0;i<districting.districts.size();i++){
            DistrictFile d = districting.districts.get(i);
            int pop = d.populations.populationType.get(popType);
            long dif = d.measures.equalPopulationsDif.get(constraints.populationType);
            float per = d.measures.equalPopulationsPer.get(constraints.populationType);
            float obj = d.measures.equalPopulations.get(constraints.populationType);
            if (per>constraints.populationEquality){
                over.put(i);
            }
            JSONObject j = new JSONObject();
            j.put("population",pop);
            j.put("difference",dif);
            j.put("percent",per);
            j.put("measure",obj);
            districts.put(j);
        }
        ret.put("bad_districts",over);
        ret.put("breakdown",districts);
        return ret.toString();
    }

    @GetMapping(path = "/getPoliticalFairnessDetail/{job}/{districting}", produces = "application/json")
    public String getPoliticalFairnessDetail(@PathVariable("job") int jobId,@PathVariable("districting") int districtig_position_id) throws Exception {
        DistrictingFile districting = DistrictingFileManager.getDistrictingFile(jobId,districtig_position_id);
        JSONArray ret = new JSONArray();
        DistrictingFile enacted = SingleSession.getInstance().getEnacted();
        for(int i=0; i<districting.districts.size(); i++){
            DistrictFile d = districting.districts.get(i);
            DistrictFile ed = enacted.districts.get(i);
            long wastedDem = d.measures.wastedVotes.get(Party.DEMOCRAT);
            long wastedRep = d.measures.wastedVotes.get(Party.REPUBLICAN);
            long wastedEDem = ed.measures.wastedVotes.get(Party.DEMOCRAT);
            long wastedERep = ed.measures.wastedVotes.get(Party.REPUBLICAN);
            JSONObject j = new JSONObject();
            j.put("district_dem",wastedDem);
            j.put("district_rep",wastedRep);
            j.put("enacted_dem",wastedEDem);
            j.put("enacted_rep",wastedERep);
            ret.put(j);
        }
        return ret.toString();
    }

    @GetMapping(path = "/getDeviationEnactedDetail/{job}/{districting}", produces = "application/json")
    public String getDeviationEnactedArea(@PathVariable("job") int jobId,@PathVariable("districting") int districtig_position_id) throws Exception {
        DistrictingFile districting = DistrictingFileManager.getDistrictingFile(jobId,districtig_position_id);
        JSONArray ret = new JSONArray();
        DistrictingFile enacted = SingleSession.getInstance().getEnacted();
        Constraints constraints = SingleSession.getInstance().getConstraints();
        for(int i=0; i<districting.districts.size(); i++){
            DistrictFile d = districting.districts.get(i);
            double dif = d.measures.deviationEnactedGeoDif;
            double per = d.measures.deviationEnactedGeoPer;
            double popDif = d.measures.deviationEnactedPopDif.get(constraints.populationType);
            double popPer = d.measures.deviationEnactedPopPer.get(constraints.populationType);
            JSONObject j = new JSONObject();
            j.put("geoDif",dif);
            j.put("geoPer",per);
            j.put("popDif",popDif);
            j.put("popPer",popPer);
            ret.put(j);
        }
        return ret.toString();
    }

    @GetMapping(path = "/getMajorityMinorityDetail/{job}/{districting}", produces = "application/json")
    public String getMajorityMinorityDetail(@PathVariable("job") int jobId,@PathVariable("districting") int districtig_position_id) throws Exception {
        DistrictingFile districting = DistrictingFileManager.getDistrictingFile(jobId,districtig_position_id);
        JSONArray ret = new JSONArray();
        DistrictingFile enacted = SingleSession.getInstance().getEnacted();
        Constraints constraints = SingleSession.getInstance().getConstraints();
        for(int i=0; i<districting.districts.size(); i++){
            DistrictFile d = districting.districts.get(i);
            double total = d.populations.populationType.get(PopulationType.TOTAL);
            double minority = d.populations.minorities.get(constraints.minority);
            double percent = minority/total;
            boolean is_maj_min = percent>=constraints.minorityPercentThreshold;
            JSONObject j = new JSONObject();
            j.put("total",total);
            j.put("minority",minority);
            j.put("percent",percent);
            j.put("isMajMin",is_maj_min);
            ret.put(j);
        }
        return ret.toString();
    }



    @GetMapping(path = "/getSplitCountyDetail/{state}/{job}/{districting}", produces = "application/json")
    public String getSplitCountyDetail(@PathVariable("state") int statecode,@PathVariable("job") int jobId,@PathVariable("districting") int districtig_position_id) throws Exception {
        List<String> counties = DistrictingFileManager.getDistrictingFile(jobId,districtig_position_id).measures.splitCountiesList;
        ArrayList<String> countiesFormatted = new ArrayList<String>();
        String countyGeo = GeoFileManager.getCountyGeometry(statecode);
        JSONObject geoAsJson = new JSONObject(countyGeo);
        int numFeatures = geoAsJson.getJSONArray("features").length();
        JSONArray countiesList = new JSONArray();
        for (int i=numFeatures-1; i>=0; i--){
            JSONObject feature = geoAsJson.getJSONArray("features").getJSONObject(i);
            String county = (String) feature.getJSONObject("properties").get("county");
            if (!counties.contains(county.toLowerCase())){
                geoAsJson.getJSONArray("features").remove(i);
            }
            else {
                countiesFormatted.add(county);
            }
        }
        Collections.sort(countiesFormatted);
        JSONObject ret = new JSONObject();
        ret.put("geometry",geoAsJson);
        ret.put("names", new JSONArray(countiesFormatted));
        return ret.toString();
    }


    @PostMapping(path = "/averageParty", consumes = "application/json", produces = "application/json")
    public Map<Integer, ArrayList<Float>> averageParty(@RequestBody Party party)
    {
        // TODO
        return null;
    }

    @PostMapping(path = "/averageRace", consumes = "application/json", produces = "application/json")
    public Map<Integer, ArrayList<Float>> averageRace(@RequestBody Minority race)
    {
        // TODO
        return null;
    }

    //Returns districtingsJSON
    @PostMapping(path = "/topDistrictings/{jobID}", consumes = "application/json", produces = "application/json")
    public String topDistrictings(@PathVariable("jobID") int jobID, @RequestBody(required = false) Weights weights) throws Exception
    {
        //ignore weights for now
        JSONObject obj = new JSONObject();
        for (int i = 0; i < 20; i++)
        {
            DistrictingFile temp = SingleSession.getInstance().getConstrainedDistrictings().get((int)(Math.random() * SingleSession.getInstance().getConstrainedDistrictings().size()));
            String id = Integer.toString(temp.id);
            id = "Districting_" + id;
            String jsonString = GeoFileManager.getDistrictingSummary(jobID, id);
            JSONObject districtObj = new JSONObject(jsonString);
            obj.put(id, districtObj);
        }
        return obj.toString();
    }

    @PostMapping(path = "/createQueryString", consumes = "application/json", produces = "application/json")
    public String createQueryString(@RequestBody Constraints constraints, @RequestBody State state, @RequestBody Job job)
    {
        // TODO
        return "";
    }

    //Returns void
    @PostMapping(path = "/averageDistrictings", consumes = "application/json", produces = "application/json")
    public void averageDistrictings(@RequestBody ArrayList<Districting> districtings)
    {
        // TODO
    }

    @PostMapping(path = "/sort", consumes = "application/json", produces = "application/json")
    public ArrayList<Districting> sort(@RequestBody ArrayList<Districting> districtings, @RequestBody Measures measure)
    {
        // TODO
        return null;
    }

    //alias: getDistrictingInfo
    //returns districtingJSON
    @PostMapping(path = "/getDistricting", consumes = "application/json", produces = "application/json")
    public String getDistricting(@RequestBody int id)
    {
        // TODO
        return "";
    }

    @PostMapping(path = "/getEqualPopulation", consumes = "application/json", produces = "application/json")
    public String getEqualPopulation(@RequestBody int districtingID)
    {
        // TODO
        return "";
    }

    //returns 'results' JSON (SD 17)
    @PostMapping(path = "/getEnactedDeviation", consumes = "application/json", produces = "application/json")
    public String getEnactedDeviation(@RequestBody int districtingID)
    {
        // TODO
        return "";
    }

    @PostMapping(path = "/getMeans", consumes = "application/json", produces = "application/json")
    public List<Integer> getMeans(@RequestBody List<List<Integer>> districtingPops)
    {
        // TODO
        return null;
    }

    @PostMapping(path = "/getClosestDistricting", consumes = "application/json", produces = "application/json")
    public int getClosestDistricting(@RequestBody List<List<Integer>> districtingPops, @RequestBody List<Integer> means)
    {
        // TODO
        return 0;
    }

    @PostMapping(path = "/getBoxAndWhisker", consumes = "application/json", produces = "application/json")
    public List<List<Integer>> getBoxAndWhisker(@RequestBody List<List<Integer>> districtingPops)
    {
        // TODO
        return null;
    }

    @PostMapping(path = "/popDeviation", consumes = "application/json", produces = "application/json")
    public float populationDeviation(@RequestBody boolean enacted, @RequestBody AllPopulations type, @RequestBody int districtingID)
    {
        // TODO
        return 0;
    }

    //Returns popDeviationsJSON
    @PostMapping(path = "/areaSummary", consumes = "application/json", produces = "application/json")
    public String areaSummary(@RequestBody int districtingID)
    {
        // TODO
        return "";
    }

    //Returns popDeviationsJSON
    @PostMapping(path = "/popSummary", consumes = "application/json", produces = "application/json")
    public String popSummary(@RequestBody PopulationType type, @RequestBody int districtingID)
    {
        // TODO
        return "";
    }
}