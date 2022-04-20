package com.main.fileserver;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.main.enums.StateCode;
import com.main.fileserver.models.DistrictingFile;
import com.main.helper.ConversionHelper;
import com.main.mysql.models.ids.DistrictingId;

import java.io.File;
import java.io.IOException;

public class DistrictingFileManager
{
    private static String jobsPath = "src/public/Files/Districtings/%s/Districting_%s.json";
    private static String enactedPath = "src/public/Files/enacted/%s.json";
    private static ObjectMapper objectMapper = new ObjectMapper();

    public static DistrictingFile getDistrictingFile(int jobId, int positionId) throws IOException
    {
        DistrictingFile var = objectMapper.readValue(new File(String.format(jobsPath, jobId, positionId)), DistrictingFile.class);
        var.id = positionId;
        return var;
    }
    public static DistrictingFile getDistrictingFile(DistrictingId id) throws IOException
    {
        String file = String.format(jobsPath, id.getJobId(), id.getPositionId());
        return objectMapper.readValue(new File(String.format(jobsPath, id.getJobId(), id.getPositionId())), DistrictingFile.class);
    }

    public static DistrictingFile getEnacted(int stateCode) throws IOException
    {
        String state = ConversionHelper.intStateToName(stateCode);
        String file = String.format(enactedPath, state);
        return objectMapper.readValue(new File(file), DistrictingFile.class);
    }
}