import { Component } from 'react';
import PropTypes  from 'prop-types';
import TabPanel from './TabPanel'; 
import '../App.css'
import DistrictingsTable from './DistrictingsTable'


class ResultsTab extends Component {
    render() {
        return (
            <TabPanel value = { this.props.mainTabValue } index = { 2 }> 
                <DistrictingsTable 
                    rows = { this.props.rows }
                    onRowEnter = { this.props.onRowEnter }
                    onRowClick = { this.props.onRowClick }
                />
            </TabPanel>
        );
    }
}

ResultsTab.propTypes = {
    mainTabValue: PropTypes.number.isRequired
    ,hide: PropTypes.bool.isRequired
    ,hideFn: PropTypes.func.isRequired
    ,modalTabValue: PropTypes.number.isRequired
    ,modalTabValueFn: PropTypes.func.isRequired
    ,districtFn: PropTypes.func.isRequired
    ,onRowEnter: PropTypes.func.isRequired
    ,onRowClick: PropTypes.func.isRequired
    ,rows: PropTypes.array.isRequired
}

export default ResultsTab