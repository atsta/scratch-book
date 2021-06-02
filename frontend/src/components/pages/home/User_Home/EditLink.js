
import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';

export default function EditLink(params) {
    const [ Link, setLink ] = useState(params.item?.url || '');
    const [ Comment, setComment ] = useState(params.item?.comment || '');

    useEffect(() => {
        setLink(params.item?.url || '');
        setComment(params.item?.comment || '');
    }, [params]);

    function change_handle(e){
        e.preventDefault();
        params.changeItem(params.index,Link,Comment)
        params.close_dialog()
    }

    const open = params.hasOwnProperty('open') ? params.open : true;

    return(
        <div>
            
            <Dialog open={open} onClose={params.close_dialog}  aria-labelledby="form-dialog-title">
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
