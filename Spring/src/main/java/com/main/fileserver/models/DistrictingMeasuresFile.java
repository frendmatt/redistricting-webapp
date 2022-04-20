package com.main.fileserver.models;

import com.main.enums.AllPopulations;
import com.main.enums.CompactnessType;
import com.main.enums.Minority;
import com.main.enums.Party;

import java.util.List;
import java.util.Map;

public class DistrictingMeasuresFile
{
    public Map<AllPopulations, Float> equalPopulations;
    public Map<CompactnessType, Float> compactness;
    public float deviationEnactedGeo;
    public Map<AllPopulations, Float> deviationEnactedPop;
    public float splitCounties;
    public List<String> splitCountiesList;
    public float politicalFairness;
    public Map<Party, Integer> wastedVotes;
    public Map<AllPopulations, Float> populationDifferences;

    public Map<Minority, Float> deviationAveragePop;
}