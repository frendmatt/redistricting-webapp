import { Component } from 'react';
import PropTypes  from 'prop-types';
import TabPanel from './TabPanel'; 
import '../App.css'
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Slider, Typography } from '@material-ui/core';
import DropDown from './DropDown';


class ConstraintsTab extends Component {
    render() {
        return (   
            <TabPanel value = { this.props.mainTabValue } index = { 0 }>
                <Grid container spacing = { 5 } style = {{ width: "100%", marginLeft: "25%", marginTop: "0%" }} >
                    <Grid item xs = { 6 }>
                        <FormControl variant = "filled" style = {{ width: "100%" }}>
                            <InputLabel id = "dropdown-label">
                                { "Select A State" }
                            </InputLabel>
                            <Select  value = { this.props.stateDropDown } onChange = { (e) => { this.props.goToStateSelect(); this.props.setStateDropDown(e.target.value); this.props.stateChange(e.target.value === "North Carolina" ? 0 : e.target.value === "Michigan" ? 1 : 2)} } labelId = "dropdown-label"> 
                                <MenuItem value = { "North Carolina" }>
                                    { "North Carolina" }
                                </MenuItem>
                                <MenuItem value = { "Georgia" }>
                                    { "Georgia" }
                                </MenuItem>
                                <MenuItem value = { "Michigan" }>
                                    { "Michigan" }
                                </MenuItem>
                         </Select>
                    </FormControl> 
                    </Grid>
                 </Grid>
                <h2 style = {{ marginTop: "5%" }}>
                    Constraints:
                </h2>
                <Grid container spacing = { 5 } style = {{ width: "90%", marginLeft: "5%", marginTop: "0%" }} >
                    <Grid item xs = { 6 }>
                        <Typography gutterBottom>
                            Compactness
                        </Typography>
                        <Slider 
                            value = { this.props.compactness } 
                            defaultValue = { 0.025 } 
                            onChange = { (e, newValue) => this.props.changeConstraintWeight("COMPACTNESS", newValue) } 
                            step = { 0.001 } 
                            marks = { [{value: 0, label: "0"}, {value: .05, label: "0.05"}] } 
                            min = { 0 } 
                            max = { .05 } 
                            valueLabelDisplay = "auto" 
                            disabled = { this.props.disableConstraints }
                        />
                    </Grid>
                    <Grid item xs = { 6 }>
                        <DropDown 
                            value = { this.props.compactnessType } 
                            valueName = { "COMPACTNESSTYPE" } 
                            title = { "Compactness Type" } 
                            changeFn = { this.props.changeConstraintWeight }
                            values = { ["Graph Compactness", "Population Fatness", "Polsby-Popper"] }
                            disabled = { this.props.disableConstraints }
                        /> 
                    </Grid>
                </Grid>
                <Grid container spacing = { 5} style = { { width: "90%", marginLeft: "5%", marginTop: "0%" }} >
                    <Grid item xs = { 6 }>
                        <Typography gutterBottom>
                            Population Equality
                        </Typography>
                        <Slider 
                            value = { this.props.populationEquality } 
                            defaultValue = { 10 } 
                            onChange = { (e, newValue) => this.props.changeConstraintWeight("POPULATIONEQUALITY", newValue) } 
                            step = { 0.5 } 
                            marks = { [{value: 0, label: "0%"}, {value: 20, label: "20%"}] } 
                            min = { 0 } 
                            max = { 20 } 
                            valueLabelDisplay = "auto" 
                            disabled = { this.props.disableConstraints }
                        />
                    </Grid>
                    <Grid item xs = { 6 }>
                        <DropDown 
                            value = { this.props.populationType } 
                            valueName = { "POPULATIONTYPE" } 
                            title = { "Population Type" } 
                            changeFn = { this.props.changeConstraintWeight }
                            values = { ["Total Population", "Voting Age Population", "Citizen Voting Age Population"] }
                            disabled = { this.props.disableConstraints }
                        />
                    </Grid>
                </Grid>
                <Grid container spacing = { 5 } justify = "flex-end" style = {{ width: "90%", marginLeft: "5%", marginTop: "0%" }} >
                    <Grid item xs = { 3 }>
                        <Typography gutterBottom>
                            Majority-Minority Districts
                        </Typography>
                        <Slider 
                            value = { this.props.majMinDistricts }
                            defaultValue = { 0 } 
                            onChange = { (e, newValue) => this.props.changeConstraintWeight("MAJMINDISTRICTS", newValue) } 
                            step = { 1 } 
                            marks = { [{value: 0, label: "0"}, {value: this.props.stateDropDown === "Georgia" ? 5 : this.props.stateDropDown === "North Carolina" ?  3 : 2, label: this.props.stateDropDown === "Georgia" ? "5" : this.props.stateDropDown === "North Carolina" ?  "3" : "2"}] } 
                            min = { 0 } 
                            max = { this.props.stateDropDown === "Georgia" ? 5 : this.props.stateDropDown === "North Carolina" ?  3 : 2 } 
                            valueLabelDisplay = "auto" 
                            disabled = { this.props.disableConstraints }
                        />
                    </Grid>
                    <Grid item xs = { 3 }>
                        <Typography gutterBottom>
                            Minority Percent Threshold
                        </Typography>
                        <Slider 
                            value = { this.props.majMinThreshold } 
                            defaultValue = { 35 } 
                            onChange = { (e, newValue) => this.props.changeConstraintWeight("MAJMINTHRESHOLD", newValue) } 
                            step = { 1 } 
                            marks = { [{value: 20, label: "20"}, {value: 50, label: "50"}] } 
                            min = { 20 } 
                            max = { 50 } 
                            valueLabelDisplay = "auto" 
                            disabled = { this.props.disableConstraints }
                        />
                    </Grid>
                    <Grid item xs = { 6 }>
                        <DropDown 
                            value = { this.props.minority } 
                            valueName = { "MINORITY" } 
                            title = { "Minority Race" } 
                            changeFn = { this.props.changeConstraintWeight }
                            values = { ["American Indian or Alaska Native", "Asian", "Black or African American", "Hispanic", "Native Hawaiian or Other Pacific Islander", "White"] }
                            disabled = { this.props.disableConstraints }
                        />
                    </Grid>
                </Grid>
                <Grid container justify = "center" style = {{ width: "90%", marginLeft: "5%", marginTop: "5%" }} >
                    <Grid item xs = { 12 }>
                        <Button variant = "outlined" color = "primary" size = "large" disabled = { this.props.disableConstraints } onClick = { () => this.props.setHideIncumbentsModal(false) } style = {{ marginLeft: "50%", transform: "translate(-50%, 0%)" }}>
                            Incumbent Protection
                        </Button>
                    </Grid>
                </Grid>
                <Grid container justify = "center" style = {{ width: "90%", marginLeft: "5%", marginTop: "5%" }} >
                    <Grid item xs = { 12 }>
                        <h3 style = {{ marginTop: "0%" }}>
                            Current Job: { this.props.currentJob === -1 ? "None" : this.props.currentJob }
                        </h3>
                        <Button variant = "outlined" color = "primary" size = "large" disabled = { this.props.disableConstraints } onClick = { () => this.props.setHideJobsModal(false) } style = {{ marginLeft: "50%", transform: "translate(-50%, 0%)" }}>
                            Select Job
                        </Button>
                    </Grid>
                </Grid>
                <Grid container justify = "center" style = {{ width: "90%", marginLeft: "5%", marginTop: "5%" }} >
                    <Grid item xs = { 12 }>
                        <Button variant = "contained" color = "primary" size = "large" disabled = { this.props.disableConstraints || (this.props.minority === '' || this.props.compactnessType === '' || this.props.populationType === '') || this.props.currentJob === -1 } onClick = { this.props.generateDistrictings } style = {{ marginLeft: "50%", transform: "translate(-50%, 0%)" }}>
                            Generate Districtings
                        </Button>
                    </Grid>
                </Grid>
            </TabPanel>
        );
    }
}

ConstraintsTab.propTypes = {
    mainTabValue: PropTypes.number.isRequired
    ,goToStateSelect: PropTypes.func.isRequired
    ,compactness: PropTypes.number.isRequired
    ,compactnessType: PropTypes.string.isRequired
    ,populationEquality: PropTypes.number.isRequired
    ,populationType: PropTypes.string.isRequired
    ,majMinDistricts: PropTypes.number.isRequired
    ,majMinThreshold: PropTypes.number.isRequired
    ,minority: PropTypes.string.isRequired
    ,changeConstraintWeight: PropTypes.func.isRequired
    ,generateDistrictings: PropTypes.func.isRequired
    ,setHideIncumbentsModal: PropTypes.func.isRequired
    ,setHideJobsModal: PropTypes.func.isRequired
    ,currentJob: PropTypes.number.isRequired
    ,disableConstraints: PropTypes.bool.isRequired
    ,goToStateSelect: PropTypes.func.isRequired
    ,stateChange: PropTypes.func.isRequired
    ,stateDropDown: PropTypes.string.isRequired
    ,setStateDropDown: PropTypes.func.isRequired
}

export default ConstraintsTab