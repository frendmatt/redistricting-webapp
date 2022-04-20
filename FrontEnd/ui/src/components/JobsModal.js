import { Button } from '@material-ui/core';
import { Component } from 'react';
import PropTypes  from 'prop-types';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
    { field: 'id', headerName: 'Job ID', flex: 0.2, type: 'number'}
    ,{ field: 'numDistrictings', headerName: 'Number of Districtings', flex: 0.4, type: 'string' }
    ,{ field: 'mgggEqualPopulation', headerName: 'EP', description: 'MGGG Equal Population Percentage', flex: 0.15, type: 'string' }
    ,{ field: 'mgggCoolingRounds', headerName: 'CR', description: 'Number of cooling rounds ran', flex: 0.15, type: 'string'}
    ,{ field: 'mgggRounds', headerName: 'R', description: 'Number of rounds ran after cooling', flex: 0.15, type: 'string'}
  ];
  

class JobsModal extends Component {
    render() {
        return (
            <div id = "jobsModal" hidden = { this.props.hideJobsModal }>
                <h2 style = {{ marginTop: "40px" }}>
                    Jobs
                </h2>
                <DataGrid 
                    autoHeight = { true } 
                    autoWidth = { true }
                    showColumnRightBorder = { false } 
                    disableColumnMenu = { true } 
                    disableExtendRowFullWidth = { false } 
                    rowHeight = { 34 } 
                    hideFooter = { true } 
                    rows = { this.props.jobs }  
                    columns = { columns }
                    style = {{ width: "30%" }}
                    onRowClick = { (param, event) => { 
                        this.props.onRowClick(param['id']); 
                        this.props.setHideJobsModal(true);
                        if (Number(param['id']) !== this.props.currentJob) {
                        if (!this.props.disableMeasureTab) this.props.setDisableMeasuresTab(true);
                        if (!this.props.disableResultsTab) this.props.setDisableResultsTab(true); 
                        }
                    }}
                />
                <Button variant = "outlined" color = "primary" size = "large" onClick = { () => this.props.setHideJobsModal(true) } style = {{ marginTop: "10px", marginBottom: "10px", marginLeft: "50%", transform: "translate(-50%, 0%)" }}>
                    Close
                </Button>
            </div>
        );
    }
}

JobsModal.propTypes = {
    hideJobsModal: PropTypes.bool.isRequired
    ,setHideJobsModal: PropTypes.func.isRequired
    ,onRowClick: PropTypes.func.isRequired
    ,currentJob: PropTypes.number.isRequired
    ,disableMeasureTab: PropTypes.bool.isRequired
    ,disableResultsTab: PropTypes.bool.isRequired
    ,setDisableMeasuresTab: PropTypes.func.isRequired
    ,setDisableResultsTab: PropTypes.func.isRequired
    ,jobs: PropTypes.object.isRequired
}

export default JobsModal

