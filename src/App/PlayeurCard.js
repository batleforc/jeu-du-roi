import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';

export default function PlayeurCard(props){
    var color=[]
    color["backgroundColor"] = props.gender===0?"red":props.gender===1?"pink":props.gender===2?"black":"grey";
   
    return(
        <Card variant="outlined">
            <CardHeader 
                avatar={<Avatar aria-label="recipe" style={color}>{props.surname[0]+props.name[0]}</Avatar>}
                title={props.surname+" "+props.name}
                subheader={props.email}
                />
            <CardContent>
                <p><span style={{fontWeight:"bold"}} >Genre: </span>{props.gender===0?"Unknow":props.gender===1?"Femme":props.gender===2?"Homme":"Other"}</p>
                <p><span style={{fontWeight:"bold"}} >Vie:</span> {props.life}/{props.maxLife}</p>
                <p><span style={{fontWeight:"bold"}} >Status: </span>{props.isDead?"Mort":"En pleine forme"}</p>
            </CardContent>
        </Card>
    )
}