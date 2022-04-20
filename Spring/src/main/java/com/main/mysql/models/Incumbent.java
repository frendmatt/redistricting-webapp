package com.main.mysql.models;

import com.main.enums.Party;
import com.main.enums.StateCode;
import com.main.mysql.models.ids.IncumbentId;

import javax.persistence.*;

@Entity
@IdClass(IncumbentId.class)
public class Incumbent
{
    @Id
    @Enumerated(EnumType.STRING)
    private StateCode stateCode;

    @Id
    private int enactedId;

    private String name;

    private Party party;


    public Incumbent()
    {
    }

    public Incumbent(StateCode stateCode, int enactedId, String name, Party party)
    {
        this.stateCode = stateCode;
        this.enactedId = enactedId;
        this.name = name;
        this.party = party;
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

    public Party getParty()
    {
        return party;
    }

    public void setParty(Party party)
    {
        this.party = party;
    }

    public int getEnactedId()
    {
        return enactedId;
    }

    public void setEnactedId(int enactedId)
    {
        this.enactedId = enactedId;
    }
}