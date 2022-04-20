package com.main.mysql.models;

import com.main.enums.AllPopulations;
import com.main.enums.PopulationType;
import com.main.enums.StateCode;

import javax.persistence.*;

@Entity
@Table
public class State
{
    @Id
    @Enumerated(EnumType.STRING)
    private StateCode code;

    @OneToOne
    private Districting enactedDistricting;

    public State()
    {
    }

    public State(StateCode code,
                 Districting enactedDistricting
    )
    {
        this.code = code;
        this.enactedDistricting = enactedDistricting;
    }


    public String getCountyGeometries()
    {
        // TODO
        return "";
    }

    public int getNumDistricts()
    {
        // TODO
        return 0;
    }

    public int getPopulation(AllPopulations type)
    {
        // TODO
        return 0;
    }

    public PopulationType getPopulationType()
    {
        // TODO
        return null;
    }

    public StateCode getCode()
    {
        return code;
    }

    public void setCode(StateCode code)
    {
        this.code = code;
    }

    public Districting getEnactedDistricting()
    {
        return enactedDistricting;
    }

    public void setEnactedDistricting(Districting enactedDistricting)
    {
        this.enactedDistricting = enactedDistricting;
    }
}