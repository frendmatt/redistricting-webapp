package com.main.mysql.models.ids;

import com.main.enums.StateCode;

import java.io.Serializable;
import java.util.Objects;

public class CountyId implements Serializable
{
    private StateCode stateCode = StateCode.values()[0];
    private String name = null;

    public CountyId()
    {
        super();
    }

    public CountyId(StateCode stateCode, String name)
    {
        this.stateCode = stateCode;
        this.name = name;
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

    @Override
    public boolean equals(Object o)
    {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CountyId countyId = (CountyId) o;
        return stateCode == countyId.stateCode && Objects.equals(name, countyId.name);
    }

    @Override
    public int hashCode()
    {
        return Objects.hash(stateCode, name);
    }
}