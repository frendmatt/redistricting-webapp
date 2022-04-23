import {StateCode} from "./enums.ts";

const config = {
    map : {
        colors : [
            "rgba(32,142,183,0.5)", "rgba(121,172,61,0.5)", "rgba(164,4,77,0.5)"
            , "rgba(92,218,197,0.5)", "rgba(225,50,36,0.5)", "rgba(108,240,77,0.5)"
            , "rgba(135,60,169,0.5)", "rgba(172,202,226,0.5)", "rgba(44,78,47,0.5)"
            , "rgba(236,162,213,0.5)", "rgba(47,101,208,0.5)", "rgba(245,148,59,0.5)"
            , "rgba(134,60,44,0.5)", "rgba(190,190,80,0.5)"
        ],
        stateSelectViewport : {
            latitude: 39, longitude: -83.8, width: "100%", height: "100%", zoom: 4
            , minZoom: 4.6, maxZoom: 4.6, maxPitch: 0
        },
        stateSelectBounds : [
            -83.8, -83.8, 39, 39
        ],
        outlineLayerStyle : {
            type: 'fill'
            ,paint: {
              'fill-color': "rgba(32,142,183,0.5)"
              ,'fill-antialias': true
              ,'fill-outline-color': "rgba(0, 0, 0, 0.3)"
            }
        }
    },
    connection : {
        springEndpoint : "http://localhost:8080/api/v1/",
        flaskEndpoint : "http://127.0.0.1:5000/",
        mapboxToken : "pk.eyJ1Ijoicm9zZWtlbm55MTIiLCJhIjoiY2tsc3d1ZmV3MDhtdzJ1bzUxdXozOGpwcSJ9.mHBF_KhaX11ISZqcI3UvJA",
        mapStyle : "mapbox://styles/rosekenny12/cklsxxzqx0d8m17qfi6hl0qvv"
    },
    stateArray : [
        {
            stateCode : 'nc',
            stateName : 'North Carolina',
            stateEnum : StateCode.nc,
            incumbents : [
                "George Butterfield Jr. (Democratic, District 1)",
                "Deborah Ross (Democratic, District 2)",
                "Gregory Murphy (Republican, District 3)",
                "David Price (Democratic, District 4)",
                "Virginia Foxx (Republican, District 5)",
                "Kathy Manning (Democratic, District 6)",
                "David Rouzer (Republican, District 7)",
                "Richard Hudson (Republican, District 8)",
                "Dan Bishop (Republican, District 9)",
                "Patrick McHenry (Republican, District 10)",
                "David Cawthorn (Republican, District 11)",
                "Alma Adams (Democratic, District 12)",
                "Ted Budd (Republican, District 13)"
            ], 
            geoJSON : require('./geojsons/nc.json'), 
            viewport : {
                latitude: 35.4,
                longitude: -79.85,
                width: "100%",
                height: "100%",
                zoom: 6.49,
                minZoom: 6.49,
                maxPitch: 0
            },
            bounds : [
                -84.41787638913273,
                -75.38548650267319,
                33.81413707067554,
                36.53869384041144
            ]

        }, 
        {
            stateCode : 'mi', 
            stateName : 'Michigan',
            stateEnum : StateCode.mi,
            incumbents : [
                "Jack Bergman (Republican, District 1)",
                "Bill Huizenga (Republican, District 2)",
                "Peter Meijer (Republican, District 3)",
                "John Moolenaar (Republican, District 4)",
                "Daniel Kildee (Democratic, District 5)",
                "Fred Upton (Republican, District 6)",
                "Tim Walberg (Republican, District 7)",
                "Elissa Slotkin (Democratic, District 8)",
                "Andy Levin (Democratic, District 9)",
                "Lisa McClain (Republican, District 10)",
                "Haley Stevens (Democratic, District 11)",
                "Debbie Dingell (Democratic, District 12)",
                "Rashida Tlaib (Democratic, District 13)",
                "Brenda Lawrence (Democratic, District 14)"
            ], 
            geoJSON : require('./geojsons/mi.json'), 
            viewport : {
                latitude: 44.5,
                longitude: -85.5,
                width: "100%",
                height: "100%",
                zoom: 5.77,
                minZoom: 5.77,
                maxPitch: 0
            },
            bounds : [
                -91.15953556950757,
                -82.60958301278323,
                41.78535899330485,
                48.10156913649621
            ]
        }, 
        {
            stateCode : 'ga',
            stateName : 'Georgia',
            stateEnum : StateCode.ga,
            incumbents : [
                "Earl Carter (Republican, District 1)",
                "Sanford Bishop Jr. (Democratic, District 2)",
                "Drew Ferguson IV (Republican, District 3)",
                "Henry Johnson Jr. (Democratic, District 4)",
                "Nikema Williams (Democratic, District 5)",
                "Lucy McBath (Democratic, District 6)",
                "Carolyn Bourdeaux (Democratic, District 7)",
                "Austin Scott (Republican, District 8)",
                "Andrew Clyde (Republican, District 9)",
                "Jody Hice (Republican, District 10)",
                "Barry Loudermilk (Republican, District 11)",
                "Rick Allen (Republican, District 12)",
                "David Scott (Democratic, District 13)",
                "Marjorie Greene (Republican, District 14)"
            ], 
            geoJSON : require('./geojsons/ga.json'), 
            viewport : {
                latitude: 32.7,
                longitude: -83.25,
                width: "100%",
                height: "100%",
                zoom: 6.8,
                minZoom: 6.8,
                maxPitch: 0
            },
            bounds : [
                -85.60305185786993,
                -80.91988427586175,
                30.482961354435176,
                35.276804126736281
            ]
        }
    ]
}

export default config;