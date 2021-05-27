import React ,{useState} from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import DoneIcon from '@material-ui/icons/Done';




export default function Change_prof(params) {

    const [ Username, setUsername ] = useState(params.Username);
    const [ Email, setEmail ] = useState(params.Email);
    const [ Pass, setPass ] = useState("");
    const [ CPass, setCPass ] = useState("");
    const [ UserPass, setUserPass ] = useState("");

    function change_handle(e){
        e.preventDefault();
        var obj_body={};

        if(Username!==null && Username!==""){
            obj_body.username=Username;
            params.changeUsername(Username)
        }
        if(Email!==null && Email!==""){
            obj_body.email=Email;
            params.changeEmail(Email)
        }

        params.handleClose(false)
    }

    function handleConfirm(){
        if(CPass===""){
            return null;
        }
        if(CPass===Pass){
            return(<Typography style={{ color: "green" }} >All good</Typography>)
        }
        if(CPass!==Pass){
            return(<Typography style={{ color: "red" }}>Please try again</Typography>)
        }
    }

    function handle_pass_check(){
        if(UserPass==="123" && CPass===Pass){
            return false;
        }
        else{
            return true;
        }
    }

    return(
        <Dialog open={true} onClose={()=>{params.handleClose(false)}}  aria-labelledby="form-dialog-title">
            <form onSubmit={change_handle}>
                <DialogContent>
                <DialogContentText>
                      Please fill the labels you'd like to change
                  </DialogContentText>

                  <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Username"
                      type="text"
                      fullWidth
                      value={Username}
                      onChange={(e)=>setUsername(e.target.value)}

                  />
                  <TextField
                      margin="dense"
                      id="name"
                      label="Email"
                      type="email"
                      fullWidth
                      value={params.Email}
                      onChange={(e)=>setEmail(e.target.value)}

                  />
                  <TextField
                      
                      margin="dense"
                      id="name"
                      label="New Password"
                      type="password"
                      fullWidth
                      value={Pass}
                      onChange={(e)=>setPass(e.target.value)}

                  />
                   <TextField
                      
                      margin="dense"
                      id="name"
                      label="Confirm New Password"
                      type="password"
                      fullWidth
                      value={CPass}
                      onChange={(e)=>setCPass(e.target.value)}

                  />
                  {handleConfirm()}

                <Grid container spacing={0} className="mrg_box2">
                    <Grid item xs={6}>
                        <div className="title_padding">
                            <Typography align="left">Before Submit please verify your password</Typography>
                        </div>
                    </Grid>
                    <Grid item justify="left" xs={4}>
                        <div className="title_box">
                            <TextField 
                            value={UserPass}
                            // className="boxesStyle"
                            onChange={(e)=>setUserPass(e.target.value)} 
                            variant="outlined" 
                            size="medium"
                            type="password"
                            borderColor="green"
                            
                            />
                            
                        </div>
                        
                    </Grid>

                    <Grid item justify="left" xs={2} align="center">
                            <Button  color="primary" 
                        // onClick={this.fetchUser_pass_check}
                        ><DoneIcon className="btn-add-date"></DoneIcon></Button>
                     </Grid>
                </Grid>
                </DialogContent>
                  <DialogActions>
                  <Button onClick={()=>{params.handleClose(false)}} color="primary">
                      Cancel
                  </Button>
                  <Button type="submit"  color="primary" disabled={handle_pass_check()}>
                      Submit
                  </Button>
                  </DialogActions>
              </form>

        
        
        </Dialog>

    )
};
