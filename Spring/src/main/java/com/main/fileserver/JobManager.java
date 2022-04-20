package com.main.fileserver;

import com.main.enums.StateCode;
import com.main.helper.ConversionHelper;
import com.main.mysql.models.Job;
import com.main.rest.TheExceptions;

import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class JobManager
{
    public static Job[] jobs = new Job[]
        {
                new Job(1, StateCode.nc, 0.07f, 105200),
                new Job(2, StateCode.nc, 0.05f, 97600),
                new Job(3, StateCode.nc, 0.03f, 0),
                new Job(4, StateCode.mi, 0.07f, 70674),
                new Job(5, StateCode.mi, 0.05f, 0),
                new Job(6, StateCode.mi, 0.03f, 0),
                new Job(7, StateCode.ga, 0.07f, 105600),
                new Job(8, StateCode.ga, 0.05f, 94400),
                new Job(9, StateCode.ga, 0.03f, 83200)
        };

    public static List<Job> getJobsOfState(StateCode stateCode)
    {
        return Arrays.stream(jobs)
                .filter(job -> job.getStateCode() == stateCode)
                .collect(Collectors.toList());
    }

    public static  Job getJobById(int id)
    {
        return Arrays.stream(jobs)
                .filter(job -> job.getId() == id)
                .findFirst()
                .get();
    }
}