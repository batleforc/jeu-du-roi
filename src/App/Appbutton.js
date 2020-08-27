import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Link} from 'react-router-dom'

function AppIcon(props){
    var icon= props.icon?props.icon:["fas","home"];
    var text = props.text?props.text:"";
    var link = props.link?props.link:"/";
    var size= props.size?props.size:"2x";
    var color = props.color?props.color:"black"
    return(
        <Link to={link} onClick={props.onClick}>
            <FontAwesomeIcon icon={icon} size={size} color={color} style={{marginLeft:"auto",marginRight:"auto",display:"block"}}/>
            <p style={{margin:"0",color:color}}>{text}</p>
        </Link>
    )
}

export default AppIcon;