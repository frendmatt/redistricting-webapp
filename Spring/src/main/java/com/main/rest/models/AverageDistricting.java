package com.main.rest.models;

import com.main.enums.Minority;
import com.main.enums.PopulationType;
import com.main.fileserver.DistrictingFileManager;
import com.main.fileserver.models.DistrictFile;
import com.main.fileserver.models.DistrictingFile;
import com.main.mysql.models.District;
import com.main.mysql.models.Districting;
import com.main.mysql.models.ids.DistrictingId;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import java.lang.Math;

import javax.xml.crypto.Data;
import java.io.IOException;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;

public class AverageDistricting {
    private class DataPoints{
        float min;
        float p25;
        float median;
        float p75;
        float max;
        float enacted;

        public DataPoints(float min,float p25,float median,float p75,float max,float enactedVal){
            this.min = min;
            this.p25 = p25;
            this.median = median;
            this.p75 = p75;
            this.max = max;
            this.enacted = enactedVal;
        }
        @Override
        public String toString() {
            return String.format("min: %d, p25:%d, median: %d, p75: %d, max:%d, enacted:%d",
                    min,p25,median,p75,max,enacted);
        }

    }
    ArrayList<Float[]> districtPoints = new ArrayList<Float[]>();

    public Minority getMinority() {
        return minority;
    }

    public void setMinority(Minority minority) {
        this.minority = minority;
    }

    Minority minority;
    ArrayList<DataPoints> dataPoints;

    List<DistrictingFile> districtings;
    DistrictingFile enacted;

    public AverageDistricting(List<DistrictingFile> districtings, Minority m,DistrictingFile enacted) throws IOException {
        this.districtings = districtings;
        this.minority = m;
        this.enacted = enacted;
        dataPoints = getAverageValues((ArrayList<DistrictingFile>) districtings);
        setAllDeviations();
    }


    public ArrayList<DistrictFile> orderDistricts(DistrictingFile d){
        ArrayList<DistrictFile> districtsOrdered = (ArrayList<DistrictFile>) d.districts;
        districtsOrdered.sort((DistrictFile d1, DistrictFile d2)-> {
            return Float.compare(getMinorityValue(d1), getMinorityValue(d2));
            }
        );
        return districtsOrdered;
    }

    public float getDeviation(DistrictingFile districting){
        float sum = 0;
        for(int i=0; i<dataPoints.size(); i++){
            DataPoints d = dataPoints.get(i);
            float dif = getMinorityValue(districting.districts.get(i)) - d.median;
            dif = (float) Math.pow(dif,2.0);
            sum+=dif;
        }
        return (float) Math.sqrt(sum);
    }

    public float[] get_max_min(){
        float max = 0;
        float min = -1;
        for (DistrictingFile d: this.districtings){
            float val = d.measures.deviationAveragePop.get(this.minority);
            if (val>max){
                max = val;
            }
            else if (val<min || min==-1){
                min = val;
            }
        }
        return new float[]{max,min};
    }

    public void setAllDeviations(){
        for(DistrictingFile d: this.districtings){
            float deviation = getDeviation(d);
            if (d.measures.deviationAveragePop==null){
                d.measures.deviationAveragePop = new HashMap<Minority,Float>();
            }
            d.measures.deviationAveragePop.put(this.minority,deviation);
        }
        float[] max_min = get_max_min();
        float max = max_min[0];
        float min = max_min[1];

        for(DistrictingFile d: this.districtings){
            float val = d.measures.deviationAveragePop.get(this.minority);
            val = (val-min)/(max-min);
            d.measures.deviationAveragePop.put(this.minority,val);
        }
    }

    public float getMinorityValue(DistrictFile d){
        return (float) d.populations.minorities.get(this.minority)/d.populations.populationType.get(PopulationType.TOTAL) * 100;
    }

    public ArrayList<DataPoints> getAverageValues(ArrayList<DistrictingFile> districtings) throws IOException {
        ArrayList<ArrayList<Float>> values = new ArrayList<ArrayList<Float>>();
        if (districtings.size()==0){
            return null;
        }
        DistrictingFile first = districtings.get(0);
        for (int i=0; i<first.districts.size(); i++){
            values.add(new ArrayList<Float>());
        }
        for (DistrictingFile districting: districtings){
            List<DistrictFile> districts = orderDistricts(districting);
            for (int i=0; i<districts.size(); i++){
                float minority_val = getMinorityValue(districts.get(i));
                values.get(i).add(minority_val);
            }
        }

        ArrayList<DataPoints> ret = new ArrayList<DataPoints>();
        ArrayList<DistrictFile> enacted = orderDistricts(this.enacted);
        for (int i=0; i<values.size(); i++){
            ArrayList<Float> value = values.get(i);
            float min = Collections.min(value);
            float max = Collections.max(value);
            float p25 = percentile(value,25);
            float median= percentile(value,50);
            float p75 = percentile(value,75);
            float enactedVal = getMinorityValue(enacted.get(i));
            DataPoints d = new DataPoints(min,p25,median,p75,max,enactedVal);
            ret.add(d);
        }
        return ret;
    }
    public static float percentile(List<Float> values, double percentile) {
        Collections.sort(values);
        int index = (int) Math.ceil(percentile / 100.0 * values.size());
        return values.get(index-1);
    }

    @Override
    public String toString() {
        String ret = "";
        for (int i=0; i<dataPoints.size(); i++){
            DataPoints d = dataPoints.get(i);
            ret+= "Index" +i + ": " + d.toString()+"\n";
        }
        return ret;
    }

    public JSONArray toJSON() throws JSONException {
        JSONArray ret = new JSONArray();
        for (int i=0; i<dataPoints.size(); i++){
            JSONObject j = new JSONObject();
            DataPoints d = dataPoints.get(i);
            j.put("max",d.max);
            j.put("min",d.min);
            j.put("25",d.p25);
            j.put("median",d.median);
            j.put("75",d.p75);
            j.put("enacted",d.enacted);
            ret.put(j);
        }
        return ret;
    }
}
