package com.main.fileserver.models;

import com.main.enums.AllPopulations;
import com.main.enums.CompactnessType;
import com.main.enums.Minority;
import com.main.enums.Party;

import java.util.Map;

public class DistrictMeasuresFile
{
    public int jobId;
    public int positionId;
    public char enactedId;
    public Map<AllPopulations, Float> equalPopulations;
    public Map<AllPopulations, Long> equalPopulationsDif;
    public Map<AllPopulations, Float> equalPopulationsPer;
    public Map<CompactnessType, Float> compactness;
    public float deviationEnactedGeo;
    public Long deviationEnactedGeoDif;
    public float deviationEnactedGeoPer;
    public Map<AllPopulations, Float> deviationEnactedPop;
    public Map<Minority, Float> deviationAveragePop;
    public Map<AllPopulations, Long> deviationEnactedPopDif;
    public Map<AllPopulations, Float> deviationEnactedPopPer;
    public Map<Party, Integer> wastedVotes;
    public float area;
}