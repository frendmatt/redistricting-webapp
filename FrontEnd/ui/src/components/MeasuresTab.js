import { Component } from 'react';
import PropTypes  from 'prop-types';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import TabPanel from './TabPanel';

const style = {
    defaultValue: 50
    ,step: 1
    ,marks: [{ value: 0, label: "0%" }, { value: 100, label: "100%" }]
    ,min: 0 
    ,max: 100
    ,valueLabelDisplay: "auto"
};

class MeasuresTab extends Component {
    render() {
        return (
            <TabPanel value = { this.props.tab } index = { 1 }>
                <Grid container spacing = { 3 } justify = "flex-end" style = {{ width: "90%", marginLeft: "5%" }}>
                    <Grid item xs = { 12 }>
                        <h4 style = {{ marginTop: "5%", marginBottom: "0%"}}>
                            { this.props.numberTotal } Districtings in the job
                        </h4>
                    </Grid>
                    <Grid item xs = { 12 }  >
                        <h4 style = {{ marginTop: "-3%", marginBottom: "0%"}}>
                            - { this.props.numberCompactness } from compactness constraint
                        </h4>
                    </Grid>
                    <Grid item xs = { 12 }  >
                        <h4 style = {{ marginTop: "-3%", marginBottom: "0%"}}>
                            - { this.props.numberPop } from population equality constraint
                        </h4>
                    </Grid>
                    <Grid item xs = { 12 }  >
                        <h4 style = {{ marginTop: "-3%", marginBottom: "0%"}}>
                            - { this.props.numberIncumbent } from incumbent protection constraint
                        </h4>
                    </Grid>
                    <Grid item xs = { 12 }  >
                        <h4 style = {{ marginTop: "-3%", marginBottom: "0%"}}>
                            - { this.props.numberMajMin } from majority minority constraint
                        </h4>
                    </Grid>
                    <Grid item xs = { 12 } >
                        <h3 style = {{ marginTop: "-3%", marginBottom: "0%"}}>
                            =
                        </h3>
                    </Grid>
                    <Grid item xs = { 12 } >
                        <h2 style = {{ marginTop: "-4%", marginBottom: "5%"}}>
                            { this.props.numberDistrictings } Districtings Returned
                        </h2>
                    </Grid>
                    <Grid item xs = { 12 } style = {{ marginTop: "-5%"}}>
                        <Typography gutterBottom>
                            Compactness Weight
                        </Typography>
                        <Slider 
                            value = {this.props.compactnessW} 
                            onChange = { (e, newValue) => this.props.changeConstraintWeight("COMPACTNESSW", newValue) } 
                            { ...style }
                        />
                    </Grid>
                    <Grid item xs = { 12 } style = {{ marginTop: "-3%"}}>
                        <Typography gutterBottom>
                            Equal Population Weight
                        </Typography>
                        <Slider 
                            value = { this.props.populationEqualityW } 
                            onChange = { (e, newValue) => this.props.changeConstraintWeight("POPULATIONEQUALITYW", newValue) } 
                            { ...style }
                        />
                    </Grid>
                    <Grid item xs = { 12 } style = {{ marginTop: "-3%"}}>
                        <Typography gutterBottom>
                            Deviation from Average Weight
                        </Typography>
                        <Slider 
                            value = { this.props.deviationAverageW }
                            onChange = { (e, newValue) => this.props.changeConstraintWeight("DEVIATIONAVERAGEW", newValue) } 
                            { ...style }
                        />
                    </Grid>
                    <Grid item xs = { 12 } style = {{ marginTop: "-3%"}}>
                        <Typography gutterBottom>
                            Deviation from Enacted Weight
                        </Typography>
                        <Slider 
                            value = { this.props.deviationEnactedW } 
                            onChange = { (e, newValue) => this.props.changeConstraintWeight("DEVIATIONENACTEDW", newValue) }
                            { ...style }
                        />
                    </Grid>
                    <Grid item xs = { 12 } style = {{ marginTop: "-3%"}}>
                        <Typography gutterBottom>
                            Split Counties Weight
                        </Typography>
                        <Slider 
                            value = { this.props.splitCountiesW } 
                            onChange = { (e, newValue) => this.props.changeConstraintWeight("SPLITCOUNTIESW", newValue) }
                            { ...style }
                        />
                    </Grid>
                    <Grid item xs = { 12 } style = {{ marginTop: "-3%"}}>
                        <Typography gutterBottom>
                            Political Fairness Weight
                        </Typography>
                        <Slider 
                            value = { this.props.politicalFairnessW }
                            onChange = { (e, newValue) => this.props.changeConstraintWeight("POLITICALFAIRNESSW", newValue) }
                            { ...style }
                        />
                    </Grid>
                        <Grid item xs = { 12 }>
                        <Button variant = "contained" color = "primary" size = "large" onClick = { this.props.applyWeights } style = {{ marginLeft: "50%", transform: "translate(-50%, 0%)" }}>
                            Apply Weights
                        </Button>
                    </Grid>
                </Grid>
            </TabPanel>
        );
    }
}

MeasuresTab.propTypes = {
    compactnessW: PropTypes.number.isRequired
    ,populationEqualityW: PropTypes.number.isRequired
    ,deviationEnactedW: PropTypes.number.isRequired
    ,deviationAverageW: PropTypes.number.isRequired
    ,splitCountiesW: PropTypes.number.isRequired
    ,politicalFairnessW: PropTypes.number.isRequired
    ,tab: PropTypes.number.isRequired
    ,changeConstraintWeight: PropTypes.func.isRequired
    ,applyWeights: PropTypes.func.isRequired
    ,numberDistrictings: PropTypes.string.isRequired
    ,numberTotal: PropTypes.string.isRequired
    ,numberCompactness: PropTypes.string.isRequired
    ,numberIncumbent: PropTypes.string.isRequired
    ,numberPop: PropTypes.string.isRequired
    ,numberMajMin: PropTypes.string.isRequired
}

export default MeasuresTab