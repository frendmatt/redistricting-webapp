package com.main.mysql.models;

import com.main.enums.Minority;
import com.main.enums.Party;
import com.main.enums.PopulationType;
import com.main.enums.StateCode;

import javax.persistence.*;
import java.util.Map;

@Entity
public class Precinct
{
    @Id
    private String precinctId;

    @Enumerated(EnumType.STRING)
    private StateCode stateCode;

    private String name;

    @OneToOne(cascade = {CascadeType.ALL})
    private County county;

    @ElementCollection(fetch = FetchType.EAGER)
    private Map<Minority, Integer> minorities;

    @ElementCollection(fetch = FetchType.EAGER)
    private Map<PopulationType, Integer> populationType;

    @ElementCollection(fetch = FetchType.EAGER)
    private Map<Party, Integer> parties;

    @OneToOne(cascade = {CascadeType.ALL})
    private Incumbent incumbent;

    private int geometryIndex;

    public Precinct()
    {
    }

    public Precinct(String precinctId, StateCode stateCode, String name, County county, Map<Minority, Integer> minorities, Map<PopulationType, Integer> populationType, Map<Party, Integer> parties, Incumbent incumbent, int geometryIndex)
    {
        this.precinctId = precinctId;
        this.stateCode = stateCode;
        this.name = name;
        this.county = county;
        this.minorities = minorities;
        this.populationType = populationType;
        this.parties = parties;
        this.incumbent = incumbent;
        this.geometryIndex = geometryIndex;
    }

    public void setChildrenId()
    {
        if (incumbent != null)
            incumbent.setStateCode(stateCode);
    }

    public String getGeometry()
    {
        // TODO
        return "";
    }

    public String getSummaryAsJSON()
    {
        //TODO
        return "";
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

    public String getPrecinctId()
    {
        return precinctId;
    }

    public void setPrecinctId(String precinctId)
    {
        this.precinctId = precinctId;
    }

    public StateCode getStateCode()
    {
        return stateCode;
    }

    public void setStateCode(StateCode stateCode)
    {
        this.stateCode = stateCode;
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    //public County getCounty()
    //{
    //    return county;
    //}

    public void setCounty(County county)
    {
        this.county = county;
    }

    public Incumbent getIncumbent()
    {
        return incumbent;
    }

    public void setIncumbent(Incumbent incumbent)
    {
        this.incumbent = incumbent;
    }

    public int getGeometryIndex()
    {
        return geometryIndex;
    }

    public void setGeometryIndex(int geometryIndex)
    {
        this.geometryIndex = geometryIndex;
    }
}