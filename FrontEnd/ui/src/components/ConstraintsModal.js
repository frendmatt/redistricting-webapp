import { Component } from 'react';
import PropTypes  from 'prop-types';
import { Button } from '@material-ui/core';

class ConstraintsModal extends Component {
  render() {
    return (
        <div id = "constraintsModal" hidden = { this.props.hideConstraintsModal }>
            <div id = "constraintsContent">
                <h2 style = {{ marginTop: "40px", marginLeft: "40px", marginRight: "40px", color: "#3f51b5" }}>
                    Returned 
                    <div style = {{ color: "#000000" }}>
                        {this.props.constrainedNumber > 15000 ? "More than 15,000" : "Less than 50"}
                    </div> 
                    Districtings
                </h2>
                <h5 style = {{ marginTop: "40px", marginLeft: "40px", marginRight: "40px", color: "#000000" }}>
                    Please modify constraints to get this number between 50 and 15,000 districtings!! 
                </h5>
                <Button variant = "outlined" color = "primary" size = "large" onClick = { () => this.props.setHideConstraintsModal(true) } style = {{ marginTop: "10px", marginBottom: "10px", marginLeft: "50%", marginRight: "50%", transform: "translate(-50%, 0%)" }}>
                    Close
                </Button>
            </div>
        </div>
    );
  }
}

ConstraintsModal.propTypes = {
  hideConstraintsModal: PropTypes.bool.isRequired,
  setHideConstraintsModal: PropTypes.func.isRequired,
  constrainedNumber: PropTypes.number.isRequired
}

export default ConstraintsModal