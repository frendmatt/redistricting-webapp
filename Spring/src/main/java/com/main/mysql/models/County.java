package com.main.mysql.models;

import com.main.enums.StateCode;
import com.main.mysql.models.ids.CountyId;

import javax.persistence.*;
import java.util.List;

@Entity
@IdClass(CountyId.class)
public class County
{
    @Id
    @Enumerated(EnumType.STRING)
    private StateCode stateCode;

    @Id
    private String name = null;

    @OneToMany
    private List<Precinct> precincts;

    public County()
    {
    }


    public County(StateCode stateCode, String name, List<Precinct> precincts)
    {
        this.stateCode = stateCode;
        this.name = name;
        this.precincts = precincts;
    }

    public String getSummaryAsJSON()
    {
        //TODO
        return "";
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public List<Precinct> getPrecincts()
    {
        return precincts;
    }

    public void setPrecincts(List<Precinct> precincts)
    {
        this.precincts = precincts;
    }

    public StateCode getStateCode()
    {
        return stateCode;
    }

    public void setStateCode(StateCode stateCode)
    {
        this.stateCode = stateCode;
    }
}