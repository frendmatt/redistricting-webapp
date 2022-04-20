package com.main.mysql.models.ids;

import com.main.enums.StateCode;

import java.io.Serializable;
import java.util.Objects;

public class IncumbentId implements Serializable
{
    private StateCode stateCode = StateCode.values()[0];
    private int enactedId = -1;

    public IncumbentId()
    {
        super();
    }

    public IncumbentId(StateCode stateCode, int enactedId)
    {
        this.stateCode = stateCode;
        this.enactedId = enactedId;
    }

    public StateCode getStateCode()
    {
        return stateCode;
    }

    public void setStateCode(StateCode stateCode)
    {
        this.stateCode = stateCode;
    }

    public int getEnactedId()
    {
        return enactedId;
    }

    public void setEnactedId(int enactedId)
    {
        this.enactedId = enactedId;
    }

    @Override
    public boolean equals(Object o)
    {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        IncumbentId that = (IncumbentId) o;
        return stateCode == that.stateCode && Objects.equals(enactedId, that.enactedId);
    }

    @Override
    public int hashCode()
    {
        return Objects.hash(stateCode, enactedId);
    }
}