package com.main.mysql.models;

import com.main.enums.StateCode;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Job
{
    @Id
    private int id;

    @Enumerated(EnumType.STRING)
    private StateCode stateCode;

    private int mgggCoolingRounds;

    private float mgggEqualPopulation;

    private int mgggRounds;

    private int numDistrictings;

    @OneToMany(/*fetch = FetchType.EAGER*/)
    private List<Districting> districtings;

    public Job()
    {
    }

    public StateCode getStateCode()
    {
        return stateCode;
    }

    public void setStateCode(StateCode stateCode)
    {
        this.stateCode = stateCode;
    }

    /*public List<Districting> getDistrictings() {
        return districtings;
    }*/

    public void setDistrictings(List<Districting> districtings)
    {
        this.districtings = districtings;
    }

    public Job(int id, StateCode stateCode, int mgggCoolingRounds, float mgggEqualPopulation, int mgggRounds, int numDistrictings, List<Districting> districtings)
    {
        this.id = id;
        this.stateCode = stateCode;
        this.mgggCoolingRounds = mgggCoolingRounds;
        this.mgggEqualPopulation = mgggEqualPopulation;
        this.mgggRounds = mgggRounds;
        this.numDistrictings = numDistrictings;
        this.districtings = districtings;
    }

    public Job(int id, StateCode stateCode, float mgggEqualPopulation, int numDistrictings)
    {
        this.id = id;
        this.stateCode = stateCode;
        this.mgggCoolingRounds = 5000;
        this.mgggEqualPopulation = mgggEqualPopulation;
        this.mgggRounds = 100;
        this.numDistrictings = numDistrictings;
        this.districtings = null;
    }

    public void addDistricting(Districting districting)
    {
        if (districtings == null)
            districtings = new ArrayList<Districting>();
        districtings.add(districting);
    }

    public int getId()
    {
        return id;
    }

    public void setId(int id)
    {
        this.id = id;
    }

    public int getMgggCoolingRounds()
    {
        return mgggCoolingRounds;
    }

    public void setMgggCoolingRounds(int mgggCoolingRounds)
    {
        this.mgggCoolingRounds = mgggCoolingRounds;
    }

    public float getMgggEqualPopulation()
    {
        return mgggEqualPopulation;
    }

    public void setMgggEqualPopulation(float mgggEqualPopulation)
    {
        this.mgggEqualPopulation = mgggEqualPopulation;
    }

    public int getMgggRounds()
    {
        return mgggRounds;
    }

    public void setMgggRounds(int mgggRounds)
    {
        this.mgggRounds = mgggRounds;
    }

    public int getNumDistrictings()
    {
        return numDistrictings;
    }

    public void setNumDistrictings(int numDistrictings)
    {
        this.numDistrictings = numDistrictings;
    }
}