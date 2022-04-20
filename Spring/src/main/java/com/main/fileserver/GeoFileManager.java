package com.main.fileserver;

import com.main.enums.StateCode;
import com.main.helper.ConversionHelper;
import com.main.rest.TheExceptions;

import java.io.*;

public class GeoFileManager
{

    public static String getEnactedGeometry(int s) throws Exception
    {
        String state = ConversionHelper.intStateToName(s);
        String file = String.format("src/public/districtings/%s/enacted.json", state);
        return readFromInputStream(file);
    }

    public static String getCountyGeometry(int s) throws Exception
    {
        String state = ConversionHelper.intStateToName(s);
        String file = String.format("src/public/counties/%s.json", state);
        return readFromInputStream(file);
    }

    public static String getPrecinctGeometry(int s) throws Exception
    {
        String state = ConversionHelper.intStateToName(s);
        String file = String.format("src/public/precincts/%s.json", state);
        return readFromInputStream(file);
    }

    public static String getDistrictingSummary(int jobID, String ID) throws Exception
    {
        String job = Integer.toString(jobID);
        String file = String.format("src/public/Files/Districtings/%s/%s.json", job, ID);
        return readFromInputStream(file);
    }

    private static String readFromInputStream(String file) throws IOException, TheExceptions.ItemNotFoundException
    {
        try
        {
            File initialFile = new File(file);
            InputStream inputStream = new FileInputStream(initialFile);
            {
                StringBuilder resultStringBuilder = new StringBuilder();
                try (BufferedReader br = new BufferedReader(new InputStreamReader(inputStream)))
                {
                    String line;
                    while ((line = br.readLine()) != null)
                    {
                        resultStringBuilder.append(line).append("\n");
                    }
                }
                return resultStringBuilder.toString();
            }
        } catch (FileNotFoundException e)
        {
            throw new TheExceptions.ItemNotFoundException();
        }
    }
}