package com.main.fileserver;

import com.main.enums.StateCode;
import com.main.mysql.models.Job;
import com.main.mysql.models.State;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

public class IncumbentManager
{
    public static HashMap<StateCode, HashMap<String, Integer>> incumbents = new HashMap<StateCode, HashMap<String, Integer>>()
    {{
        put(StateCode.nc, new HashMap<String, Integer>(){{
            put("George 'G.K.' Butterfield Jr.", 1);
            put("Deborah Ross", 2);
            put("Gregory Murphy", 3);
            put("David Price", 4);
            put("Virginia Foxx", 5);
            put("Kathy Manning", 6);
            put("David Rouzer", 7);
            put("Richard Hudson", 8);
            put("Dan Bishop", 9);
            put("Patrick McHenry", 10);
            put("David 'Madison' Cawthorn", 11);
            put("Alma Adams", 12);
            put("Ted Budd", 13);
        }});

        put(StateCode.mi, new HashMap<String, Integer>(){{
            put("Jack Bergman", 1);
            put("Bill Huizenga", 2);
            put("Peter Meijer", 3);
            put("John Moolenaar", 4);
            put("Daniel Kildee", 5);
            put("Fred Upton", 6);
            put("Tim Walberg", 7);
            put("Elissa Slotkin", 8);
            put("Andy Levin", 9);
            put("Lisa McClain", 10);
            put("Haley Stevens", 11);
            put("Debbie Dingell", 12);
            put("Rashida Tlaib", 13);
            put("Brenda Lawrence", 14);
        }});


        put(StateCode.ga, new HashMap<String, Integer>(){{
            put("Earl 'Buddy' Carter", 1);
            put("Sanford Bishop Jr.", 2);
            put("Drew Ferguson", 3);
            put("Hank Johnson", 4);
            put("Nikema Williams", 5);
            put("Lucy McBath", 6);
            put("Carolyn Bourdeaux", 7);
            put("Austin Scott", 8);
            put("Andrew Clyde", 9);
            put("Jody Hice", 10);
            put("Barry Loudermilk", 11);
            put("Rick Allen", 12);
            put("David Scott", 13);
            put("Marjorie Greene", 14);
        }});
    }};


    public static HashMap<String, Integer> getIncumbentByState(StateCode stateCode)
    {
        return incumbents.get(stateCode);
    }
}