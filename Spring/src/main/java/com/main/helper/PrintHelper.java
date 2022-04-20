package com.main.helper;

public class PrintHelper
{
    public static void printWithTime(Object out)
    {
        System.out.println(java.time.LocalTime.now() + ": " + out.toString());
    }
}
