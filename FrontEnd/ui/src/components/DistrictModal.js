import { Button, Tab, Tabs } from '@material-ui/core';
import { Component } from 'react';
import PropTypes  from 'prop-types';
import TabPanel from './TabPanel';
import DistrictSummary from './DistrictSummary';

class DistrictModal extends Component {
    render() {
        if (this.props.data==null){
            return null;
        }
        return (
            <div id = "districtModal" hidden = { this.props.hideDistrictModal }>
                <h2 style = {{ marginTop: "40px" }}>
                    District { this.props.districtNum+1}
                </h2>
                <DistrictSummary data = {this.props.data}> </DistrictSummary>
                <Button variant = "outlined" color = "primary" size = "large" onClick = { () => { this.props.setHideDistrictModal(true); this.props.setMapLayerAllDistricts(); } } style = {{ marginTop: "10px", marginBottom: "10px", marginLeft: "50%", transform: "translate(-50%, 0%)" }}>
                    Close
                </Button>
            </div>
        );
    }
}

DistrictModal.propTypes = {
    hideDistrictModal: PropTypes.bool.isRequired
    ,setHideDistrictModal: PropTypes.func.isRequired
    ,districtNum: PropTypes.number.isRequired
    ,setMapLayerAllDistricts: PropTypes.func.isRequired
    ,districtTabValue: PropTypes.number.isRequired
    ,setDistrictTabValue: PropTypes.func.isRequired
}

export default DistrictModal