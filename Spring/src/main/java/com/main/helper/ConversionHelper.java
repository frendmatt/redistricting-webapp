package com.main.helper;

import com.main.enums.StateCode;
import com.main.rest.TheExceptions;

public class ConversionHelper
{
    public static String intStateToName(int stateCode)
    {
        try
        {
            return StateCode.values()[stateCode].name();
        } catch (IndexOutOfBoundsException e)
        {
            throw new TheExceptions.ItemNotFoundException();
        }
    }
}