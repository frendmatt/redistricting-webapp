import { Component } from 'react';
import PropTypes  from 'prop-types';
import { DataGrid } from '@material-ui/data-grid';
import { AppBar, Button, Grid, Tab, Tabs } from '@material-ui/core';
import TabPanel from './TabPanel';
import '../App.css'
import CanvasJSReact from './lib/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const columns = [
    { field: 'id', headerName: 'District', flex: 0.25, type: 'number'}
    //,{ field: 'objectiveScore', headerName: 'Total', description: 'Total Objective Score', flex: 0.75, type: 'number' }
    ,{ field: 'equalPopulationScore', headerName: 'Equal Population Score', description: 'Equal Population Score', flex: 0.5, type: 'number' }
    ,{ field: 'deviationEnactedScore', headerName: 'Deviation Enacted Score', description: 'Deviation from Enacted Score', flex: 0.5, type: 'number' }
    ,{ field: 'compactnessScore', headerName: 'Compactness Score', description: 'Compactness Score', flex: 0.5, type: 'number' }
    //,{ field: 'splitCountiesScore', headerName: 'SC', description: 'Split County Score', flex: 0.5, type: 'number' }
    //,{ field: 'majorityMinority', headerName: 'MM', description: 'Majority Minority Districts', flex: 0.5, type: 'number' }
];

const wasted_votes_columns = [
    { field: 'id', headerName: 'District', description: '', flex: 0.3, type: 'number'}
    //,{ field: 'objectiveScore', headerName: 'Total', description: 'Total Objective Score', flex: 0.75, type: 'number' }
    ,{ field: 'dem', headerName: 'Current Democratic Wasted', description: '', flex: 0.5, type: 'number' }
    ,{ field: 'enDem', headerName: 'Enacted Democratic Wasted', description: '', flex: 0.5, type: 'number' }
    ,{ field: 'rep', headerName: 'Current Republican Wasted', description: '', flex: 0.5, type: 'number' }
    ,{ field: 'enRep', headerName: 'Enacted Republican Wasted', description: '', flex: 0.5, type: 'number' }
    //,{ field: 'splitCountiesScore', headerName: 'SC', description: 'Split County Score', flex: 0.5, type: 'number' }
    //,{ field: 'majorityMinority', headerName: 'MM', description: 'Majority Minority Districts', flex: 0.5, type: 'number' }
];

const dev_en_columns = [
    { field: 'id', headerName: 'District', flex: 0.3, type: 'number'}
    //,{ field: 'objectiveScore', headerName: 'Total', description: 'Total Objective Score', flex: 0.75, type: 'number' }
    ,{ field: 'geoDif', headerName: 'Geometry Difference (km)', description: '', flex: 0.5, type: 'number' }
    ,{ field: 'geoPer', headerName: 'Geometry Percent Difference', description: '', flex: 0.5, type: 'number' }
    ,{ field: 'popDif', headerName: 'Population Difference', description: '', flex: 0.5, type: 'number' }
    ,{ field: 'popPer', headerName: 'Population Percent Difference', description: '', flex: 0.5, type: 'number' }
];

const weights_columns = [
    { field: 'id', headerName: 'Weights', flex: 0.75, type: 'number', hide: true}
    ,{ field: 'equalPopulation', headerName: 'EP Weight', description: 'Equal Population Weight', flex: 0.5, type: 'number' }
    ,{ field: 'deviationAverage', headerName: 'DA Weight', description: 'Deviation from Average Weight', flex: 0.5, type: 'number' }
    ,{ field: 'deviationEnacted', headerName: 'DE Weight', description: 'Deviation from Enacted Weight', flex: 0.5, type: 'number' }
    ,{ field: 'compactness', headerName: 'C Weight', description: 'Compactness Weight', flex: 0.5, type: 'number' }
    ,{ field: 'splitCounties', headerName: 'SC Weight', description: 'Split County Weight', flex: 0.5, type: 'number' }
];

const maj_min_columns = [
    { field: 'id', headerName: 'District', flex: 0.75, type: 'number', hide: true}
    ,{ field: 'total', headerName: 'Total Pop.', description: 'Total Population', flex: 0.5, type: 'number' }
    ,{ field: 'minority', headerName: 'Minority Pop.', description: 'Minority Population', flex: 0.5, type: 'number' }
    ,{ field: 'percent', headerName: 'Minority Percent', description: 'Minority Population Percent', flex: 0.5, type: 'number' }
    ,{ field: 'isMajMin', headerName: 'Is Majority Minority?', description: 'If the district is a majority minority district', flex: 0.5, type: 'boolean' }
];

const split_county_columns = [
    { field: 'id', headerName: 'Split County Name', flex: 0.75, type: 'spring'}
];

const equal_pop_columns = [
    { field: 'id', headerName: 'District', flex: 0.3, type: 'number'}
    ,{ field: 'measure', headerName: 'Measure', flex: 0.5, type: 'number' }
    ,{ field: 'difference', headerName: 'Difference', flex: 0.5, type: 'number' }
    ,{ field: 'percent', headerName: 'Percent', flex: 0.5, type: 'string', align: 'right', headerAlign: 'right' }
    ,{ field: 'population', headerName: 'Population', flex: 0.5, type: 'number' }
];

{/* 
const maj_min_columns = [
    { field: 'id', headerName: 'District', flex: 0.4, type: 'number'}
    ,{ field: 'total_pop', headerName: 'Measure', flex: 0.5, type: 'number' }
    ,{ field: 'minority_pop', headerName: 'Difference', flex: 0.5, type: 'number' }
    ,{ field: 'minority_percent', headerName: 'Percent', flex: 0.5, type: 'string', align: 'right', headerAlign: 'right'}
];
*/}

function a11yProps(index) {
    return {
      id: `scrollable-force-tab-${index}`,
      'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
  }

class DistrictingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {dataPoints: [], enactedData: [], currentData: []};
    };

    componentWillReceiveProps(nextProps) {
        const data = [], enacted = [], current = []

        const districts = this.props.districts

        districts.forEach((item, i) => {
            data.push({ label: i+1, y: [parseFloat(item.min.toFixed(2)), parseFloat(item[25].toFixed(2)), parseFloat(item[75].toFixed(2)), parseFloat(item.max.toFixed(2)), parseFloat(item.median.toFixed(2))] });
            enacted.push({x: i, y: parseFloat(item.enacted.toFixed(2))});
            current.push({x: i, y: parseFloat(item.current.toFixed(2))});
        })

        this.setState({dataPoints: data, enactedData: enacted, currentData: current})
    }
    
    render() {
        var new_rows  = []
        for(var i=0; i<this.props.rows.length; i++){
            var row = this.props.rows[i];
            var values = [row.equalPopulationScore,row.deviationEnactedScore,row.compactnessScore]
            for(var j=0; j<values.length;j++){
                if (values[j]<0.0001){
                    values[j] = Number(values[j]).toExponential(3);
                }
                else {
                    values[j] = Number(values[j]).toFixed(5);
                }
            }
            new_rows.push({
               id: i + 1,
               equalPopulationScore: values[0],
               deviationEnactedScore: values[1], 
               compactnessScore: values[2]
            });
        }
        var split_county_rows  = []
        for(var i=0; i<this.props.split_counties.length; i++){
            var county = this.props.split_counties[i];
            var dataObj = {id:county}
            split_county_rows.push(dataObj);
        }
        var weights_rows  = [
            {id:0,equalPopulation:this.props.weights.populationEquality,deviationAverage:this.props.weights.deviationAverage,
                deviationEnacted:this.props.weights.deviationEnacted,compactness:this.props.weights.compactness,
                splitCounties: this.props.weights.splitCounties
            }
        ]
        var equal_pop_rows = []
        for(var i=0; i<this.props.equal_pop.breakdown.length; i++) {
            equal_pop_rows.push({
                id: i+1, 
                measure:this.props.equal_pop.breakdown[i].measure, 
                difference:this.props.equal_pop.breakdown[i].difference, 
                percent:Number(this.props.equal_pop.breakdown[i].percent * 100).toFixed(2)+"%", 
                population:this.props.equal_pop.breakdown[i].population})
        }
        for(var i=0; i<equal_pop_rows.length; i++) {
            if(equal_pop_rows[i].measure < 0.0001) {
                equal_pop_rows[i].measure = Number(equal_pop_rows[i].measure).toExponential(3)
            } else {
                equal_pop_rows[i].measure = Number(equal_pop_rows[i].measure).toFixed(4)
            }
        }

        var wasted_votes_rows = []
        for(var i=0; i<this.props.wasted_votes.length; i++){
            var val = this.props.wasted_votes[i];
            wasted_votes_rows.push({
                id:i+1,
                dem:val.district_dem,
                enDem:val.enacted_dem,
                rep:val.district_rep,
                enRep: val.enacted_rep
            })
        }

        var dev_en_rows = []
        for(var i=0; i<this.props.dev_en.length; i++){
            var val = this.props.dev_en[i];
            dev_en_rows.push({
                id:i+1,
                geoDif:val.geoDif/1e+6,
                geoPer:val.geoPer,
                popDif:val.popDif,
                popPer: val.popPer
            })
        }

        var maj_min_rows = []
        for(var i=0; i<this.props.maj_min.length; i++){
            var val = this.props.maj_min[i];
            maj_min_rows.push({
                id:i+1,
                total:val.total,
                minority:val.minority,
                percent:val.percent,
                isMajMin: val.isMajMin
            })
        }

        {/* 
        var maj_min_rows = []
        for(var i=0; i<this.props.maj_min.length; i++){
            maj_min_rows.push({
                id: i+1,
                total_pop: this.props.maj_min[i].total,
                minority_pop: this.props.maj_min[i].minority,
                minority_percent: Number(this.props.maj_min[i].percent * 100).toFixed(2) + "%"
            })
        } */}

        const options = {
            axisY: {
                title: "Minority Population %"
            },
            axisX: {
              title: "Indexed Districts"
          },
            theme: "light1",
            height: 600,
            dataPointMinWidth: 16,
            legend: {
              verticleAlign: "bottom",
              horizontalAlign: "right",
              dockInsidePlotArea: true
            },
            data: [{
              type: "boxAndWhisker",
              color: "black",
              dataPoints: this.state.dataPoints
            },
            {
              type: "line",
              color: "red",
              markerSize: 12,
              showInLegend: true,
              legendText: "Enacted",
              lineColor: "rgba(255, 0, 0, 0)",
              dataPoints: this.state.enactedData
            },
            {
              type: "line",
              color: "blue",
              markerSize: 12,
              showInLegend: true,
              legendText: "Current",
              lineColor: "rgba(255, 0, 0, 0)",
              dataPoints: this.state.currentData
            }]
        }
        
        return (
            <div id = "districtingModal" hidden = { this.props.hide }>
                 <Tabs value = { this.props.tabValue } variant="scrollable" scrollButtons="auto" onChange = { (e, newVal) => this.props.tabValueFn(newVal) } indicatorColor = "primary" textColor = "primary">
                    <Tab 
                        label = "Objective Scores"
                        {...a11yProps(0)}
                    />
                    <Tab  
                        label = "Box and Whisker"
                        {...a11yProps(1)}
                    />
                    <Tab  
                        label = "Split Counties"
                        {...a11yProps(2)}
                    />
                    <Tab  
                        label = "Equal Population"
                        {...a11yProps(3)}
                    />
                    <Tab  
                        label = "Efficiency Gap"
                        {...a11yProps(4)}
                    />
                    <Tab  
                        label = "Deviation Enacted"
                        {...a11yProps(5)}
                    />
                    <Tab
                        label = "Majority-Minority"
                        {...a11yProps(6)}
                    />
                </Tabs>
                <TabPanel value = { this.props.tabValue } style = {{ height: "75%", width: "100%", position: "relative" }} index = { 0 }>
                    <h3>Weights:</h3>
                    <DataGrid 
                        autoHeight = { true } 
                        showColumnRightBorder = { false } 
                        disableColumnMenu = { true } 
                        disableExtendRowFullWidth = { false } 
                        rowHeight = { 30 } 
                        hideFooter = { true }  
                        rows = { weights_rows }  
                        columns = { weights_columns }
                    /> 
                    <h3> District by District breakdown: </h3>
                    <DataGrid 
                        autoHeight = { true } 
                        showColumnRightBorder = { false } 
                        disableColumnMenu = { true } 
                        disableExtendRowFullWidth = { false } 
                        rowHeight = { 34 } 
                        hideFooter = { true }  
                        rows = { new_rows }  
                        columns = { columns }
                        onRowEnter = { (param, event) => { if (this.props.hideDistrictModal) this.props.setMapLayerActiveDistrict(param['id'] - 1) }}
                        onRowLeave = { (param, event) => { if (this.props.hideDistrictModal) this.props.setMapLayerAllDistricts(); }}
                        onRowClick = { (param, event) => {this.props.openDistrictModal(param['id'] - 1); }}
                    /> 
                </TabPanel>
                <TabPanel value = { this.props.tabValue } style = {{ height: "75%", width: "100%", position: "relative" }} index = { 1 }>
                    <CanvasJSChart options={options} />
                </TabPanel>
                <TabPanel value = { this.props.tabValue } style = {{ height: "75%", width: "100%", position: "relative" }} index = { 2 }>
                    <DataGrid 
                        autoHeight = { true } 
                        pagination = { true }
                        pageSize = { 16 }
                        showColumnRightBorder = { false } 
                        disableColumnMenu = { true } 
                        disableExtendRowFullWidth = { true } 
                        rowHeight = { 38 } 
                        hideFooter = { false }  
                        rows = { split_county_rows }  
                        columns = { split_county_columns }
                        pagesize = { 10 }
                    /> 
                </TabPanel>
                <TabPanel value = { this.props.tabValue } style = {{ height: "75%", width: "100%", position: "relative" }} index = { 3 }>
                    {/* 
                    <h4>Equal Pop Breakdown for objective function (same as in objective tab)</h4>
                    <h4>Highlight districts that differ more than ideal</h4>
                    <h4>District by district breakdown</h4>
                    */}
                    <h4>District by District Breakdown:</h4>
                    <DataGrid 
                        autoHeight = { true } 
                        pagination = { false }
                        showColumnRightBorder = { false } 
                        disableColumnMenu = { true } 
                        disableExtendRowFullWidth = { false } 
                        rowHeight = { 38 } 
                        hideFooter = { true }  
                        rows = { equal_pop_rows }  
                        columns = { equal_pop_columns }
                        onRowEnter = { (param, event) => { if (this.props.hideDistrictModal) this.props.setMapLayerActiveDistrict(param['id'] - 1) }}
                        onRowLeave = { (param, event) => { if (this.props.hideDistrictModal) this.props.setMapLayerAllDistricts(); }}
                        onRowClick = { (param, event) => {this.props.openDistrictModal(param['id'] - 1); }}
                    />
                </TabPanel>
                <TabPanel value = { this.props.tabValue } style = {{ height: "75%", width: "100%", position: "relative" }} index = { 4 }>
                <h4>District by District Breakdown:</h4>
                <DataGrid 
                        autoHeight = { true } 
                        showColumnRightBorder = { false } 
                        disableColumnMenu = { true } 
                        disableExtendRowFullWidth = { false } 
                        rowHeight = { 38 } 
                        hideFooter = { true }  
                        rows = { wasted_votes_rows }  
                        columns = { wasted_votes_columns }
                        onRowEnter = { (param, event) => { if (this.props.hideDistrictModal) this.props.setMapLayerActiveDistrict(param['id'] - 1) }}
                        onRowLeave = { (param, event) => { if (this.props.hideDistrictModal) this.props.setMapLayerAllDistricts(); }}
                        onRowClick = { (param, event) => {this.props.openDistrictModal(param['id'] - 1); }}
                    /> 
                </TabPanel>
                <TabPanel value = { this.props.tabValue } style = {{ height: "75%", width: "100%", position: "relative" }} index = { 5 }>
                <h4>District by District Breakdown:</h4>
                    <DataGrid 
                        autoHeight = { true } 
                        showColumnRightBorder = { false } 
                        disableColumnMenu = { true } 
                        disableExtendRowFullWidth = { false } 
                        rowHeight = { 38 } 
                        hideFooter = { true }  
                        rows = { dev_en_rows }  
                        columns = { dev_en_columns }
                        onRowEnter = { (param, event) => { if (this.props.hideDistrictModal) this.props.setMapLayerActiveDistrict(param['id'] - 1) }}
                        onRowLeave = { (param, event) => { if (this.props.hideDistrictModal) this.props.setMapLayerAllDistricts(); }}
                        onRowClick = { (param, event) => {this.props.openDistrictModal(param['id'] - 1); }}
                    /> 
                </TabPanel>
                <TabPanel value = { this.props.tabValue } style = {{ height: "75%", width: "100%", position: "relative" }} index = { 6 }>
                    <h4>District by District Breakdown:</h4>
                    
                    <DataGrid 
                        autoHeight = { true } 
                        showColumnRightBorder = { false } 
                        disableColumnMenu = { true } 
                        disableExtendRowFullWidth = { false } 
                        rowHeight = { 38 } 
                        hideFooter = { true }  
                        rows = { maj_min_rows }  
                        columns = { maj_min_columns }
                        onRowEnter = { (param, event) => { if (this.props.hideDistrictModal) this.props.setMapLayerActiveDistrict(param['id'] - 1) }}
                        onRowLeave = { (param, event) => { if (this.props.hideDistrictModal) this.props.setMapLayerAllDistricts(); }}
                        onRowClick = { (param, event) => {this.props.openDistrictModal(param['id']); }}
                    />
                   
                </TabPanel>
                <Grid container justify = "center" style = {{ width: "90%", marginLeft: "5%" }}>
                    <Grid item xs = { 12 }>
                        <Button variant = "outlined" color = "primary" size = "large" onClick = { () => this.props.hideFn(true) } style = {{ marginTop: "80px", marginLeft: "50%", transform: "translate(-50%, 0%)" }}>
                            Close
                        </Button>
                    </Grid>
                </Grid>
            </div>  
        );
    }
}

DistrictingModal.propTypes = {
    hide: PropTypes.bool.isRequired
    ,hideFn: PropTypes.func.isRequired
    ,tabValue: PropTypes.number.isRequired
    ,tabValueFn: PropTypes.func.isRequired
    ,setMapLayerActiveDistrict: PropTypes.func.isRequired
    ,setMapLayerAllDistricts: PropTypes.func.isRequired
    ,openDistrictModal: PropTypes.func.isRequired
    ,hideDistrictModal: PropTypes.bool.isRequired
    ,split_counties: PropTypes.array.isRequired
    ,split_county_update: PropTypes.func.isRequired
}

export default DistrictingModal