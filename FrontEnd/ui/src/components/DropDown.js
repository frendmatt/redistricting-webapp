import { Component } from 'react';
import PropTypes  from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

class DropDown extends Component {
    render() {
        return (
            <FormControl variant = "filled" style = {{ width: "100%" }} disabled = { this.props.disabled }>
                <InputLabel id = "dropdown-label">
                    { this.props.title }
                </InputLabel>
                <Select value = { this.props.value } onChange = { (e) => this.props.changeFn(this.props.valueName, e.target.value) } labelId = "dropdown-label">
                    { this.props.values.map((name) => (   
                        <MenuItem disabled = { name === "Citizen Voting Age Population" || name === "Population Fatness" || name === "Polsby-Popper"} value = { name }>
                            { name }
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }
}

DropDown.propTypes = {
    value: PropTypes.string.isRequired
    ,valueName: PropTypes.string.isRequired
    ,changeFn: PropTypes.func.isRequired
    ,title: PropTypes.string.isRequired
    ,values: PropTypes.array.isRequired
    ,disabled: PropTypes.bool.isRequired
}

export default DropDown