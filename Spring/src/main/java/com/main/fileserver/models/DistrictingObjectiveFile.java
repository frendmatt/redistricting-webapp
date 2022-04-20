package com.main.fileserver.models;


public class DistrictingObjectiveFile
{
    public float total;
    public float equalPopulations;
    public float deviationAverage;
    public float deviationEnacted;
    public float compactness;
    public float splitCounties;
    public float efficiencyGap;


    public DistrictingObjectiveFile(float total, float equalPopulations, float deviationAverage, float deviationEnacted, float compactness, float splitCounties, float efficiencyGap)
    {
        this.total = total;
        this.equalPopulations = equalPopulations;
        this.deviationAverage = deviationAverage;
        this.deviationEnacted = deviationEnacted;
        this.compactness = compactness;
        this.splitCounties = splitCounties;
        this.efficiencyGap = efficiencyGap;
    }
}