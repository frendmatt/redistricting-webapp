
package com.main.testing;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.main.enums.AllPopulations;
import com.main.enums.CompactnessType;
import com.main.enums.StateCode;
import com.main.fileserver.DistrictingFileManager;
import com.main.fileserver.JobManager;
import com.main.helper.PrintHelper;
import com.main.mysql.models.*;
/*import com.main.mysql.repos.*;*/
import com.main.fileserver.models.CountyFile;
import com.main.fileserver.models.DistrictFile;
import com.main.fileserver.models.DistrictingFile;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.CommonsRequestLoggingFilter;

import java.io.File;
import java.io.IOException;
import java.time.Duration;
import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

@Configuration
public class Test
{
    //This will run every startup of the server
    @Bean
    CommandLineRunner commandLineRunner(/*CountyRepo countyRepo, DistrictingRepo districtingRepo, DistrictRepo districtRepo, JobRepo jobRepo, PrecinctRepo precinctRepo, StateRepo stateRepo, IncumbentRepo incumbentRepo*/)
    {
        return args ->
        {
            PrintWithTime("YERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR");
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.configure(DeserializationFeature.FAIL_ON_NUMBERS_FOR_ENUMS, false);

            //GenerateStateAndJobs(stateRepo, jobRepo);
            //ImportPrecincts(objectMapper, precinctRepo);
            //ImportCounties(objectMapper, precinctRepo, countyRepo);
            //ImportDistrictings(objectMapper, incumbentRepo, precinctRepo, countyRepo, jobRepo, districtingRepo);
            //CompactnessCount();
            //PopulationDifferencesCount();

            PrintWithTime("WE DID IT BOYS");
        };
    }

    @Bean
    public CommonsRequestLoggingFilter requestLoggingFilter() {
        CommonsRequestLoggingFilter loggingFilter = new CommonsRequestLoggingFilter();
        loggingFilter.setIncludeClientInfo(true);
        loggingFilter.setIncludeQueryString(true);
        loggingFilter.setMaxPayloadLength(100000);
        loggingFilter.setIncludePayload(true);
        loggingFilter.setIncludeHeaders(false);
        return loggingFilter;
    }

    public static void PopulationDifferencesCount()
    {
        for (Job job : JobManager.jobs)
        {
            var maxDistricting = Collections.synchronizedMap(new HashMap<AllPopulations, Float>());
            maxDistricting.put(AllPopulations.TOTAL, -1f);

            int size = job.getNumDistrictings();

            if(size>0)
            {
                ArrayList<Integer> positions = new ArrayList<Integer>(size);
                for(int i = 0; i < size; i++) {
                    positions.add(i);
                }
                positions.parallelStream().forEach(positionId ->
                {
                    try
                    {
                        DistrictingFile temp = DistrictingFileManager.getDistrictingFile(job.getId(), positionId);
                        //PrintHelper.printWithTime(temp.measures.compactness.toString());
                        var districtingPopDif = temp.measures.populationDifferences.get(AllPopulations.TOTAL);
                        synchronized (maxDistricting)
                        {
                            if(maxDistricting.get(AllPopulations.TOTAL) < districtingPopDif)
                            {
                                PrintHelper.printWithTime("New Districting High: " + job.getId() + ":" +  + positionId + " : " + districtingPopDif);
                                maxDistricting.replace(AllPopulations.TOTAL, districtingPopDif);
                            }
                        }
                    }
                    catch(Exception e)
                    {
                        PrintHelper.printWithTime("AAAAAAAAAAAAAAHHHHHHH " + job.getId() + ":" + positionId + "\n" + e.toString());
                    }
                });
                PrintHelper.printWithTime("Job " + job.getId() + " : " + maxDistricting.get(AllPopulations.TOTAL).toString());
            }
        }
    }

    public static void CompactnessCount()
    {
        var maxDistrict = Collections.synchronizedMap(new HashMap<CompactnessType, Float>());
        maxDistrict.put(CompactnessType.GRAPH_COMPACTNESS, -1f);
        var maxDistricting = Collections.synchronizedMap(new HashMap<CompactnessType, Float>());
        maxDistricting.put(CompactnessType.GRAPH_COMPACTNESS, -1f);
        for (Job job : JobManager.jobs)
        {
            int size = job.getNumDistrictings();

            if(size>0)
            {
                ArrayList<Integer> positions = new ArrayList<Integer>(size);
                for(int i = 0; i < size; i++) {
                    positions.add(i);
                }
                positions.parallelStream().forEach(positionId ->
                {
                    try
                    {
                        DistrictingFile temp = DistrictingFileManager.getDistrictingFile(job.getId(), positionId);
                        //PrintHelper.printWithTime(temp.measures.compactness.toString());
                        var districtingCompactness = temp.measures.compactness.get(CompactnessType.GRAPH_COMPACTNESS);
                        synchronized (maxDistricting)
                        {
                            if(maxDistricting.get(CompactnessType.GRAPH_COMPACTNESS) < districtingCompactness)
                            {
                                PrintHelper.printWithTime("New Districting High: " + districtingCompactness);
                                maxDistricting.replace(CompactnessType.GRAPH_COMPACTNESS, districtingCompactness);
                            }
                        }
                        for (DistrictFile district : temp.districts)
                        {
                            //PrintHelper.printWithTime(temp.measures.compactness.toString());
                            var districtCompactness = district.measures.compactness.get(CompactnessType.GRAPH_COMPACTNESS);
                            synchronized (maxDistrict)
                            {
                                if(maxDistrict.get(CompactnessType.GRAPH_COMPACTNESS) < districtCompactness)
                                {
                                    PrintHelper.printWithTime("New District High: " + districtCompactness);
                                    maxDistrict.replace(CompactnessType.GRAPH_COMPACTNESS, districtCompactness);
                                }
                            }
                        }
                    }
                    catch(Exception e)
                    {
                        PrintHelper.printWithTime("AAAAAAAAAAAAAAHHHHHHH " + job.getId() + ":" + positionId + "\n" + e.toString());
                    }
                });
            }
        }
        PrintHelper.printWithTime(maxDistrict.get(CompactnessType.GRAPH_COMPACTNESS).toString());
        PrintHelper.printWithTime(maxDistricting.get(CompactnessType.GRAPH_COMPACTNESS).toString());
    }
/*
    private static void GenerateStateAndJobs(StateRepo stateRepo, JobRepo jobRepo)
    {
        int i = 1;
        PrintWithTime("Started Generate State And Jobs");
        for (StateCode stateCode : StateCode.values())
        {
            var state = new State(stateCode, null);
            stateRepo.save(state);

            var job1 = new Job(i++, stateCode, 5000, 0.05f, 100, 100000, null);
            jobRepo.save(job1);

            var job2 = new Job(i++, stateCode, 5000, 0.07f, 100, 100000, null);
            jobRepo.save(job2);

            var job3 = new Job(i++, stateCode, 5000, 0.03f, 100, 100000, null);
            jobRepo.save(job3);
        }
        PrintWithTime("Finished Generate State And Jobs");
    }

    private static void ImportPrecincts(ObjectMapper objectMapper, PrecinctRepo precinctRepo) throws IOException
    {
        PrintWithTime("Started Precincts Import");
        List<Precinct> precincts = objectMapper.readValue(new File("imports/precinct3.json"), new TypeReference<List<Precinct>>(){});
        precincts.forEach((p) -> p.setChildrenId());
        precinctRepo.saveAll(precincts);
        PrintWithTime("Finished Precincts Import");
    }

    private static void ImportCounties(ObjectMapper objectMapper, PrecinctRepo precinctRepo, CountyRepo countyRepo) throws IOException
    {
        List<CountyFile> c = objectMapper.readValue(new File("imports/counties.json"), new TypeReference<List<CountyFile>>(){});
        PrintWithTime("Made List");

        PrintWithTime("Getting all Precincts");
        List<Precinct> precinctList = precinctRepo.findAll();
        Map<String, Precinct> precinctMap = new HashMap<String, Precinct>();
        for (Precinct i : precinctList) precinctMap.put(i.getPrecinctId(), i);
        PrintWithTime("Got all Precincts");

        List<Precinct> preToSave = new ArrayList<Precinct>();
        List<County> couToSave = new ArrayList<County>();

        PrintWithTime("Starting Precincts: " + c.size());
        for (CountyFile cou : c)
        {
            List<Precinct> preList = cou.precincts.stream()
                    .map(precinctMap::get)
                    .filter(Objects::nonNull)
                    .collect(Collectors.toList());

            County county = new County(cou.stateCode, cou.name, preList);
            couToSave.add(county);

            preList.forEach((pre) -> pre.setCounty(county));
            preToSave.addAll(preList);
        }
        PrintWithTime("Finished Counties: " + c.size());
        PrintWithTime("Precincts: " + preToSave.size());

        PrintWithTime("County Saving Started");
        countyRepo.saveAll(couToSave);
        PrintWithTime("County Saving Finished");

        PrintWithTime("Precinct Saving Started");
        precinctRepo.saveAll(preToSave);
        PrintWithTime("Precinct Saving Finished");
    }

    private static void ImportDistrictings(ObjectMapper objectMapper, IncumbentRepo incumbentRepo, PrecinctRepo precinctRepo, CountyRepo countyRepo, JobRepo jobRepo, DistrictingRepo districtingRepo) throws IOException
    {
        PrintWithTime("Starting Districtings Import");
        File[] directories = new File("imports/districtings/").listFiles(File::isDirectory);
        List<Integer> jobIds = new ArrayList<Integer>();
        for (File directory : directories)
        {
            PrintWithTime("Job found: " + directory.getName());
            jobIds.add(Integer.parseInt(directory.getName()));
        }

//        PrintWithTime("Getting all Precincts");
//        List<Precinct> precinctList = precinctRepo.findAll();
//        Map<String, Precinct> precinctMap = new HashMap<String, Precinct>();
//        for (Precinct i : precinctList) precinctMap.put(i.getPrecinctId(), i);
//        PrintWithTime("Got all Precincts");

//        PrintWithTime("Getting all Counties");
//        List<County> countyList = countyRepo.findAll();
//        Map<String, County> countyMap = new HashMap<String, County>();
//        for (County i : countyList) countyMap.put(i.getName(), i);
//        PrintWithTime("Got all Counties");

        PrintWithTime("Getting all Incumbents");
        List<Incumbent> incumbentList = incumbentRepo.findAll();
        Map<String, Incumbent> incumbentMap = new HashMap<String, Incumbent>();
        for (Incumbent i : incumbentList) incumbentMap.put(i.getName(), i);
        PrintWithTime("Got all Incumbents");


        for (int jobId : jobIds)
        {
            Job job = jobRepo.findById(jobId).get();
            PrintWithTime("Looking in Job Folder: " + jobId);
            List<File> districtingFilesAll = Arrays.stream(new File("imports/districtings/" + jobId + "/").listFiles(File::isFile)).collect(Collectors.toList());
            PrintWithTime("Found " + districtingFilesAll.size() + " Districtings in Job Folder: " + jobId);

            List<Districting> districtingsToSave = new ArrayList<Districting>();
            for (File districtingFile : districtingFilesAll)
            {
                DistrictingFile districtingTemp = objectMapper.readValue(districtingFile, DistrictingFile.class);
                int position = Integer.parseInt(districtingFile.getName().split("_")[1].split("\\.")[0]);

                var districting = new Districting(
                        jobId,
                        position,
                        districtingTemp.measures
                );

                for (DistrictFile districtFile : districtingTemp.districts)
                {
                    var district = new District(
                            jobId,
                            position,
                            districtFile.enactedId,
                            districtFile.populations,
                            districtFile.measures,
                            districtFile.incumbents.stream()
                                    .map(incumbentMap::get)
                                    .filter(Objects::nonNull)
                                    .collect(Collectors.toList()),
                            districting
                    );
                    districting.addDistrict(district);
                }
                job.addDistricting(districting);
                districtingsToSave.add(districting);
            }

            var districtingsToSaveBatchSize = 100;
            var districtingsToSaveBatches = partition(districtingsToSave, districtingsToSaveBatchSize);
            var max = districtingsToSaveBatches.size();
            PrintWithTime("Saving Batches: " + max);
            for (int i2 = 0; i2 < max; i2++)
            {
                Instant starts = Instant.now();
                districtingRepo.saveAll(districtingsToSaveBatches.get(i2));
                districtingRepo.flush();
                Instant ends = Instant.now();
                PrintWithTime("Time: " + Duration.between(starts, ends) + "\t" + "Batch: " + (i2+1) + "/" + (max));
            }
            PrintWithTime("Saving Job...");
            jobRepo.save(job);
        }
        PrintWithTime("Finished Districtings Import");
    }
*/
    public static <T> List<List<T>> partition(List<T> list, int size)
    {

        if (list == null)
            throw new NullPointerException(
                    "'list' must not be null");
        if (!(size > 0))
            throw new IllegalArgumentException(
                    "'size' must be greater than 0");

        return new Partition<T>(list, size);
    }

    private static class Partition<T> extends AbstractList<List<T>>
    {

        final List<T> list;
        final int size;

        Partition(List<T> list, int size)
        {
            this.list = list;
            this.size = size;
        }

        @Override
        public List<T> get(int index)
        {
            int listSize = size();
            if (listSize < 0)
                throw new IllegalArgumentException("negative size: " + listSize);
            if (index < 0)
                throw new IndexOutOfBoundsException(
                        "index " + index + " must not be negative");
            if (index >= listSize)
                throw new IndexOutOfBoundsException(
                        "index " + index + " must be less than size " + listSize);
            int start = index * size;
            int end = Math.min(start + size, list.size());
            return list.subList(start, end);
        }

        @Override
        public int size()
        {
            return (list.size() + size - 1) / size;
        }

        @Override
        public boolean isEmpty()
        {
            return list.isEmpty();
        }
    }

    public static void PrintWithTime(String out)
    {
        System.out.println(java.time.LocalTime.now() + ": " + out);
    }
}