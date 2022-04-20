import { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes  from 'prop-types';

const loadingMsg = [
  "Switching databases again",
  "Unbanning Usman from discord",
  "Hand-drawing district geometries",
  "Crying over the gill construct",
  "Taking all available Seawulf Cores",
  "Arguing over compactness constraint",
  "Making this loading screen",
  "Watching Mickey Mouse",
  "Playing old PS2 Games",
  "Googling React Tutorials",
  "Getting results from abacus monkeys",
  "Reformatting to pep8",
  "Getting Sushi",
  "Getting 7/11 Wings"
];

class LoadingModal extends Component {
  static prevState = false;
  static curList = [...Array(loadingMsg.length).keys()];
  render() {
    if(!this.props.hideLoadingModal && !LoadingModal.prevState)
    {
      this.curListIndex = Math.floor(Math.random() * (LoadingModal.curList.length));
      this.msgIndex = LoadingModal.curList[this.curListIndex];
      //console.log(this.curListIndex + ":" + this.msgIndex);
      LoadingModal.curList.splice(this.curListIndex, 1);
      if(LoadingModal.curList.length == 0)
      {
        LoadingModal.curList = [...Array(loadingMsg.length).keys()];
        //console.log("RESET");
      }
    }
    LoadingModal.prevState = !this.props.hideLoadingModal;

    return (
      <div id = "loadingModal" hidden = { this.props.hideLoadingModal }>
        <div id = "loadingContent">
          <h2 style = {{ marginTop: "40px", marginLeft: "40px", marginRight: "40px", color: "#3f51b5" }}>
              Loading
          </h2>
          <CircularProgress style = {{ marginBottom: "40px" }}/>
          <h2 style = {{ marginTop: "40px", marginLeft: "40px", marginRight: "40px", fontSize: "1.2em" }}>
              <i>{loadingMsg[this.msgIndex]}...</i>
          </h2>
        </div>
      </div>
    );
  }
}

LoadingModal.propTypes = {
  hideLoadingModal: PropTypes.bool.isRequired
}

export default LoadingModal