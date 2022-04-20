package com.main.fileserver.models;

import java.util.List;

public class DistrictingFile
{
    public int id;
    public List<DistrictFile> districts;
    public DistrictingMeasuresFile measures;
    public DistrictingObjectiveFile objectiveScores;
    public int majorityMinority;
    public long job;
    public float area;
}