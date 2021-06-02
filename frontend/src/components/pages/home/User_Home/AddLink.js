import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import { addLink } from '../../../../api';

export default function AddLink(params) {
    const [ Title, setTitle] = useState("");
    const [ Comment, setComment] = useState("");

    function handle_submit(e) {
        e.preventDefault();

        const item = { url: Title, comment: Comment };
        const fdata = new FormData();
        for(let key in item) {
            fdata.append(key, item[key]);
        }

        addLink(params.b_id, fdata)
            .then(response => {
                params.addnewLink();
            })
            .catch(error => {
                console.error(error.message);
            })
            .finally(() => {
                params.handleClose(false);
            });
    }

    const open = params.hasOwnProperty('open') ? params.open : true;

    return(
        <Dialog open={open} onClose={()=>{params.handleClose(false)}}  aria-labelledby="form-dialog-title">
            <form onSubmit={ (e)=>{handle_submit(e)}}>
            {/* onSubmit={change_handle} */}
                <DialogContent>
                <DialogContentText>
                    Submit the new Link and a Comment!
                  </DialogContentText>
                  <TextField
                        autoFocus
                        margin="dense"
                        label="Link"
                        type="text"
                        fullWidth
                        value={Title}
                        onChange={(e)=>setTitle(e.target.value)}

                        />
                    <TextField
                        margin="dense"
                        label="Comment"
                        type="text"
                        fullWidth
                        value={Comment}
                        onChange={(e)=>setComment(e.target.value)}

                        />    
                
                </DialogContent>
                  <DialogActions>
                  <Button onClick={()=>{params.handleClose(false)}} color="primary">
                      Cancel
                  </Button>
                  <Button type="submit" color="primary">
                      Add Link
                  </Button>
                  </DialogActions>
              </form>
        </Dialog>
    )
};
