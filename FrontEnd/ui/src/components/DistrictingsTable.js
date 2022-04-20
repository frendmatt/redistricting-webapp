import { Component } from 'react';
import PropTypes  from 'prop-types';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'id', headerName: 'Index', flex: 0.0, type: 'number', hide: true},
  { field: 'districting', headerName: 'Districting', flex: 0.2, type: 'number'},
  { field: 'objectiveScore', headerName: 'Total', description: 'Total Objective Score', flex: 0.1, type: 'number' },
  { field: 'equalPopulationScore', headerName: 'EP', description: 'Equal Population Score', flex: 0.1, type: 'number' },
  { field: 'deviationAverageScore', headerName: 'DA', description: 'Deviation from Average Score', flex: 0.1, type: 'number' },
  { field: 'deviationEnactedScore', headerName: 'DE', description: 'Deviation from Enacted Score', flex: 0.1, type: 'number' },
  { field: 'compactnessScore', headerName: 'C', description: 'Compactness Score', flex: 0.1, type: 'number' },
  { field: 'splitCountiesScore', headerName: 'SC', description: 'Split County Score', flex: 0.1, type: 'number' },
  { field: 'efficiencyGapScore', headerName: 'EG', description: 'Efficiency Gap Score', flex: 0.1, type: 'number'},
  { field: 'majorityMinority', headerName: 'MM', description: '# Majority-Minority Districts', flex: 0.1, type: 'number'}
];

class DistrictingsTable extends Component {
  render() {
      var rows = [];
      for(var i=0; i<this.props.rows.length; i++){
        var districting = this.props.rows[i];
        var dataObj = this.setupDataRow(i,districting);
        rows.push(dataObj);
      }
      return (
        <DataGrid 
          autoHeight = { true } 
          showColumnRightBorder = { false } 
          disableColumnMenu = { true } 
          disableExtendRowFullWidth = { false } 
          rowHeight = { 34 } 
          hideFooter = { true } 
          rows = { rows }  
          columns = { columns }
          onRowEnter = { (param, event) => this.props.onRowEnter(param['id'] - 1, "ON") }
          onRowClick = { (param, event) => this.props.onRowClick(param['row']['districting']) }
        />
      );
  }
  setupDataRow(idx,districting){
    return {
      id: idx + 1,
      districting: districting.id,
      objectiveScore: districting.objectiveScores.total,
      equalPopulationScore: districting.objectiveScores.equalPopulations,
      deviationAverageScore: districting.objectiveScores.deviationAverage,
      deviationEnactedScore: districting.objectiveScores.deviationEnacted,
      compactnessScore: districting.objectiveScores.compactness,
      splitCountiesScore: districting.objectiveScores.splitCounties,
      efficiencyGapScore: districting.objectiveScores.efficiencyGap,
      majorityMinority: districting.majorityMinority
    };
  }
}

DistrictingsTable.propTypes = {
  onRowEnter: PropTypes.func.isRequired
  ,onRowClick: PropTypes.func.isRequired
  ,rows: PropTypes.array.isRequired
}

export default DistrictingsTable