import React from 'react';
import AppIcon from './Appbutton'

class Home extends React.Component{
    render(){
        return(
            <div id="Home">
                <AppIcon icon={["fas","globe-europe"]} text="Maps" link="/maps" color="green" />
                <AppIcon icon={["fas","graduation-cap"]} text="School" link="/school" color="black" />
                <AppIcon icon={["fa","suitcase"]} text="Inventaire" link="/Inv" />
                <AppIcon icon={["fas","user"]} text="Profil" link="/profil"  color="black" />
                {this.props.turn>=2 &&<AppIcon icon={["fas","store"]} text="Store" link="/store" />}
                {this.props.turn>=1 &&<AppIcon icon={this.props.status==="king"?["fas","chess-king"]:["fas","chess-pawn"]} text="King's Game" link="/game" color="#DEB887" />}
                <AppIcon icon={["far","calendar-alt"]} text="Calendrier" link="/calendar" />
                {this.props.turn>=5 &&<AppIcon icon={["fas","dice-d20"]} text="Gacha Luck" link="/gacha" color="black"  />}
                <AppIcon icon={["fas","cogs"]} text="Parametre" link="/param" />
                <AppIcon icon={["fas","book"]} text="Régle" link="/rules"  color=""/>
                {this.props.debug&&<AppIcon icon={["fas","arrow-up"]} text="TurnUp" link="/"  color="" onClick={this.props.handleUP}/>}
                {this.props.debug&& <AppIcon icon={["fas","arrow-down"]} text="TurnDown" link="/"  color="" onClick={this.props.handleDOWN} />}
                {this.props.debug&&<AppIcon icon={["fas","random"]} text="Switch King/Student" link="/"  color="" onClick={this.props.handleSwitch} />}
                {this.props.debug&&<AppIcon icon={["fas","journal-whills"]} text={"Tour : "+this.props.turn} link="/"  color="" />}
                {this.props.debug&&  <AppIcon icon={["fas","journal-whills"]} text={"Status : "+this.props.status} link="/"  color="" />}
                {this.props.debug&&<AppIcon icon={["fas","lock"]} text="Lock the screen" link="/" color="" onClick={this.props.Lock}/>}
            </div>
        )
    }
}

export default Home;