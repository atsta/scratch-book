
import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import DoneIcon from '@material-ui/icons/Done';
import Box from '@material-ui/core/Box';
import SettingsIcon from '@material-ui/icons/Settings';

export default function EditLink(params) {
    const [ Checked, setChecked ] = useState(false);
    const [ Link, setLink ] = useState(params.item.LinkName);
    const [ Comment, setComment ] = useState(params.item.Comment);

    

    function change_handle(e){
        e.preventDefault();
        params.changeItem(params.index,Link,Comment)
        params.close_dialog()
    }
    console.log("AAAAAAA")
    console.log(params.item.LinkName)
    console.log(params.index)
    return(
        <div>
            
            <Dialog open={true} onClose={params.close_dialog}  aria-labelledby="form-dialog-title"> 
            <form  onSubmit={change_handle}>
            {/* onSubmit={change_handle} */}
                <DialogContent>
                <DialogContentText>
                      Please fill the labels you'd like to change
                  </DialogContentText>
                    <div >
                        <TextField
                        margin="dense"
                        label="Link"
                        type="text"
                        fullWidth
                        value={Link}
                        onChange={(e)=>{setLink(e.target.value)}}

                    />
                        <TextField
                            style={{height:"auto"}}
                            //id="standard-disabled"
                            value={Comment}
                            fullWidth
                            label="Comment"
                            variant="outlined"
                            onChange={(e)=>{setComment(e.target.value)}}
                            />
                    </div>
               </DialogContent>
                  <DialogActions>
                  <Button onClick={params.close_dialog} color="primary">
                      Cancel
                  </Button>
                  <Button type="submit" color="primary">
                      Submit
                  </Button>
                  </DialogActions>
              </form>
        </Dialog>
        </div>

        
    )
};
