import React from 'react';
import AppIcon from './Appbutton'

function NAVbar(){
    return(
        <div id="bottomnavbar">
        <AppIcon icon={["fas","camera"]} text="Photo" link="/picture" />
        <AppIcon icon={["fas","envelope"]} text="Message" link="/message" />
        <AppIcon icon={["fas","home"]} text="Home" link="/" />
        <AppIcon icon={["fas","address-book"]} text="Contact" link="/contact" />
        <AppIcon icon={["fas","phone-alt"]} text="Appelle" link="/call" />
    </div>
    )
}

export default NAVbar;