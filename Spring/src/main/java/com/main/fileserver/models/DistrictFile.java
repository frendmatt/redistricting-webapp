package com.main.fileserver.models;

import java.util.List;

public class DistrictFile
{
    public char enactedId;
    public List<String> precincts;
    public PopulationFile populations;
    public DistrictMeasuresFile measures;
    public List<String> incumbents;
    public float area;
    public float perimeter;
}