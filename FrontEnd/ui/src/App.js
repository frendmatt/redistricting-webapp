import './App.css';
import React from "react";
import ReactMapGL from "react-map-gl";
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import MapLayer from './components/MapLayer';
import JobsModal from './components/JobsModal';
import {StateCode,Measures,HTTP_METHOD} from "./enums.ts";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MeasuresTab from './components/MeasuresTab';
import ResultsTab from './components/ResultsTab'
import ConstraintsTab from './components/ConstraintsTab';
import DistrictModal from './components/DistrictModal';
import IncumbentsModal from './components/IncumbentsModal';
import LoadingModal from './components/LoadingModal';
import DistrictingModal from './components/DistrictingModal'
import { Button, Grid } from '@material-ui/core';
import PrecinctInfo from './components/PrecinctInfo';
import ConstraintsModal from './components/ConstraintsModal';


//#region STATIC VALUES

  //#region VARIABLES
    const STATE_CODES = [
      "nc"
      ,"mi"
      ,"ga"
    ];

    const RGB_HEX = [
      "rgba(32,142,183,0.5)"
      ,"rgba(121,172,61,0.5)"
      ,"rgba(164,4,77,0.5)"
      ,"rgba(92,218,197,0.5)"
      ,"rgba(225,50,36,0.5)"
      ,"rgba(108,240,77,0.5)"
      ,"rgba(135,60,169,0.5)"
      ,"rgba(172,202,226,0.5)"
      ,"rgba(44,78,47,0.5)"
      ,"rgba(236,162,213,0.5)"
      ,"rgba(47,101,208,0.5)"
      ,"rgba(245,148,59,0.5)"
      ,"rgba(134,60,44,0.5)"
      ,"rgba(190,190,80,0.5)"
    ];

    const DEFAULT_VIEWPORT = {
      latitude: 39
      ,longitude: -83.8
      ,width: "100%"
      ,height: "100%"
      ,zoom: 4.6
      ,minZoom: 4.6
      ,maxZoom: 4.6
      ,maxPitch: 0
    };

    const DEFAULT_BOUNDS = [
      -83.8
      ,-83.8
      ,39
      ,39
    ];

    const defaultLayerStyle = {
      type: 'fill'
      ,paint: {
        'fill-color': RGB_HEX[0]
        ,'fill-antialias': true
        ,'fill-outline-color': "rgba(0, 0, 0, 0.3)"
      }
    };
  //#endregion VARIABLES

  //#region FUNCTIONS
    function setupLayer(id, idx = null) {
      if (idx == null) idx = STATE_CODES.indexOf(id);
      let layerStyle = defaultLayerStyle;
      return layerStylePaint(layerStyle, RGB_HEX[idx]);
    }

    function layerStylePaint(layerStyle, fill_color = "rgba(0,0,0,0.0)", fill_outline_color = "rgba(0,0,0,0.0)") {
      let style = { 
        ...layerStyle
        ,paint: {
          ...layerStyle.paint
          ,'fill-color': fill_color
          ,'fill-outline-color': fill_outline_color
        }
      };
      return style
    }  
    
    function createData(id, objectiveScore, equalPopulationScore, deviationAverageScore, deviationEnactedScore, compactnessScore, splitCountiesScore,districts) {
      return { 
        id: id,
        measures: {
          objectiveScore: objectiveScore
          ,equalPopulationScore: equalPopulationScore
          ,deviationAverageScore: deviationAverageScore
          ,deviationEnactedScore: deviationEnactedScore
          ,compactnessScore: compactnessScore
          ,splitCountiesScore: splitCountiesScore
        },
        districts: districts
      };
    }
    
    function createJobs(id, numDistrictings, equalPopulation) {
      return { 
        id: id
        ,numDistrictings: numDistrictings
        ,equalPopulation: equalPopulation 
      };
    }
  //#endregion FUNCTIONS

  //#region CONNECTION STRINGS
    const SPRING_ENDPOINT = "http://localhost:8080/api/v1/"
    const FLASK_ENDPOINT = "http://127.0.0.1:5000/"
    const MAPBOX_TOKEN = "pk.eyJ1Ijoicm9zZWtlbm55MTIiLCJhIjoiY2tsc3d1ZmV3MDhtdzJ1bzUxdXozOGpwcSJ9.mHBF_KhaX11ISZqcI3UvJA";
    const MAP_STYLE = "mapbox://styles/rosekenny12/cklsxxzqx0d8m17qfi6hl0qvv"
  //#endregion CONNECTION STRINGS

  //#region NC
    const NC_INCUMBENTS = [
      "George Butterfield Jr. (Democratic, District 1)"
      ,"Deborah Ross (Democratic, District 2)"
      ,"Gregory Murphy (Republican, District 3)"
      ,"David Price (Democratic, District 4)"
      ,"Virginia Foxx (Republican, District 5)"
      ,"Kathy Manning (Democratic, District 6)"
      ,"David Rouzer (Republican, District 7)"
      ,"Richard Hudson (Republican, District 8)"
      ,"Dan Bishop (Republican, District 9)"
      ,"Patrick McHenry (Republican, District 10)"
      ,"David Cawthorn (Republican, District 11)"
      ,"Alma Adams (Democratic, District 12)"
      ,"Ted Budd (Republican, District 13)"
    ];

    const NC_GEO = require('./geojsons/nc.json');

    const NC_VIEWPORT = {
      latitude: 35.4
      ,longitude: -79.85
      ,width: "100%"
      ,height: "100%"
      ,zoom: 6.49
      ,minZoom: 6.49
      ,maxPitch: 0
    };

    const NC_BOUNDS = [
      -84.41787638913273
      ,-75.38548650267319
      ,33.81413707067554
      ,36.53869384041144
    ];
  //#endregion NC

  //#region GA
    const GA_INCUMBENTS = [
      "Earl Carter (Republican, District 1)"
      ,"Sanford Bishop Jr. (Democratic, District 2)"
      ,"Drew Ferguson IV (Republican, District 3)"
      ,"Henry Johnson Jr. (Democratic, District 4)"
      ,"Nikema Williams (Democratic, District 5)"
      ,"Lucy McBath (Democratic, District 6)"
      ,"Carolyn Bourdeaux (Democratic, District 7)"
      ,"Austin Scott (Republican, District 8)"
      ,"Andrew Clyde (Republican, District 9)"
      ,"Jody Hice (Republican, District 10)"
      ,"Barry Loudermilk (Republican, District 11)"
      ,"Rick Allen (Republican, District 12)"
      ,"David Scott (Democratic, District 13)"
      ,"Marjorie Greene (Republican, District 14)"
    ];

    const GA_GEO = require('./geojsons/ga.json');

    const GA_VIEWPORT = {
      latitude: 32.7
      ,longitude: -83.25
      ,width: "100%"
      ,height: "100%"
      ,zoom: 6.8
      ,minZoom: 6.8
      ,maxPitch: 0
    };

    const GA_BOUNDS = [
      -85.60305185786993
      ,-80.91988427586175
      ,30.482961354435176
      ,35.276804126736281
    ];
  //#endregion GA

  //#region MI
    const MI_INCUMBENTS = [
      "Jack Bergman (Republican, District 1)"
      ,"Bill Huizenga (Republican, District 2)"
      ,"Peter Meijer (Republican, District 3)"
      ,"John Moolenaar (Republican, District 4)"
      ,"Daniel Kildee (Democratic, District 5)"
      ,"Fred Upton (Republican, District 6)"
      ,"Tim Walberg (Republican, District 7)"
      ,"Elissa Slotkin (Democratic, District 8)"
      ,"Andy Levin (Democratic, District 9)"
      ,"Lisa McClain (Republican, District 10)"
      ,"Haley Stevens (Democratic, District 11)"
      ,"Debbie Dingell (Democratic, District 12)"
      ,"Rashida Tlaib (Democratic, District 13)"
      ,"Brenda Lawrence (Democratic, District 14)"
    ];

    const MI_GEO = require('./geojsons/mi.json');

    const MI_VIEWPORT = {
      latitude: 44.5
      ,longitude: -85.5
      ,width: "100%"
      ,height: "100%"
      ,zoom: 5.77
      ,minZoom: 5.77
      ,maxPitch: 0
    };
    
    const MI_BOUNDS = [
      -91.15953556950757
      ,-82.60958301278323
      ,41.78535899330485
      ,48.10156913649621
    ];
  //#endregion MI

//#endregion STATIC VALUES

function App() {
  //#region STATE

    //#region STATE STATES
      const [appState, setAppState] = React.useState({
        state: {
          idx: null
          ,code: null
        }
      });

      const goToStateSelect = () => {
        setMapLayerVisibility("District", "OFF");
        setMapLayerVisibility("Enacted", "OFF");
        setMapLayerVisibility("State", "ON");
        setStateDropDown("");
        setMainTabValue(0);
        setCurrentJob(-1);
        setCompactness(0.025);
        setHideDistrictModal(true);
        setHideDistrictingModal(true);
        setPopulationEquality(10);
        setMajMinDistricts(0);
        setMajMinThreshold(35);
        setCompactnessType("");
        setPopulationType("");
        setMinority("");
        setCompactnessW(50);
        setPopulationEqualityW(50);
        setSplitCountiesW(50);
        setDeviationAverageW(50);
        setDeviationEnactedW(50);
        setPoliticalFairnessW(50);
        setViewport(DEFAULT_VIEWPORT);
        setAppState({state: {idx: null, code: null}});
        setIncumbentsList([]);
        setDisableConstraints(true);
        if (checkCountyBorder) {
          setMapLayerVisibility("County", "OFF");
          setCheckCountyBorder(false);
        }
        if (checkPrecinctBorder){
          setMapLayerVisibility("Precinct", "OFF");
          setCheckPrecinctBorder(false);
        }
        setCheckCurrentDistricting(false);
        setDisableCurrentDistricting(true);
        setDisableMeasuresTab(true);
        setDisableResultsTab(true);
        setDisableCountyBorder(true);
        setDisablePrecinctBorder(true);
        setHidePrecinctModal(true);
      }

      const stateChange = (newValue) => {
        let stateCode, idx, stateEnum;

        Call_API(HTTP_METHOD.GET, `session`).then(res => {});
        
        setHideLoadingModal(false);
        setMapLayerVisibility("State", "OFF");
        if (newValue === 0 || newValue === "nc") { setViewport(NC_VIEWPORT); stateCode = "nc"; idx = 0; stateEnum = StateCode.nc; setStateDropDown("North Carolina");}
        else if (newValue === 1 || newValue === "mi") { setViewport(MI_VIEWPORT); stateCode = "mi"; idx = 1; stateEnum = StateCode.mi; setStateDropDown("Michigan");}
        else { setViewport(GA_VIEWPORT); stateCode = "ga"; idx = 2; stateEnum = StateCode.ga; setStateDropDown("Georgia");}
        setAppState({state: {idx: idx, code: stateCode}});
    
        var promises = [
          getCountyGeometry(stateEnum)
          ,getPrecinctGeometry(stateEnum)
          ,getEnactedGeometry(stateEnum)
          ,getJobs(stateEnum)
        ]
        Promise.allSettled(promises)
          .then(function(){
            setHideLoadingModal(true);
            setDisableCountyBorder(false);
            setDisablePrecinctBorder(false);
            setDisableConstraints(false);
          })
          .catch(err => console.log('error', err)
        )  
      };
    //#endregion STATE STATES

    //#region MODAL STATES
      const [hideIncumbentsModal, setHideIncumbentsModal] = React.useState(true);
      const [hideDistrictingModal, setHideDistrictingModalState] = React.useState(true);
      const setHideDistrictingModal = (newVal) =>{
        if (newVal===true){
          setDistrictingTabValue(0);
        }
        setHideDistrictingModalState(newVal);
      };
      const [districting_modal_rows, set_districting_modal_rows] = React.useState([]);
      const [hideJobsModal, setHideJobsModal] = React.useState(true);
      const [hideLoadingModal, setHideLoadingModal] = React.useState(true);
      const [splitCounties, setSplitCounties] = React.useState([]);
      const [wastedVotes, setWastedVotes] = React.useState([]);
      const [devEn, setDevEn] = React.useState([]);
      const [districtData, setDistrictData] = React.useState(null);
      const [currentDistricting, setCurrentDistricting] = React.useState(0);

      const [boxAndWhiskerData, setBoxAndWhiskerData] = React.useState([])
      const [equalPop, setEqualPop] = React.useState({"bad_districts": [], "breakdown": []})
      const [majMin, setMajMin] = React.useState([])

      const [hideConstraintsModal, setHideConstraintsModal] = React.useState(true);
      const [constrainedNumber, setConstrainedNumber] = React.useState(-1);

      const [hidePrecinctModal, setHidePrecinctModal] = React.useState(true);
      const [precinctModalCoordinates, setPrecinctModalCoordinates] = React.useState({
        x: 0
        ,y: 0
      });

      const [hideDistrictModal, setHideDistrictModal] = React.useState(true);
      const [districtNum, setDistrictNum] = React.useState(0);

      const openDistrictingModal = (id) => {
        if (hideDistrictingModal) {
        
          var promises = [
            getSplitCountyGeometry(id),
            getDistrictingRows(id),
            getDevEnacted(id),
            getBoxAndWhiskerData(id),
            getEqualPopulationData(id),
            getPoliticalFairness(id),
            getMajMin(id)
          ]
          Promise.allSettled(promises).then(function(){
            setHideDistrictingModal(false);
            setCurrentDistricting(id);
          });
        }
      }

      const getMajMin = (id) => {
        return new Promise( (resolve, reject) => {
          Call_API(HTTP_METHOD.GET, `/getMajorityMinorityDetail/${currentJob}/${id}`).then(res => {
            setMajMin(res);
            resolve(true);
          });
        });
      }

      const getDistrictingRows = (id) => {
        return new Promise( (resolve, reject) => {
          Call_API(HTTP_METHOD.GET, `/getDistrictingRows/${currentJob}/${id}`).then(res => {
            set_districting_modal_rows(res);
            resolve(true);
          });
        });
      }

      const getPoliticalFairness = (id) => {
        return new Promise( (resolve, reject) => {
          Call_API(HTTP_METHOD.GET, `/getPoliticalFairnessDetail/${currentJob}/${id}`).then(res => {
            setWastedVotes(res);
            resolve(true);
          });
        });
      }

      const getDistrictInfo = (id) => {
        return new Promise( (resolve, reject) => {
          Call_API(HTTP_METHOD.GET, `/getDistrictInfo/${currentJob}/${currentDistricting}/${id}`).then(res => {
            setDistrictData(res);
            resolve(true);
          });
        });
      }

      const getDevEnacted = (id) => {
        return new Promise( (resolve, reject) => {
          Call_API(HTTP_METHOD.GET, `/getDeviationEnactedDetail/${currentJob}/${id}`).then(res => {
            setDevEn(res);
            resolve(true);
          });
        });
      }

      const splitCountyUpdateFunction = (value) => {
        var tmp = mapLayers;
        if (tmp["Split_County"]){
          tmp["Split_County"].enabled = value;
          if (value===true){
            setCheckCountyBorder(value);
            tmp["County"].enabled = true;
          }
        }
      }

      const openDistrictModal = (id) => {
        setDistrictNum(id);
        getDistrictInfo(id);
        setHideDistrictModal(false);
      }
    //#endregion MODAL STATES

    //#region CHECKMARK STATES
      const [checkCountyBorder, setCheckCountyBorder] = React.useState(false);
      const [checkPrecinctBorder, setCheckPrecinctBorder] = React.useState(false);
      const [checkCurrentDistricting, setCheckCurrentDistricting] = React.useState(false);
    //#endregion CHECKMARK STATES

    //#region TAB STATES
      const [disableMeasuresTab, setDisableMeasuresTab] = React.useState(true);
      const [disableResultsTab, setDisableResultsTab] = React.useState(true);
      const [mainTabValue, setMainTabValue] = React.useState(0);
      const [districtingTabValue, setDistrictingTabValueState] = React.useState(0);

      const changeMainTabValue = (newVal) => {
        if (!hideDistrictingModal) return;
        setMainTabValue(newVal)
        if ((newVal === 0 || newVal === 1) && checkCurrentDistricting){
          setCheckCurrentDistricting(false); 
          setMapLayerVisibility("Enacted", "ON"); 
          setMapLayerVisibility("District", "OFF");
        }

      }

      const setDistrictingTabValue = (newVal) =>{
        if (newVal==2){
          splitCountyUpdateFunction(true);
        }
        else {
          splitCountyUpdateFunction(false);
          setMapLayerVisibility("County", "OFF");
          setCheckCountyBorder(false);
          
        }
        setDistrictingTabValueState(newVal);
      };
      const [districtTabValue, setDistrictTabValue] = React.useState(0);
    //#endregion TAB STATES

    //#region CONSTRAINTS AND WEIGHTS
      //#region CONSTRAINT STATES
        const [stateDropDown, setStateDropDown] = React.useState("");
        const [disableConstraints, setDisableConstraints] = React.useState(true);
        const [populationEquality, setPopulationEquality] = React.useState(10);
        const [compactness, setCompactness] = React.useState(.025);
        const [majMinDistricts, setMajMinDistricts] = React.useState(0);
        const [majMinThreshold, setMajMinThreshold] = React.useState(35);
        const [minority, setMinority] = React.useState('');
        const [populationType, setPopulationType] = React.useState('');
        const [compactnessType, setCompactnessType] = React.useState('');
      //#endregion CONSTRAINT STATES

      //#region WEIGHT STATES
        const [compactnessW, setCompactnessW] = React.useState(50);
        const [populationEqualityW, setPopulationEqualityW] = React.useState(50);
        const [deviationEnactedW, setDeviationEnactedW] = React.useState(50);
        const [deviationAverageW, setDeviationAverageW] = React.useState(50);
        const [splitCountiesW, setSplitCountiesW] = React.useState(50);
        const [politicalFairnessW, setPoliticalFairnessW] = React.useState(50);
        const [weights,setWeights] = React.useState({
          compactness: compactnessW / 100,
          populationEquality: populationEqualityW / 100,
          deviationEnacted: deviationEnactedW / 100,
          deviationAverage: deviationAverageW / 100,
          splitCounties: splitCountiesW / 100, 
          politicalFairness: politicalFairnessW / 100
        });
      //#endregion WEIGHT STATES

      const changeConstraintWeight = (name, newValue) => {
        var f = null
        switch (name) {
          case "POPULATIONEQUALITY": f = setPopulationEquality; break;
          case "COMPACTNESS": f = setCompactness; break;
          case "MAJMINDISTRICTS": f = setMajMinDistricts; break;
          case "MAJMINTHRESHOLD": f = setMajMinThreshold; break;
          case "MINORITY": f = setMinority; break;
          case "POPULATIONTYPE": f = setPopulationType; break;
          case "COMPACTNESSTYPE": f = setCompactnessType; break;
          case "POPULATIONEQUALITYW": f = setPopulationEqualityW; break;
          case "COMPACTNESSW": f = setCompactnessW; break;
          case "DEVIATIONENACTEDW": f = setDeviationEnactedW; break;
          case "DEVIATIONAVERAGEW": f = setDeviationAverageW; break;
          case "SPLITCOUNTIESW": f = setSplitCountiesW; break;
          case "POLITICALFAIRNESSW": f = setPoliticalFairnessW; break;
          default: break;
        }
        f(newValue)
        if (name.slice(-1) === "W" && !disableResultsTab) setDisableResultsTab(true);
        else if (name.slice(-1) !== "W" && !disableMeasuresTab && !disableResultsTab) {setDisableMeasuresTab(true); setDisableResultsTab(true);}
        else if (name.slice(-1) !== "W" && !disableMeasuresTab) setDisableMeasuresTab(true);
      }

    //#endregion CONSTRAINTS AND WEIGHTS

    //#region MAPBOX STATES
      const [viewport, setViewport] = React.useState(DEFAULT_VIEWPORT)
      const [shouldMapUpdate, setShouldMapUpdate] = React.useState(false);

      const forceMapUpdate = () => {
        setShouldMapUpdate(!shouldMapUpdate);
      }

      const onViewportChange = (viewport) => {
        let bounds = DEFAULT_BOUNDS;
        switch (appState.state.code) {
          case "nc": bounds = NC_BOUNDS; break;
          case "mi": bounds = MI_BOUNDS; break;
          case "ga": bounds = GA_BOUNDS; break;
          default: break;
        }
        if (viewport.longitude <= bounds[0]) viewport.longitude = bounds[0];
        if (viewport.longitude >= bounds[1]) viewport.longitude = bounds[1];
        if (viewport.latitude <= bounds[2]) viewport.latitude = bounds[2];
        if (viewport.latitude >= bounds[3]) viewport.latitude = bounds[3];
        setViewport(viewport);
      }
    //#endregion MAPBOX STATES

    //#region INCUMBENT STATE
      const [incumbentsList, setIncumbentsList] = React.useState([]);

      // Adds or removes incumbent from array
      const incumbentsListChange = (incumbent) => {
        if (!disableMeasuresTab) setDisableMeasuresTab(true);
        if (!disableResultsTab) setDisableResultsTab(true);
        if (incumbentsList.includes(incumbent + 1)) {
          const newIncumbents = incumbentsList.filter((t) => t !== incumbent + 1);
          setIncumbentsList(newIncumbents);
        } 
        else setIncumbentsList([...incumbentsList, incumbent + 1]);
      };
    //#endregion INCUMBENT STATE

    //#region MAPLAYER STATE
      const [disableCountyBorder, setDisableCountyBorder] = React.useState(true);            
      const [disablePrecinctBorder, setDisablePrecinctBorder] = React.useState(true);
      const [disableCurrentDistricting, setDisableCurrentDistricting] = React.useState(true);        
      const [mapLayers, setMapLayers] = React.useState({
        "County": {
          "id": "County"
          ,"type": "County"
          ,"data": null
          ,"layerStyle": {
            type: 'line'
            ,paint: {
              'line-color': "rgba(0, 0, 0, 1.0)"
              ,'line-width': 2
            }
          }
          ,"enabled": false
        }
        ,"Precinct": {
          "id": "Precinct"
          ,"type": 'Precinct'
          ,'layerStyle': layerStylePaint(defaultLayerStyle, "rgba(0, 0, 0, 0.0)", "rgba(0, 0, 0, 0.3)")
          ,'data': null
          ,'enabled': false
        }
        ,"ga": {
          "id": "ga"
          ,"type": 'State'
          ,'layerStyle': setupLayer('ga')
          ,'data': GA_GEO
          ,'idx': 2
          ,'enabled': true
        }
        ,"nc": {
          "id": "nc"
          ,"type": 'State'
          ,'layerStyle': setupLayer('nc')
          ,'data': NC_GEO
          ,'idx': 0
          ,'enabled': true
        }
        ,"mi": {
          "id": "mi"
          ,"type": 'State'
          ,'layerStyle': setupLayer('mi')
          ,'data': MI_GEO
          ,'idx': 1
          ,'enabled': true
        }
      });

      const setMapLayerVisibility = (layerType, mode) => {
        var tmp = mapLayers;
        for (var key in tmp) {
          if (tmp[key].type === layerType) {
            if (mode === "OFF") tmp[key].enabled = false;
            else tmp[key].enabled = true;
          }
        }
        setMapLayers(tmp);
      }
    
      const setMapLayerActiveDistrict = (id) => {
        let district = "Enacted"
        if (checkCurrentDistricting) district = "District"
        let tmp = mapLayers;
        for (let key in tmp) {
          if (tmp[key].type === district && tmp[key].id !== district + "_" + id) {
            tmp[key].layerStyle = {
              ...tmp[key].layerStyle
              ,paint: {
                ...tmp[key].layerStyle.paint
                ,'fill-color': "rgba(128, 128, 128, 0.3)"
              }
            }
          }
        }
        setMapLayers(tmp);
        forceMapUpdate();
      }

      const setMapLayerAllDistricts = () => {
        let district = "Enacted"
        if (checkCurrentDistricting) district = "District"
        let tmp = mapLayers;
        for (let key in tmp) {
          if (tmp[key].type === district) {
            tmp[key].layerStyle = {
              ...tmp[key].layerStyle
              ,paint: {
                ...tmp[key].layerStyle.paint
                ,'fill-color': RGB_HEX[tmp[key].id.substring(tmp[key].id.indexOf("_") + 1)]
              }
            }
          }
        }
        setMapLayers(tmp);
        forceMapUpdate();
      }
    
      const setMapLayerDistricting = (res, prefix) => {
        var tmp = mapLayers;  
        Object.keys(res).sort().forEach( (value,index) => {
          var id = prefix + "_" + index;
          var layerStyle = setupLayer(id, index);
          var districtInfo = {
            "id": id
            ,"type": prefix
            ,"data": res[value]
            ,"layerStyle": layerStyle
            ,"enabled": true
          }
          tmp[id] = districtInfo;
        });
        setMapLayers(tmp);
        if (prefix !== "Enacted") {
          setMapLayerVisibility("Enacted", "OFF");
          setCheckCurrentDistricting(true);
          setDisableCurrentDistricting(false);
        }
        forceMapUpdate();
      }

      const hoverMapLayerDistrictingResults = (index, mode) =>{
        if (hideDistrictingModal){
          var stateEnum = STATE_CODES.indexOf(appState.state.code);
          if (mode === "ON") enableDistrictingGeometry(index);
          else getEnactedGeometry(stateEnum);
        }
      }

      const mapClick = event => {
        const {
          features,
          srcEvent: { offsetX, offsetY }
        } = event;
        features.some(function(feature){
          let layer = feature['layer'];
          if (appState.state.code !== layer['id'] && STATE_CODES.includes(layer['id'])){
            stateChange(layer['id']);
            return true;
          }
          else if ("Precinct" === layer['id'].substring(0, 8)){
            var precinct = feature.properties.id;
            setHideLoadingModal(false);
            Call_API(HTTP_METHOD.GET,`getPrecinctInfo/${precinct}`).then(res=>{
              setSelectedPrecinct(res);
              setPrecinctModalCoordinates({ x: offsetX < 125 ? 30 : offsetX > 905 ? 930 : offsetX - 100, y: offsetY > 484 ? offsetY - 444 : offsetY + 10})
              setHidePrecinctModal(false);
              setHideLoadingModal(true);
            });
            return true;
          }
          return false;
        });
      };
    //#endregion MAPLAYER STATE

    const [districtings, setDistrictings] = React.useState([]);
    const [currentJob, setCurrentJob] = React.useState(-1);
    const [jobs, setJobs] = React.useState([]);
    const [numberTotal, setNumberTotal] = React.useState("");
    const [numberMajMin, setNumberMajMin] = React.useState("");
    const [numberIncumbent, setNumberIncumbent] = React.useState("");
    const [numberCompactness, setNumberCompactness] = React.useState("");
    const [numberPop, setNumberPop] = React.useState("");
    const [numberDistrictings, setNumberDistrictings] = React.useState("");

  //#endregion STATE

  //#region SERVER COMMUNICATION

    const Call_API = (method, request, content = null, requestMetadata = null) => {
      return new Promise( (resolve, reject) => {
        if (requestMetadata == null){
          requestMetadata = {};
          switch(method){
            case HTTP_METHOD.GET: requestMetadata['method'] = "GET"; break;
            case HTTP_METHOD.POST: requestMetadata['method'] = "POST"; break;
            default: requestMetadata['method'] = "GET"; break;
          }
          if (!('headers' in requestMetadata)) requestMetadata['headers'] = {};
          requestMetadata['headers']['Content-Type'] = "application/json";
        }
        if(content != null) requestMetadata['body'] = JSON.stringify(content);
        fetch(SPRING_ENDPOINT+request,requestMetadata).then(res => res.json().then(res=> { resolve(res); }), rej=> reject(rej));
      });
    }

    const Call_FLASK_API = (method, request, content = null, requestMetadata = null) => {
      return new Promise( (resolve, reject) => {
        if (requestMetadata == null){
          requestMetadata = {};
          switch(method){
            case HTTP_METHOD.GET: requestMetadata['method'] = "GET"; break;
            case HTTP_METHOD.POST: requestMetadata['method'] = "POST"; break;
            default: requestMetadata['method'] = "GET"; break;
          }
          if (!('headers' in requestMetadata)) requestMetadata['headers'] = {};
          requestMetadata['headers']['Content-Type'] = "application/json";
        }
        if(content != null) requestMetadata['body'] = JSON.stringify(content);
        fetch(FLASK_ENDPOINT+request,requestMetadata).then(res => res.json().then(res=> { resolve(res); }), rej=> reject(rej));
      });
    }

    const getCountyGeometry = (stateEnum) => {
      Call_API(HTTP_METHOD.GET, `getCountyGeometry/${ stateEnum }`).then(res => {
      var tmp = mapLayers;
      var layerStyle = {
        type: 'line'
        ,paint: {
          'line-color': "rgba(0, 0, 0, 1.0)"
          ,'line-width': 2
        }
      };
      var countyInfo = {
        "id": "County"
        ,"type": "County"
        ,"data": res
        ,"layerStyle": layerStyle
        ,"enabled": false
      }
      tmp["County"] = countyInfo;
      setMapLayers(tmp);
      });
    }

    const getSplitCountyGeometry = (districting) => {
      return new Promise( (resolve, reject) => {
        Call_API(HTTP_METHOD.GET, `getSplitCountyDetail/${ appState.state.idx }/${ currentJob }/${ districting }`).then(res => {
        var tmp = mapLayers;
        var layerStyle = {
          type: 'line'
          ,paint: {
            'line-color': "rgba(238, 238, 0, 1)"
            ,'line-width': 3
          }
        };
        var countyInfo = {
          "id": "Split_County"
          ,"type": "Split_County"
          ,"data": res.geometry
          ,"layerStyle": layerStyle
          ,"enabled": false
        }
        tmp["Split_County"] = countyInfo;
        setMapLayers(tmp);
        setSplitCounties(res.names);
        resolve(true);
        });
      });
    }

    const getBoxAndWhiskerData = (districting) => {
      return new Promise( (resolve, reject) => {
        Call_API(HTTP_METHOD.GET, `calculateAverageDistrictingCurrent/${ currentJob }/${ districting }`).then(res => {
          setBoxAndWhiskerData(res)
          resolve(true)
        })
      })
    }

    const getEqualPopulationData = (districting) => {
      return new Promise( (resolve, reject) => {
        Call_API(HTTP_METHOD.GET, `getEqualPopulationDetail/${ currentJob }/${ districting }`).then(res => {
          setEqualPop(res)
          resolve(true)
        })
      })
    }

    const getPrecinctGeometry = (stateEnum) => {
      Call_API(HTTP_METHOD.GET, `getPrecinctGeometry/${ stateEnum }`).then(res => {
        var tmp = mapLayers;
        var layerStyle = layerStylePaint(defaultLayerStyle, "rgba(0, 0, 0, 0.0)", "rgba(0, 0, 0, 0.3)");
        var precinctInfo = {
          "id": "Precinct"
          ,"type": "Precinct"
          ,"data": res
          ,"layerStyle": layerStyle
          ,"enabled": false
        }
        tmp["Precinct"] = precinctInfo;
        setMapLayers(tmp);
      });
    }

    const getDistrictingGeometry = (stateEnum,data) => {
      return new Promise( (resolve, reject) => {
        Call_FLASK_API(HTTP_METHOD.POST, `districtingGeometry/${ stateEnum }`,data).then(res => {
          resolve(res);
        });
      });
    }

    const enableDistrictingGeometry = (index) => {
      setMapLayerDistricting(districtings[index].geometry,"District");
    }

    const getEnactedGeometry = (stateEnum) => {
      Call_API(HTTP_METHOD.GET, `getEnactedGeometry/${ stateEnum }`).then(res => {
        setMapLayerDistricting(res, "Enacted");
      });
    }

    const getJobs = (stateEnum) => {
      Call_API(HTTP_METHOD.GET, `getJobs/${ stateEnum }`).then(res => {
        res.forEach(job => {
          job.mgggEqualPopulation = (job.mgggEqualPopulation * 100).toFixed(0) + "%";
          job.numDistrictings = job.numDistrictings.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
          job.mgggCoolingRounds = job.mgggCoolingRounds.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
          job.mgggRounds = job.mgggRounds.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        })
        setJobs(res);
      })
    }

    const applyWeights = (measuresObj) => {
      return new Promise( (resolve, reject) => {
        let done = 0;
        Call_API(HTTP_METHOD.POST, `applyWeights`, measuresObj).then(res=> {
          let tmp = {}
          for (const key of Object.keys(res).sort()){
            res[key]["type"] = "District"
            tmp[key] = res[key];
          }
          for (const key of Object.keys(res).sort()){
            // eslint-disable-next-line no-loop-func
            getDistrictingGeometry(appState.state.code,res[key]).then(geo => {
              tmp[key].geometry = geo
              console.log("Set geo for ", key, "as ",tmp[key])
              done += 1;
              if (done === Object.keys(res).length){
                setDistrictings(Object.values(tmp));
                resolve(true);
              }
            });
          }
        });
      });
    }

    function applyWeightsButton() {
      if (disableResultsTab) setDisableResultsTab(false);
      var measuresObj = {
        compactness: compactnessW / 100,
        populationEquality: populationEqualityW / 100,
        deviationEnacted: deviationEnactedW / 100,
        deviationAverage: deviationAverageW / 100,
        splitCounties: splitCountiesW / 100, 
        politicalFairness: politicalFairnessW / 100
      };
      setHideLoadingModal(false);
      setWeights(measuresObj);
      applyWeights(measuresObj).then(function(){
        setHideLoadingModal(true);
        setMainTabValue(2);
      });
    }

    function generateDistrictings() {
      let minoritySend = "HISPANIC";
      if (minority === "White") minoritySend = "WHITE";
      if (minority === "Black or African American") minoritySend = "BLACK";
      if (minority === "Asian") minoritySend = "ASIAN";
      if (minority === "American Indian or Alaska Native") minoritySend = "NATIVE_AMERICAN";
      if (minority === "Native Hawaiian or Other Pacific Islander") minoritySend = "NATIVE_HAWAIIAN";
      let populationSend = "TOTAL";
      if (populationType === "Voting Age Population") populationSend = "VOTING_AGE";
      let constraintsObj = {
        compactness: compactness
        ,compactnessType: "GRAPH_COMPACTNESS"
        ,populationEquality: populationEquality / 100
        ,populationType: populationSend
        ,majorityMinorityDistricts: majMinDistricts
        ,minorityPercentThreshold: majMinThreshold / 100
        ,minority: minoritySend
        ,incumbents: incumbentsList
      }
      setHideLoadingModal(false);
      Call_API(HTTP_METHOD.POST, `applyConstraints/${ currentJob }`, constraintsObj).then(function(res){
        if (res['constrainedDistrictings'] > 15000 || res['constrainedDistrictings'] < 50) {
          setHideLoadingModal(true);
          setHideConstraintsModal(false);
          setConstrainedNumber(res['constrainedDistrictings']);
        }
        else {
          setNumberDistrictings(res["constrainedDistrictings"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));
          setNumberTotal(res["total"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));
          setNumberMajMin(res["removedByMajMin"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));
          setNumberIncumbent(res["removedByIncumbent"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));
          setNumberCompactness(res["removedByCompactness"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));
          setNumberPop(res["removedByPopulationEquality"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));
          if (disableMeasuresTab) setDisableMeasuresTab(false);
          setHideLoadingModal(true);
          setMainTabValue(1);
        }
      });
    }

  //#endregion SERVER COMMUNICATION

  const [selectedPrecinct, setSelectedPrecinct] = React.useState(null);

  return (
    <div className = "App">
      <div id = "MapBox" >
        <Grid container justify = "center" style = {{ right: "0%", bottom: "3%", position: "absolute", width: "90%", marginLeft: "5%", marginTop: "5%", zIndex: "2" }} onClick = { (e) => e.stopPropagation()}>
          <Grid item xs = { 12 }>
              <Button variant = "contained" color = "primary" size = "large" disabled = { disableConstraints } onClick = { goToStateSelect } style = {{ marginLeft: "50%", transform: "translate(-50%, 0%)" }}>
                  Back to State Selection
              </Button>
          </Grid>
        </Grid>
        <div id = "Borders" style = {{ right: "0", top: "0", position: "absolute", backgroundColor: "rgb(211, 211, 211, 0.75)", zIndex: "2" }} onClick = { (e) => e.stopPropagation() }>
          <div id = "County">
            <FormControlLabel 
              style = {{ margin: "auto", width: "95%", padding: "10px" }} 
              control = {
                <Checkbox 
                  checked = { checkCountyBorder } 
                  disabled = { disableCountyBorder } 
                  color = "primary" 
                  onChange = { () => { setCheckCountyBorder(!checkCountyBorder); setMapLayerVisibility("County", checkCountyBorder ? "OFF" : "ON"); }}
                />
              } 
              label = { "County Borders" }
            />
          </div>
          <div id = "Precinct">
            <FormControlLabel 
              style = {{ margin: "auto", width: "95%", padding: "10px" }} 
              control = {
                <Checkbox 
                  checked = { checkPrecinctBorder } 
                  disabled = { disablePrecinctBorder } 
                  color = "primary" 
                  onChange = { () => { setCheckPrecinctBorder(!checkPrecinctBorder); setMapLayerVisibility("Precinct", checkPrecinctBorder ? "OFF" : "ON"); setHidePrecinctModal(true); }}
                />
              } 
              label = { "Precinct Borders" }
            />  
          </div>
          <div id = "Current Districting">
            <FormControlLabel 
              style = {{ margin: "auto", width: "95%", padding: "10px" }} 
              control = {
                <Checkbox 
                  checked = { checkCurrentDistricting } 
                  disabled = { disableCurrentDistricting || !hideDistrictingModal } 
                  color = "primary" 
                  onChange = { () => { setCheckCurrentDistricting(!checkCurrentDistricting); setMapLayerVisibility("Enacted", checkCurrentDistricting ? "ON" : "OFF"); setMapLayerVisibility("District", checkCurrentDistricting ? "OFF" : "ON");}}
                />
              } 
              label = { "Current Districting" }
            />  
          </div>
        </div>
        <ReactMapGL id = { shouldMapUpdate } {...viewport} mapboxApiAccessToken = { MAPBOX_TOKEN } mapStyle = { MAP_STYLE } width = "60vw" height = "100vh" style = {{ width: "100%" }} dragRotate = { false } onViewportChange = { updatedViewport => onViewportChange(updatedViewport) } onClick = { mapClick }>
          <MapLayer 
            layers = {mapLayers}
          />
        </ReactMapGL>
      </div>
      <div id = "precinctModal" hidden = { hidePrecinctModal } style = {{ left: precinctModalCoordinates.x, top: precinctModalCoordinates.y }}>
        <PrecinctInfo data={selectedPrecinct}></PrecinctInfo>
        <Button variant = "outlined" color = "primary" size = "large" onClick = { () => { setHidePrecinctModal(true)} } style = {{ marginTop: "10px", marginBottom: "10px" }}>
          Close
        </Button>         
      </div>
      <div id = "Toolbar">
        <Tabs value = {mainTabValue} onChange = { (event, value) => changeMainTabValue(value) } style = {{backgroundColor: 'LightGray'}} indicatorColor = "primary" textColor = "primary" centered variant = 'fullWidth'>
          <Tab 
            label = "Constraints" 
            wrapped 
            style = {{fontSize: 'large'}}/>
          <Tab 
            label = "Measures" 
            style = {{fontSize: 'large'}} 
            wrapped 
            disabled = {disableMeasuresTab}/>
          <Tab 
            label = "Results" 
            style = {{fontSize: 'large'}} 
            wrapped 
            disabled = {disableResultsTab}/>
        </Tabs>
        <ConstraintsTab
          mainTabValue = {mainTabValue}
          goToStateSelect = {goToStateSelect}
          compactness= {compactness}
          compactnessType = {compactnessType}
          populationEquality = {populationEquality}
          populationType = {populationType}
          majMinDistricts = {majMinDistricts}
          majMinThreshold = {majMinThreshold}
          minority = {minority}
          changeConstraintWeight = {changeConstraintWeight}
          generateDistrictings = {generateDistrictings}
          setHideIncumbentsModal = {setHideIncumbentsModal}
          setHideJobsModal = { setHideJobsModal }
          currentJob = { currentJob }
          disableConstraints = { disableConstraints }
          stateChange = { stateChange }
          stateDropDown = { stateDropDown }
          setStateDropDown = { setStateDropDown }
        />
        <MeasuresTab 
          compactnessW = { compactnessW } 
          populationEqualityW = { populationEqualityW } 
          deviationEnactedW = { deviationEnactedW }
          deviationAverageW = { deviationAverageW } 
          splitCountiesW = { splitCountiesW } 
          politicalFairnessW = { politicalFairnessW }
          tab = { mainTabValue } 
          changeConstraintWeight = { changeConstraintWeight } 
          applyWeights = { applyWeightsButton } 
          numberDistrictings = { numberDistrictings }
          numberTotal = { numberTotal }
          numberCompactness = { numberCompactness }
          numberIncumbent = { numberIncumbent }
          numberPop = { numberPop }
          numberMajMin = { numberMajMin }
        />
        <ResultsTab
          mainTabValue = {mainTabValue}
          index = {2}
          rows = {districtings}
          onRowEnter = {hoverMapLayerDistrictingResults}
          onRowClick = { openDistrictingModal }
        />
      </div>
      <IncumbentsModal
        hideIncumbentsModal = { hideIncumbentsModal }
        setHideIncumbentsModal = { setHideIncumbentsModal }
        incumbentsListChange = { incumbentsListChange }
        incumbentsList = { incumbentsList }
        appState = { appState }
        rgb = { RGB_HEX }
        setMapLayerActiveDistrict = { setMapLayerActiveDistrict }
        setMapLayerAllDistricts = { setMapLayerAllDistricts }
        incumbents = { [NC_INCUMBENTS, MI_INCUMBENTS, GA_INCUMBENTS] }
      />
      <JobsModal
        hideJobsModal = { hideJobsModal }
        setHideJobsModal = { setHideJobsModal }
        onRowClick = { setCurrentJob }
        currentJob = { currentJob }
        disableMeasuresTab = { disableMeasuresTab }
        disableResultsTab = { disableResultsTab }
        setDisableMeasuresTab = { setDisableMeasuresTab }
        setDisableResultsTab = { setDisableResultsTab }
        jobs = { jobs }
      />
      
      <DistrictingModal 
        hide = { hideDistrictingModal } 
        hideFn = { setHideDistrictingModal } 
        tabValue = { districtingTabValue } 
        tabValueFn = { setDistrictingTabValue } 
        setMapLayerActiveDistrict = { setMapLayerActiveDistrict }
        setMapLayerAllDistricts = { setMapLayerAllDistricts }
        districts = { boxAndWhiskerData }
        openDistrictModal = { openDistrictModal }
        hideDistrictModal = { hideDistrictModal }
        split_counties = { splitCounties }
        split_county_update = { splitCountyUpdateFunction }
        weights = { weights }
        equal_pop = { equalPop }
        rows = { districting_modal_rows }
        wasted_votes = { wastedVotes }
        dev_en = { devEn }
        maj_min = {majMin}
      />
      <DistrictModal
        hideDistrictModal = { hideDistrictModal }
        setHideDistrictModal = { setHideDistrictModal }
        districtNum = { districtNum }
        setMapLayerAllDistricts = { setMapLayerAllDistricts }
        districtTabValue = { districtTabValue }
        setDistrictTabValue = { setDistrictTabValue }
        data = { districtData }
      />
      <LoadingModal 
        hideLoadingModal = { hideLoadingModal }
      />
      <ConstraintsModal
        hideConstraintsModal = { hideConstraintsModal }
        setHideConstraintsModal = { setHideConstraintsModal }
        constrainedNumber = { constrainedNumber }
      />
    </div>
  );
}

export default App;