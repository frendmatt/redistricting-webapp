package com.main.rest.models;

import com.main.enums.AllPopulations;
import com.main.enums.CompactnessType;
import com.main.enums.Minority;
import com.main.enums.PopulationType;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class Weights
{

    public float compactness;
    public float populationEquality;
    public float deviationEnacted;
    public float deviationAverage;
    public float splitCounties;
    public float politicalFairness;

    public Weights()
    {
    }

    public Weights(float compactness, float populationEquality,
                       float deviationEnacted, float deviationAverage, float splitCounties,
                   float politicalFairness)
    {
        this.compactness = compactness;
        this.populationEquality = populationEquality;
        this.deviationEnacted = deviationEnacted;
        this.deviationAverage = deviationAverage;
        this.splitCounties = splitCounties;
        this.politicalFairness = politicalFairness;
    }

    public float getCompactness() {
        return compactness;
    }

    public void setCompactness(float compactness) {
        this.compactness = compactness;
    }

    public float getPopulationEquality() {
        return populationEquality;
    }

    public void setPopulationEquality(float populationEquality) {
        this.populationEquality = populationEquality;
    }

    public float getDeviationEnacted() {
        return deviationEnacted;
    }

    public void setDeviationEnacted(float deviationEnacted) {
        this.deviationEnacted = deviationEnacted;
    }

    public float getDeviationAverage() {
        return deviationAverage;
    }

    public void setDeviationAverage(float deviationAverage) {
        this.deviationAverage = deviationAverage;
    }

    public float getSplitCounties() {
        return splitCounties;
    }

    public void setSplitCounties(float splitCounties) {
        this.splitCounties = splitCounties;
    }

    public float getPoliticalFairness() {
        return politicalFairness;
    }

    public void setPoliticalFairness(float politicalFairness) {
        this.politicalFairness = politicalFairness;
    }
}
