import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';


import PlayeurCard from './PlayeurCard'
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}>
        {value === index && (
          <Box p={3}>
            {children}
          </Box>
        )}
      </div>
    );
  }

export default class School extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value:0,
            ListeDeJoueur:localStorage.getItem("ListeDeJoueur")?JSON.parse(localStorage.getItem('ListeDeJoueur')):[],
        }
        this.handleChange=this.handleChange.bind(this)
        props.connection.on("ListPlayeur",(data)=>{
            this.setState({ListeDeJoueur:data})
            localStorage.setItem('ListeDeJoueur',JSON.stringify(data))
        })
        
    }
    handleChange(event,newvalue){this.setState({value:newvalue});}

    componentDidMount(){
        this.props.connection.invoke('GetAllPlayeur')
    }

    render(){
        this.props.connection.invoke('GetAllPlayeur')
        return(
            <div id="school">
                  <AppBar position="static">
                  <Tabs value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example">
                    <Tab label="Liste des etudiant"  />
                    <Tab label="Tchat de classe"  />
                    <Tab label="Cour"  />
                  </Tabs>
                </AppBar>
                <TabPanel value={this.state.value} index={0}  >
                    {this.state.ListeDeJoueur.length===0&&<CircularProgress style={{margin:"0 auto"}} />}
                    {this.state.ListeDeJoueur!==[]&&this.state.ListeDeJoueur.map(function(value,index){
                        return(<PlayeurCard key={index} {...value}/>)})}
                </TabPanel>
                <TabPanel value={this.state.value} index={1}>
                  Item Two
                </TabPanel>
                <TabPanel value={this.state.value} index={2}>
                  Item Three
                </TabPanel>
            </div>)
    }
}