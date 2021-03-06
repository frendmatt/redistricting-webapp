export enum StateCode{
    nc,
    mi,
    ga
}
export enum Party{
    DEMOCRAT,
    REPUBLICAN
}

export enum Measures{
    EQUAL_POPULATION = "EQUAL_POPULATION",
    DEVIATION_ENACTED = "DEVIATION_ENACTED",
    DEVIATION_ENACTED_GEO = "DEVIATION_ENACTED_GEO",
    DEVIATION_ENACTED_POP = "DEVIATION_ENACTED_POP",
    DEVIATION_AVERAGE = "DEVIATION_AVERAGE",
    SPLIT_COUNTIES = "SPLIT_COUNTIES",
    COMPACTNESS = "COMPACTNESS",
    POLITICAL_FAIRNESS = "POLITICAL_FAIRNESS",
    OBJECTIVE_SCORE = "OBJECTIVE_SCORE"
}

export enum Minority{
    HISPANIC,
    WHITE,
    BLACK,
    ASIAN,
    NATIVE_AMERICAN,
    NATIVE_HAWAIIAN
}

export enum PopulationType{
    TOTAL,
    VOTING_AGE,
    CITIZEN_VOTING_AGE
}

export enum CompactnessType{
    GRAPH_COMPACTNESS,
    POPULATION_FATNESS,
    POLSBY_POPPER
}

export enum AllPopulations{
    HISPANIC,
    WHITE,
    BLACK,
    ASIAN,
    NATIVE_AMERICAN,
    NATIVE_HAWAIIAN,
    TOTAL,
    VOTING_AGE,
    CITIZEN_VOTING_AGE,
    DEMOCRAT,
    REPUBLICAN
}

export enum HTTP_METHOD{
    POST,
    GET
}