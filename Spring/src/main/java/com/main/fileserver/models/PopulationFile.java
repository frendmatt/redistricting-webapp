package com.main.fileserver.models;

import com.main.enums.Minority;
import com.main.enums.Party;
import com.main.enums.PopulationType;

import java.util.Map;

public class PopulationFile
{
    public String id;
    public Map<Minority, Integer> minorities;
    public Map<PopulationType, Integer> populationType;
    public Map<Party, Integer> parties;

    public void changePopulation(PopulationFile p, Boolean add)
    {
        for (Map.Entry<Minority, Integer> entry : p.minorities.entrySet())
        {
            Minority m = entry.getKey();
            Integer e = entry.getValue();
            if (this.minorities.containsKey(m))
            {
                if (!add)
                {
                    e *= -1;
                }
                e += this.minorities.get(m);
            }
            this.minorities.put(m, e);
        }
        for (Map.Entry<PopulationType, Integer> entry : p.populationType.entrySet())
        {
            PopulationType pt = entry.getKey();
            Integer e = entry.getValue();
            if (this.populationType.containsKey(pt))
            {
                if (!add)
                {
                    e *= -1;
                }
                e += this.populationType.get(pt);
            }
            this.populationType.put(pt, e);
        }
        for (Map.Entry<Party, Integer> entry : p.parties.entrySet())
        {
            Party py = entry.getKey();
            Integer e = entry.getValue();
            if (this.parties.containsKey(py))
            {
                if (!add)
                {
                    e *= -1;
                }
                e += this.parties.get(py);
            }
            this.parties.put(py, e);
        }
    }
}