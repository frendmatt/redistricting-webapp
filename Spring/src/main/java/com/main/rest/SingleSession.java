package com.main.rest;

import com.main.fileserver.models.DistrictingFile;
import com.main.mysql.models.ids.DistrictingId;
import com.main.rest.models.AverageDistricting;
import com.main.rest.models.Constraints;

import java.util.ArrayList;

public class SingleSession
{
    private static SingleSession instance;

    private ArrayList<DistrictingFile> constrainedDistrictings;

    private AverageDistricting averageDistricting;

    public DistrictingFile getEnacted() {
        return enacted;
    }

    public void setEnacted(DistrictingFile enacted) {
        this.enacted = enacted;
    }

    private DistrictingFile enacted;

    public Constraints getConstraints() {
        return constraints;
    }

    public void setConstraints(Constraints constraints) {
        this.constraints = constraints;
    }

    private Constraints constraints;

    public SingleSession()
    {
    }



    public AverageDistricting getAverageDistricting() {
        return averageDistricting;
    }

    public void setAverageDistricting(AverageDistricting averageDistricting) {
        this.averageDistricting = averageDistricting;
    }

    public static SingleSession getInstance()
    {
        if(instance == null)
            instance = new SingleSession();
        return instance;
    }

    public static void setInstance(SingleSession instance)
    {
        SingleSession.instance = instance;
    }

    public ArrayList<DistrictingFile> getConstrainedDistrictings()
    {
        return constrainedDistrictings;
    }

    public void setConstrainedDistrictings(ArrayList<DistrictingFile> constrainedDistrictings)
    {
        this.constrainedDistrictings = constrainedDistrictings;
    }
}
