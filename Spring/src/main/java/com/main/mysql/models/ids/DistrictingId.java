package com.main.mysql.models.ids;

import java.io.Serializable;
import java.util.Objects;

public class DistrictingId implements Serializable
{
    private int jobId = -1;
    private int positionId = -1;

    public DistrictingId()
    {
        super();
    }

    public DistrictingId(int job, int positionId)
    {
        this.jobId = job;
        this.positionId = positionId;
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

    @Override
    public boolean equals(Object o)
    {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DistrictingId that = (DistrictingId) o;
        return Objects.equals(jobId, that.jobId) && Objects.equals(positionId, that.positionId);
    }

    @Override
    public int hashCode()
    {
        return Objects.hash(jobId, positionId);
    }
}