import { Component } from 'react';
import PropTypes  from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class IncumbentList extends Component {
    render() {
        return (
            <div id = { this.props.name } style = {{ width: "100%", height: "auto", overflowX: "hidden", backgroundColor: "#e8e8e8" }} hidden = { this.props.stateCode !== this.props.name }> {
                this.props.incumbents.map((incumbent, index) => (
                    <FormControlLabel   
                        onMouseEnter = { () => this.props.onMouseEnter(index) }
                        onMouseLeave = { () => this.props.onMouseLeave() } 
                        control = {
                        <Checkbox
                            checked = { this.props.selected.includes(index + 1) } 
                            color = "primary" 
                            onChange={ this.props.fn.bind(this, index) }
                        />
                        }
                        label = { incumbent } 
                        style = {{ width: "100%", paddingLeft: "10px", backgroundColor: this.props.rgb[index] }} 
                   />
                ))}
            </div>
        );
    }
}

IncumbentList.propTypes = {
    incumbents: PropTypes.array.isRequired
    ,selected: PropTypes.array.isRequired
    ,rgb: PropTypes.array.isRequired
    ,name: PropTypes.string.isRequired
    ,stateCode: PropTypes.string.isRequired
    ,fn: PropTypes.func.isRequired
    ,onMouseEnter: PropTypes.func.isRequired
    ,onMouseLeave: PropTypes.func.isRequired
}

export default IncumbentList