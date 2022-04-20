package com.main.rest.models;

import com.main.enums.AllPopulations;
import com.main.enums.CompactnessType;
import com.main.enums.Minority;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class Constraints
{
    public ArrayList<Integer> incumbents;

    public float compactness;

    public CompactnessType compactnessType;

    public float populationEquality;

    public AllPopulations populationType;

    public Minority minority;

    public float minorityPercentThreshold;

    public int majorityMinorityDistricts;

    public Constraints()
    {
    }

    public Constraints(ArrayList<Integer> incumbents, float compactness, CompactnessType compactnessType,
                       float populationEquality, AllPopulations populationType, Minority minority,
                       float minorityPercentThreshold, int majorityMinorityDistricts)
    {
        this.incumbents = incumbents;
        this.compactness = compactness;
        this.compactnessType = compactnessType;
        this.populationEquality = populationEquality;
        this.populationType = populationType;
        this.minority = minority;
        this.minorityPercentThreshold = minorityPercentThreshold;
        this.majorityMinorityDistricts = majorityMinorityDistricts;
    }

    public ArrayList<Integer> getIncumbents() {
        return incumbents;
    }

    public void setIncumbents(ArrayList<Integer> incumbents) {
        this.incumbents = incumbents;
    }

    public float getCompactness() {
        return compactness;
    }

    public void setCompactness(float compactness) {
        this.compactness = compactness;
    }

    public CompactnessType getCompactnessType() {
        return compactnessType;
    }

    public void setCompactnessType(CompactnessType compactnessType) {
        this.compactnessType = compactnessType;
    }

    public float getPopulationEquality() {
        return populationEquality;
    }

    public void setPopulationEquality(float populationEquality) {
        this.populationEquality = populationEquality;
    }

    public AllPopulations getPopulationType() {
        return populationType;
    }

    public void setPopulationType(AllPopulations populationType) {
        this.populationType = populationType;
    }

    public Minority getMinority() {
        return minority;
    }

    public void setMinority(Minority minority) {
        this.minority = minority;
    }

    public float getMinorityPercentThreshold() {
        return minorityPercentThreshold;
    }

    public void setMinorityPercentThreshold(float minorityPercentThreshold) {
        this.minorityPercentThreshold = minorityPercentThreshold;
    }

    public int getMajorityMinorityDistricts() {
        return majorityMinorityDistricts;
    }

    public void setMajorityMinorityDistricts(int majorityMinorityDistricts) {
        this.majorityMinorityDistricts = majorityMinorityDistricts;
    }
}