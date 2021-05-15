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

export default function Edit_Boards(params) {

    console.log(params.data)
    // var myobject=[...params.data]
    const [ MyData, setMyData ] = useState([...params.data]);
    const [ Checked, setChecked ] = useState(params.Board_info.public);
    const [ Title, setTitle] = useState(params.Board_info.BoardsName);

    const toggleChecked = () => {
        setChecked((prev) => !prev);
      };

    function change_parameter(value,index,name){
        let newArr = [...MyData]; // copying the old datas array
        newArr[index][name] = value; // replace e.target.value with whatever you want to change it to
        setMyData(newArr)
    }

    function handle_submit(e){
        e.preventDefault();
        let newArr = params.Board_info;
        newArr["BoardsName"] = Title;
        newArr["public"] = Checked;
        params.changeBoard(newArr)
        console.log("Submit done")
        params.changeData(MyData);
        params.handleClose(false)
    }

    return(
        <Dialog open={true} onClose={()=>{params.handleClose(false)}}  aria-labelledby="form-dialog-title"> 
            <form onSubmit={ (e)=>{handle_submit(e)}}>
            {/* onSubmit={change_handle} */}
                <DialogContent>
                <DialogContentText>
                      Please fill the labels you'd like to change
                  </DialogContentText>
                  <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        type="text"
                        fullWidth
                        value={Title}
                        onChange={(e)=>setTitle(e.target.value)}

                        />
                  <Grid container >
                      <Grid item xs={6}>
                        Public
                      </Grid>
                      <Grid item xs={6}>
                        <Switch checked={Checked} onChange={toggleChecked}  color="primary"/>
                      </Grid>
                  </Grid>
                  
                {MyData.map((item,index)=>{
                    console.log(item.LinkName)
                    return(
                        <div key={index}>
                            <TextField
                            margin="dense"
                            label="Link"
                            type="text"
                            fullWidth
                            value={item.LinkName}
                            onChange={(e)=>{change_parameter(e.target.value,index,"LinkName")}}

                        />
                            <TextField
                                style={{height:"auto"}}
                                //id="standard-disabled"
                                defaultValue={item.Comment}
                                fullWidth
                                label="Comment"
                                variant="outlined"
                                onChange={(e)=>{change_parameter(e.target.value,index,"Comment")}}
                                />
                        </div>
                        
                        
                    )
                    
                })}
                  

                
                </DialogContent>
                  <DialogActions>
                  <Button onClick={()=>{params.handleClose(false)}} color="primary">
                      Cancel
                  </Button>
                  <Button type="submit" color="primary">
                      Submit
                  </Button>
                  </DialogActions>
              </form>
        </Dialog>
    )
    
};
