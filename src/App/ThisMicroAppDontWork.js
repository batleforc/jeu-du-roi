import React from 'react';
import {Redirect} from 'react-router-dom'
import Home from './Home';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function AppDontWork(props){
    var who= props.who?props.who:"home";
    var displayHome = props.home?props.home:true;
    const [open, setOpen] = React.useState(true);
    if(open===false){
        return(<Redirect to="/" />)
    }
      const handleClose = () => {
        setOpen(false);
      };
    return(
        <div>
            {displayHome&&<Home turn={props.turn} status={props.status} />}
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Erreur"}</DialogTitle>
              <DialogContent>
              <DialogContentText id="alert-dialog-description" style={{fontWeight:"bold"}}>
                  "{who}" ne fonctionne pas encore
              </DialogContentText>
                <DialogContentText id="alert-dialog-description" >
                   La curiosité n'est point un vilain défault mais ici l'appli demander ne fonctionne pas encore... Sois patient =D
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <button onClick={handleClose} color="primary">
                  Continuer
                </button>
              </DialogActions>
            </Dialog>
        </div>
    )
}

export default AppDontWork;