package com.main.mysql.models.ids;

import java.io.Serializable;
import java.util.Objects;

public class DistrictId implements Serializable
{
    private int jobId = -1;
    private int positionId = -1;
    private char enactedId = ' ';

    public DistrictId()
    {
        super();
    }

    public DistrictId(int jobId, int positionId, char enactedId)
    {
        this.jobId = jobId;
        this.positionId = positionId;
        this.enactedId = enactedId;
    }

    public int getJobId()
    {
        return jobId;
    }

    public void setJobId(int jobId)
    {
        this.jobId = jobId;
    }

    public int getPositionId()
    {
        return positionId;
    }

    public void setPositionId(int positionId)
    {
        this.positionId = positionId;
    }

    public char getEnactedId()
    {
        return enactedId;
    }

    public void setEnactedId(char enactedId)
    {
        this.enactedId = enactedId;
    }

    @Override
    public boolean equals(Object o)
    {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DistrictId that = (DistrictId) o;
        return Objects.equals(jobId, that.jobId) && Objects.equals(positionId, that.positionId) && Objects.equals(enactedId, that.enactedId);
    }

    @Override
    public int hashCode()
    {
        return Objects.hash(jobId, positionId, enactedId);
    }
}