package com.main.rest;

import com.main.enums.AllPopulations;
import com.main.enums.Minority;
import com.main.enums.StateCode;
import com.main.fileserver.models.DistrictingFile;
import com.main.mysql.models.*;
import com.main.mysql.models.ids.DistrictingId;
import com.main.mysql.repos.*;
import com.main.rest.models.AverageDistricting;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TheService
{
    @Autowired
    private final StateRepo stateRepo = null;

    @Autowired
    private final PrecinctRepo precinctRepo = null;

    @Autowired
    private final JobRepo jobRepo = null;

    @Autowired
    private final IncumbentRepo incumbentRepo = null;

    @Autowired
    private final DistrictingRepo districtingRepo = null;
    @Autowired
    private final DistrictRepo districtRepo = null;

    @Autowired
    public TheService()
    {
    }

    public List<Job> getJobsForState(int stateCode)
    {
        Optional<List<Job>> jobOptional = jobRepo.findJobsByState(StateCode.values()[stateCode]);
        if (jobOptional.isEmpty())
        {
            throw new TheExceptions.ItemNotFoundException();
        } else
        {
            return jobOptional.get();
        }
    }

    public State getStateByCode(StateCode stateCode)
    {
        Optional<State> stateOptional = stateRepo.findById(stateCode);
        if (stateOptional.isEmpty())
        {
            throw new TheExceptions.ItemNotFoundException();
        } else
        {
            return stateOptional.get();
        }
    }

    public Precinct getPrecinctByName(String precinctName)
    {
        Optional<Precinct> precinctOptional = precinctRepo.findById(precinctName);
        if (precinctOptional.isEmpty())
        {
            throw new TheExceptions.ItemNotFoundException();
        } else
        {
            return precinctOptional.get();
        }
    }

    public List<Object[]> applyConstraints2(int jobId, float compactness, float populationEquality, AllPopulations populationEqualityType)
    {
        Optional<List<Object[]>> districtingOptional = districtRepo.applyConstraints(jobId, compactness, populationEquality, populationEqualityType.ordinal());
        if (districtingOptional.isEmpty())
        {
            throw new TheExceptions.ItemNotFoundException();
        } else
        {
            return districtingOptional.get();
        }
    }

    public List<Object[]> majority_minority(int jobId, Minority m)
    {
        Optional<List<Object[]>> districtingOptional = districtRepo.majority_minority(jobId, m.ordinal());
        if (districtingOptional.isEmpty())
        {
            throw new TheExceptions.ItemNotFoundException();
        } else
        {
            return districtingOptional.get();
        }
    }
}