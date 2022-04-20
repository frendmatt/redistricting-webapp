package com.main.mysql.models;

import com.main.enums.*;
import com.main.mysql.models.ids.DistrictId;
import com.main.fileserver.models.DistrictMeasuresFile;
import com.main.fileserver.models.PopulationFile;

import javax.persistence.*;
import java.util.List;
import java.util.Map;

@Entity
@IdClass(DistrictId.class)
public class District
{
    @Id
    private int jobId;

    @Id
    private int positionId;

    @Id
    private char enactedId;

    //@ManyToMany
    //@ElementCollection
    //private List<String> precincts;

    @ElementCollection(fetch = FetchType.EAGER)
    private Map<Minority, Integer> minorities;

    @ElementCollection(fetch = FetchType.EAGER)
    private Map<PopulationType, Integer> populationType;

    @ElementCollection(fetch = FetchType.EAGER)
    private Map<Party, Integer> parties;


    //Equal PopulationFile measure values.
    //Note: this is the value of ((district.pop/enacted.pop)-1)^2
    @ElementCollection(fetch = FetchType.EAGER)
    private Map<AllPopulations, Float> equalPopulations;

    //Absolute differences in population compared to enacted
    @ElementCollection(fetch = FetchType.EAGER)
    private Map<AllPopulations, Long> equalPopulationsDif;

    //Absolute Percent differences in population compared to enacted.
    @ElementCollection(fetch = FetchType.EAGER)
    private Map<AllPopulations, Float> equalPopulationsPer;


    //compactness measure value
    //Note: this is the compactness for the given district. The overall districting compactness
    //  is the average of these values.
    @ElementCollection(fetch = FetchType.EAGER)
    private Map<CompactnessType, Float> compactness;


    //Deviation Enacted Geo measure value
    //Note: Value is intersection of area / total area of districting.
    private float deviationEnactedGeo;

    //Absolute difference in area
    private float deviationEnactedGeoDif;

    //Absolute percent difference in area
    private float deviationEnactedGeoPer;


    //Deviation enacted pop measure values
    //Note: Value is intersection of population / total population of districting.
    @ElementCollection(fetch = FetchType.EAGER)
    private Map<AllPopulations, Float> deviationEnactedPop;

    //Absolute difference in population value
    @ElementCollection(fetch = FetchType.EAGER)
    private Map<AllPopulations, Long> deviationEnactedPopDif;


    //Absolute percent difference in population value
    @ElementCollection(fetch = FetchType.EAGER)
    private Map<AllPopulations, Float> deviationEnactedPopPer;

    //Wasted votes for each party.
    @ElementCollection(fetch = FetchType.EAGER)
    private Map<Party, Integer> wastedVotes;

    @ManyToMany
    private List<Incumbent> incumbents;

    @ManyToOne
    private Districting districting;

    public District()
    {
    }

    public District(int jobId, int positionId, char enactedId, Map<Minority, Integer> minorities, Map<PopulationType, Integer> populationType, Map<Party, Integer> parties, Map<AllPopulations, Float> equalPopulations, Map<AllPopulations, Long> equalPopulationsDif, Map<AllPopulations, Float> equalPopulationsPer, Map<CompactnessType, Float> compactness, float deviationEnactedGeo, Long deviationEnactedGeoDif, int deviationEnactedGeoPer, Map<AllPopulations, Float> deviationEnactedPop, Map<AllPopulations, Long> deviationEnactedPopDif, Map<AllPopulations, Float> deviationEnactedPopPer, Map<Party, Integer> wastedVotes, List<Incumbent> incumbents, Districting districting)
    {
        this.jobId = jobId;
        this.positionId = positionId;
        this.enactedId = enactedId;
        this.minorities = minorities;
        this.populationType = populationType;
        this.parties = parties;
        this.equalPopulations = equalPopulations;
        this.equalPopulationsDif = equalPopulationsDif;
        this.equalPopulationsPer = equalPopulationsPer;
        this.compactness = compactness;
        this.deviationEnactedGeo = deviationEnactedGeo;
        this.deviationEnactedGeoDif = deviationEnactedGeoDif;
        this.deviationEnactedGeoPer = deviationEnactedGeoPer;
        this.deviationEnactedPop = deviationEnactedPop;
        this.deviationEnactedPopDif = deviationEnactedPopDif;
        this.deviationEnactedPopPer = deviationEnactedPopPer;
        this.wastedVotes = wastedVotes;
        this.incumbents = incumbents;
        this.districting = districting;
    }

    public District(int jobId, int positionId, char enactedId, PopulationFile population, DistrictMeasuresFile measures, List<Incumbent> incumbents, Districting districting)
    {
        this.jobId = jobId;
        this.positionId = positionId;
        this.enactedId = enactedId;
        this.minorities = population.minorities;
        this.populationType = population.populationType;
        this.parties = population.parties;
        this.equalPopulations = measures.equalPopulations;
        this.equalPopulationsDif = measures.equalPopulationsDif;
        this.equalPopulationsPer = measures.equalPopulationsPer;
        this.compactness = measures.compactness;
        this.deviationEnactedGeo = measures.deviationEnactedGeo;
        this.deviationEnactedGeoDif = measures.deviationEnactedGeoDif;
        this.deviationEnactedGeoPer = measures.deviationEnactedGeoPer;
        this.deviationEnactedPop = measures.deviationEnactedPop;
        this.deviationEnactedPopDif = measures.deviationEnactedPopDif;
        this.deviationEnactedPopPer = measures.deviationEnactedPopPer;
        this.wastedVotes = measures.wastedVotes;
        this.incumbents = incumbents;
        this.districting = districting;
    }

    public String getSummaryAsJSON()
    {
        //TODO
        return "";
    }

    public String getGeometry()
    {
        // TODO
        return "";
    }

    public List<Float> equalPopulation(PopulationType type, float pop)
    {
        // TODO
        return null;
    }

    public void calculateSplitCountyScore()
    {
        // TODO
    }

    public String combineGeometries()
    {
        // TODO
        return "";
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

    public char getEnactedId()
    {
        return enactedId;
    }

    public void setEnactedId(char enactedId)
    {
        this.enactedId = enactedId;
    }

    public List<Incumbent> getIncumbents()
    {
        return incumbents;
    }

    public void setIncumbents(List<Incumbent> incumbents)
    {
        this.incumbents = incumbents;
    }

    public Districting getDistricting()
    {
        return districting;
    }

    public void setDistricting(Districting districting)
    {
        this.districting = districting;
    }

    public Map<Minority, Integer> getMinorities()
    {
        return minorities;
    }

    public void setMinorities(Map<Minority, Integer> minorities)
    {
        this.minorities = minorities;
    }

    public Map<PopulationType, Integer> getPopulationType()
    {
        return populationType;
    }

    public void setPopulationType(Map<PopulationType, Integer> populationType)
    {
        this.populationType = populationType;
    }

    public Map<Party, Integer> getParties()
    {
        return parties;
    }

    public void setParties(Map<Party, Integer> parties)
    {
        this.parties = parties;
    }

    public Map<AllPopulations, Float> getEqualPopulations()
    {
        return equalPopulations;
    }

    public void setEqualPopulations(Map<AllPopulations, Float> equalPopulations)
    {
        this.equalPopulations = equalPopulations;
    }

    public Map<AllPopulations, Long> getEqualPopulationsDif()
    {
        return equalPopulationsDif;
    }

    public void setEqualPopulationsDif(Map<AllPopulations, Long> equalPopulationsDif)
    {
        this.equalPopulationsDif = equalPopulationsDif;
    }

    public Map<AllPopulations, Float> getEqualPopulationsPer()
    {
        return equalPopulationsPer;
    }

    public void setEqualPopulationsPer(Map<AllPopulations, Float> equalPopulationsPer)
    {
        this.equalPopulationsPer = equalPopulationsPer;
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

    public float getDeviationEnactedGeoDif()
    {
        return deviationEnactedGeoDif;
    }

    public void setDeviationEnactedGeoDif(float deviationEnactedGeoDif)
    {
        this.deviationEnactedGeoDif = deviationEnactedGeoDif;
    }

    public float getDeviationEnactedGeoPer()
    {
        return deviationEnactedGeoPer;
    }

    public void setDeviationEnactedGeoPer(float deviationEnactedGeoPer)
    {
        this.deviationEnactedGeoPer = deviationEnactedGeoPer;
    }

    public Map<AllPopulations, Float> getDeviationEnactedPop()
    {
        return deviationEnactedPop;
    }

    public void setDeviationEnactedPop(Map<AllPopulations, Float> deviationEnactedPop)
    {
        this.deviationEnactedPop = deviationEnactedPop;
    }

    public Map<AllPopulations, Long> getDeviationEnactedPopDif()
    {
        return deviationEnactedPopDif;
    }

    public void setDeviationEnactedPopDif(Map<AllPopulations, Long> deviationEnactedPopDif)
    {
        this.deviationEnactedPopDif = deviationEnactedPopDif;
    }

    public Map<AllPopulations, Float> getDeviationEnactedPopPer()
    {
        return deviationEnactedPopPer;
    }

    public void setDeviationEnactedPopPer(Map<AllPopulations, Float> deviationEnactedPopPer)
    {
        this.deviationEnactedPopPer = deviationEnactedPopPer;
    }

    public Map<Party, Integer> getWastedVotes()
    {
        return wastedVotes;
    }

    public void setWastedVotes(Map<Party, Integer> wastedVotes)
    {
        this.wastedVotes = wastedVotes;
    }
}