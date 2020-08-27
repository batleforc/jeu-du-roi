import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import moment from 'moment'

import NAVbar from "./App/NavBar";
import Home from './App/Home';
import AppDontWork from "./App/ThisMicroAppDontWork"
import LockScreen from './App/LockScreen';
import CreatePerso from './App/CreatePerso';
import WaitingGame from './App/WaitingGame';
import School from './App/School'
const signalR = require("@microsoft/signalr");

class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            turn:0,
            where:"Home", //Ou est le joueur sur la map
            status:"king", //sois king sous sudent
            debug:true, //ceci ne debug que l'interface xD aux moindre acces a certaine fonction tout est remis en place 
            Locked:true, //définis si l'appareille est déverouiller ou non
            SchoolMessage:[],
            PrivateMessage:[],
            GroupName:localStorage.getItem("GroupName"),
            Error:null,
            Errorstatus:null,
            PersoCreated:false,
            Connected:false,
            PartieStarted:false,
            IsAuth:false,
            Token:""

        }
        let connection; // eslint-disable-line
        let Token="eyJhbGciOiJSUzI1NiIsImtpZCI6IjEyODA5ZGQyMzlkMjRiZDM3OWMwYWQxOTFmOGIwZWRjZGI5ZDM5MTQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYWthdS02YThkZSIsImF1ZCI6ImFrYXUtNmE4ZGUiLCJhdXRoX3RpbWUiOjE1OTg1MzY5MzEsInVzZXJfaWQiOiJvMGIwWUdCa0RSUlVnREdHV1RFeDVhcDRyUnIyIiwic3ViIjoibzBiMFlHQmtEUlJVZ0RHR1dURXg1YXA0clJyMiIsImlhdCI6MTU5ODUzNjkzMSwiZXhwIjoxNTk4NTQwNTMxLCJlbWFpbCI6Im1heGxlcmljaGUuNjBAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIm1heGxlcmljaGUuNjBAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.O4aqnrw4U39lgU__nBnr1BMjuPEb0uKMHYTV7Rp5kO1O80DvnXGROobNXC5LG6dEEwIYywzT_CT0PiqNX80ZPQU4EDT8ohvdfcyYeruXUh7DZrJWGUW8i99Son2mt9fx3q4n6qVHkHO8_I5UhW8PzXBsO9GRe-XWOpxKBXdh-xdU-rwTgSvWUnn6JlT-hSmCHysGzR1dKvqcYpozbHh7egRWTxqRVvJYcUqa8SmNIH9Wwz200fw8qbkbCf3CFQFm6JR8xdj8MaCIO_4YLWJ48SP2kGDkD5fNlw0AdoTo3T3UwQA-2h9LPNQCRXWDs6CNg9WTg8naSyIAjF820ZIuAg";
        this.handleswitchkingstudent=this.handleswitchkingstudent.bind(this);
        this.handleturndown=this.handleturndown.bind(this);
        this.handleturnup=this.handleturnup.bind(this);
        this.handleUnlock=this.handleUnlock.bind(this);
        this.handlePersoCreated=this.handlePersoCreated.bind(this);
        this.handledebugwaiting=this.handledebugwaiting.bind(this);
        this.IsHauth=this.IsHauth.bind(this);
        this.connection = new signalR.HubConnectionBuilder()
                                                        .withUrl("https://akaucore.weebo.fr/api",{ accessTokenFactory: () => Token }) //localhost:44395 akaucore.weebo.fr/api
                                                        .build();
        this.connection.on("MessageTalk",(Email,Message)=>{
            /* eslint-disable */
            if(!this.state.PrivateMessage[Email])
                this.state.PrivateMessage[Email]=[]
            this.state.PrivateMessage[Email].push([moment().format('HH:mm'),Message])
            this.setState({PrivateMessage:this.state.PrivateMessage});
        })
        /* eslint-enable */
        this.connection.on("SchoolTalk",(Email,Message)=>{
            /* eslint-disable */
            this.state.SchoolMessage.push([Email,moment().format('HH:mm'),Message])
            this.setState({SchoolMessage:this.state.SchoolMessage});
        })
        /* eslint-enable */
        this.connection.on("Turn",(turn)=>this.setState({turn:turn}))
        this.connection.on("PartieStatus",(data)=>{this.setState({PartieStarted:data})})
        this.connection.on("GroupName",(GroupName)=>{
            this.setState({"GroupName":GroupName,"PersoCreated":true})
            localStorage.setItem("GroupName",GroupName)
        })
        this.connection.on("Error",(ErrorStatus,ErrorMessage)=>{
            this.setState({Error:ErrorMessage});
            this.setState({Errorstatus:ErrorStatus})
        })
        this.connection.on("GetTest",data=>{
            console.log(data)
        })
    }
    
    IsHauth(){
        this.connection.start().then(()=>{
            this.setState({Connected:true});
            this.connection.invoke("GetMaxPointstat");
            this.connection.invoke("GetMaxPerStat");
            this.connection.invoke("GetTurn");
        })
    }

    componentDidMount(){
        this.IsHauth()
    }
    handlePersoCreated(){
        this.setState({PersoCreated:true})
    }
    handleturnup(){
        this.setState({turn:this.state.turn+1})
    }
    handleturndown(){
        this.setState({turn:this.state.turn-1})
    }
    handleswitchkingstudent(){
        this.setState({status:this.state.status==="king"?"student":"king"})
        this.connection.invoke("SendMessage","maxime","Est devenue"+this.state.status)
    }
    handleUnlock(lock){
        console.log("Youhouu")
        if(lock)
            this.setState({Locked:true})
        else
        this.setState({Locked:false})
    }
    handledebugwaiting(){
        this.setState({PartieStarted:true})
    }


    render(){
        if(!this.state.PersoCreated)
            return(<CreatePerso connection={this.connection} handle={this.handlePersoCreated} debug={this.state.debug} />)
        if(!this.state.PartieStarted)
            return(<WaitingGame debug={this.state.debug} handle={this.handledebugwaiting} />)
        return(
            <div>
                {this.state.Locked===true&&<LockScreen Unlock={this.handleUnlock} LockState={this.state.Locked}/>}
                {this.state.Locked===false&&<div className={this.state.Locked?"App locked":"App"}>
                <Router>
                    <Switch>
                        <Route path="/" exact>
                            <Home turn={this.state.turn} status={this.state.status} handleUP={this.handleturnup} handleDOWN={this.handleturndown} handleSwitch={this.handleswitchkingstudent} debug={this.state.debug} Lock={this.handleUnlock}/>
                        </Route>
                        <Route path="/picture">
                            <AppDontWork who="picture" turn={this.state.turn} status={this.state.status} />
                        </Route>
                        <Route path="/message">
                            <h1> je suis message</h1>
                        </Route>
                        <Route path="/contact">
                            <h1>je suis contact</h1>
                        </Route>
                        <Route path="/call">
                            <h1> je suis appelle</h1>
                        </Route>
                        <Route path="/maps">
                            <h1>je suis maps</h1>
                        </Route>
                        <Route path="/school">
                            <School connection={this.connection} Sm={this.state.SchoolMessage}/>
                        </Route>
                        <Route path="/inv">
                            <h1> je suis l'inventaire</h1>
                        </Route>
                        <Route path="/profil">
                            <h1> je suis le profil</h1>
                        </Route>
                        <Route path="/store">
                            <h1> je suis le store</h1>
                        </Route>
                        <Route path="/game">
                            <h1> je suis kings game</h1>
                        </Route>
                        <Route path="/calendar">
                            <h1>Je suis le calendrier</h1>
                        </Route>
                        <Route path="/gacha">
                            <h1>je suis une luck roulette</h1>
                        </Route>
                        <Route path="/param">
                            <h1>je suis les paramétre</h1>
                        </Route>
                        <Route path="/rules">
                            <h1>je suis les regle</h1>
                        </Route>
                    </Switch>
                    <NAVbar/>
                </Router>
            </div>}
            </div>
        )
    }
}

export default App;
