package com.main.mysql.models;

import com.main.enums.AllPopulations;
import com.main.enums.CompactnessType;
import com.main.enums.Party;
import com.main.mysql.models.ids.DistrictingId;
import com.main.fileserver.models.DistrictingMeasuresFile;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Entity
@IdClass(DistrictingId.class)
public class Districting
{
    @Id
    private int jobId;

    @Id
    private int positionId;

    //Equal PopulationFile measure values
    @ElementCollection(fetch = FetchType.EAGER)
    private Map<AllPopulations, Float> equalPopulations;


    //Compactness measure values
    @ElementCollection(fetch = FetchType.EAGER)
    private Map<CompactnessType, Float> compactness;


    //Deviation Enacted Geo measure value
    private float deviationEnactedGeo;


    //Deviation enacted pop measure values
    @ElementCollection(fetch = FetchType.EAGER)
    private Map<AllPopulations, Float> deviationEnactedPop;


    //Split county measure value
    private float splitCounties;


    //Political Fairness (Efficiency Gap/Wasted votes) measure value
    private float politicalFairness;

    //Wasted votes for each party.
    @ElementCollection(fetch = FetchType.EAGER)
    private Map<Party, Integer> wastedVotes;

    //A Thing
    @ElementCollection(fetch = FetchType.EAGER)
    private Map<AllPopulations, Float> populationDifferences;

    @OneToMany(cascade = {CascadeType.ALL})
    private List<District> districts;

    public Districting()
    {
    }

    public Districting(int jobId, int positionId, Map<AllPopulations, Float> equalPopulations, Map<CompactnessType, Float> compactness, float deviationEnactedGeo, Map<AllPopulations, Float> deviationEnactedPop, float splitCounties, float politicalFairness, Map<Party, Integer> wastedVotes, Map<AllPopulations, Float> populationDifferences, List<District> districts)
    {
        this.jobId = jobId;
        this.positionId = positionId;
        this.equalPopulations = equalPopulations;
        this.compactness = compactness;
        this.deviationEnactedGeo = deviationEnactedGeo;
        this.deviationEnactedPop = deviationEnactedPop;
        this.splitCounties = splitCounties;
        this.politicalFairness = politicalFairness;
        this.wastedVotes = wastedVotes;
        this.populationDifferences = populationDifferences;
        this.districts = districts;
    }

    public Districting(int jobId, int positionId, DistrictingMeasuresFile measures)
    {
        this.jobId = jobId;
        this.positionId = positionId;
        this.equalPopulations = measures.equalPopulations;
        this.compactness = measures.compactness;
        this.deviationEnactedGeo = measures.deviationEnactedGeo;
        this.deviationEnactedPop = measures.deviationEnactedPop;
        this.splitCounties = measures.splitCounties;
        this.politicalFairness = measures.politicalFairness;
        this.wastedVotes = measures.wastedVotes;
        this.populationDifferences = measures.populationDifferences;
        this.districts = new ArrayList<District>();
    }

    public void addDistrict(District district)
    {
        if (districts == null)
            districts = new ArrayList<District>();
        districts.add(district);
    }

    public String boxAndWhisker(boolean isParty)
    {
        // TODO
        return "";
    }

    public float objectiveScore()
    {
        // TODO
        return 0;
    }

    /**
     * public List<Integer> rank(ComparisonPopulation type) {
     * // TODO
     * return null;
     * }
     **/

    public void geoDeviation(Districting other)
    {
        // TODO
    }

    public District getDistrict(int districtID)
    {
        // TODO
        return null;
    }

    //public void setScores(DistrictingMeasures weights)
    //{
    //    // TODO
    //}

    public String getSummaryAsJSON()
    {
        //TODO
        return "";
    }

    public String combineGeometries()
    {
        // TODO
        return "";
    }

    public List<Integer> getPopulation(AllPopulations type)
    {
        // TODO
        return null;
    }

    public int getJobId()
    {
        return jobId;
    }

    public void setJobId(int jobId)
    {
        this.jobId = jobId;
    }

    public int getPositionId()
    {
        return positionId;
    }

    public void setPositionId(int positionId)
    {
        this.positionId = positionId;
    }

    public List<District> getDistricts()
    {
        return districts;
    }

    public void setDistricts(List<District> districts)
    {
        this.districts = districts;
    }

    public Map<AllPopulations, Float> getEqualPopulations()
    {
        return equalPopulations;
    }

    public void setEqualPopulations(Map<AllPopulations, Float> equalPopulations)
    {
        this.equalPopulations = equalPopulations;
    }

    public Map<CompactnessType, Float> getCompactness()
    {
        return compactness;
    }

    public void setCompactness(Map<CompactnessType, Float> compactness)
    {
        this.compactness = compactness;
    }

    public float getDeviationEnactedGeo()
    {
        return deviationEnactedGeo;
    }

    public void setDeviationEnactedGeo(float deviationEnactedGeo)
    {
        this.deviationEnactedGeo = deviationEnactedGeo;
    }

    public Map<AllPopulations, Float> getDeviationEnactedPop()
    {
        return deviationEnactedPop;
    }

    public void setDeviationEnactedPop(Map<AllPopulations, Float> deviationEnactedPop)
    {
        this.deviationEnactedPop = deviationEnactedPop;
    }

    public float getSplitCounties()
    {
        return splitCounties;
    }

    public void setSplitCounties(float splitCounties)
    {
        this.splitCounties = splitCounties;
    }

    public float getPoliticalFairness()
    {
        return politicalFairness;
    }

    public void setPoliticalFairness(float politicalFairness)
    {
        this.politicalFairness = politicalFairness;
    }

    public Map<Party, Integer> getWastedVotes()
    {
        return wastedVotes;
    }

    public void setWastedVotes(Map<Party, Integer> wastedVotes)
    {
        this.wastedVotes = wastedVotes;
    }

    public Map<AllPopulations, Float> getPopulationDifferences()
    {
        return populationDifferences;
    }

    public void setPopulationDifferences(Map<AllPopulations, Float> populationDifferences)
    {
        this.populationDifferences = populationDifferences;
    }
}