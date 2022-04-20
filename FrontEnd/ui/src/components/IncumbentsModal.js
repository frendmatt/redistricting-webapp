import { Button } from '@material-ui/core';
import { Component } from 'react';
import PropTypes  from 'prop-types';
import IncumbentList from './IncumbentList';


class IncumbentsModal extends Component {
    render() {
        return (
            <div id = "incumbentsModal" hidden = { this.props.hideIncumbentsModal }>
                <h2 style = {{ marginTop: "40px" }}>
                    Incumbents
                </h2>
                <IncumbentList 
                    incumbents = { this.props.incumbents[0] } 
                    name = "nc" 
                    rgb = { this.props.rgb } 
                    fn = { this.props.incumbentsListChange } 
                    selected = { this.props.incumbentsList } 
                    stateCode = { this.props.appState.state.code } 
                    onMouseEnter = { this.props.setMapLayerActiveDistrict } 
                    onMouseLeave = { this.props.setMapLayerAllDistricts }
                />
                <IncumbentList 
                    incumbents = { this.props.incumbents[1] } 
                    name = "mi" 
                    rgb = { this.props.rgb } 
                    fn = { this.props.incumbentsListChange } 
                    selected = { this.props.incumbentsList } 
                    stateCode = { this.props.appState.state.code } 
                    onMouseEnter = { this.props.setMapLayerActiveDistrict }
                    onMouseLeave = { this.props.setMapLayerAllDistricts }
                />
                <IncumbentList 
                    incumbents = { this.props.incumbents[2] } 
                    name = "ga" 
                    rgb = { this.props.rgb } 
                    fn = { this.props.incumbentsListChange } 
                    selected = { this.props.incumbentsList } 
                    stateCode = { this.props.appState.state.code } 
                    onMouseEnter = { this.props.setMapLayerActiveDistrict } 
                    onMouseLeave = { this.props.setMapLayerAllDistricts }
                />
                <Button variant = "outlined" color = "primary" size = "large" onClick = { () => this.props.setHideIncumbentsModal(true) } style = {{ marginTop: "10px", marginBottom: "10px", marginLeft: "50%", transform: "translate(-50%, 0%)" }}>
                    Close
                </Button>
            </div>
        );
    }
}

IncumbentsModal.propTypes = {
    hideIncumbentsModal: PropTypes.bool.isRequired
    ,setHideIncumbentsModal: PropTypes.func.isRequired
    ,incumbentsListChange: PropTypes.func.isRequired
    ,incumbentsList: PropTypes.array.isRequired
    ,appState: PropTypes.object.isRequired
    ,rgb: PropTypes.array.isRequired
    ,setMapLayerActiveDistrict: PropTypes.func.isRequired
    ,setMapLayerAllDistricts: PropTypes.func.isRequired
    ,incumbents: PropTypes.array.isRequired
}

export default IncumbentsModal