import React from 'react';
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Clock extends React.Component {
  render() {
    var time = moment().format('HH·mm');
    return(
    <div className="clock">{time}</div>
    );
  }
};
class Weather extends  React.Component{
    constructor(props){
        super(props);
        this.state={
            icon: this.getIcon()
        }
    }
  getIcon() {
    var time=moment().format('HH');
    if(time>20||time<7)
      return 'moon';
    var icons = ['sun','cloud'];
    var icon = icons[Math.floor(Math.random()*icons.length)];
    return icon;    
  }
  render() {
    return(
      <div className="weather">25&deg;  <FontAwesomeIcon icon={["fas",this.state.icon]} /></div>
    );
  }
}

class UnlockSlider extends React.Component{
constructor(props){
    super(props)
    this.state={unlockValue:0}
    this.onChange=this.onChange.bind(this)
}
onChange(event) {
  this.setState({unlockValue: event.target.value});
  if(event.target.value==="100")
        this.props.Unlock()
}
render() {
  return(
    <div className="unlock-slider">
      <input type="range" className="lockscreen" value={this.state.unlockValue} onChange={this.onChange} max="100" />
    </div>
  );
}
};

class LockScreen extends React.Component{
    render(){
        return(
            <div className="LockScreen">
              <div style={{position:"absolute",top:"60px",width:"80%",textAlign:"center",}}>
                <h1>A king among us</h1>
              </div>
                <div className="LockComponent">
                    <Clock />
                    <Weather />
                </div>
                <UnlockSlider Unlock={this.props.Unlock}/>
            </div>
        )
    }
}


export default LockScreen;