import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import {updateBoard} from '../../../../api.js';

export default function Edit_Boards(params) {

    // console.log(params.data)
    // var myobject=[...params.data]
    const [ MyData, setMyData ] = useState([...params.data]);
    const [ Checked, setChecked ] = useState(params.Board_info.is_public);
    const [ Title, setTitle] = useState(params.Board_info.title);
    const [ Comment, setComment] = useState(params.Board_info.comment);

    const toggleChecked = () => {
        setChecked((prev) => !prev);
      };

    // function change_parameter(value,index,name){
    //     let newArr = [...MyData]; // copying the old datas array
    //     newArr[index][name] = value; // replace e.target.value with whatever you want to change it to
    //     setMyData(newArr)
    // }

    function handle_submit(e){
        e.preventDefault();
        let newArr = params.Board_info;
        newArr["title"] = Title;
        newArr["is_public"] = Checked;
        newArr["comment"] = Comment;
        // console.log("Submit done");

        let item={"title":Title,"comment":Comment,"is_public":Checked}
        var fdata = new FormData();
        for ( var key in item ) {
            fdata.append(key, item[key]);
        }
        updateBoard(fdata,params.Board_info._id)
            .then(() => {
                params.changeBoard(newArr);
                params.changeData(MyData);
            })
            .finally(() => {
                params.handleClose(false)
            });
    }

    // The following is to keep functional old and new functionality
    const open = params.hasOwnProperty('open') ? params.open : true;

    return(
        <Dialog open={open} onClose={()=>{params.handleClose(false)}}  aria-labelledby="form-dialog-title">
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
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Comment"
                        type="text"
                        fullWidth
                        value={Comment}
                        onChange={(e)=>setComment(e.target.value)}

                        />     
                  <Grid container >
                      <Grid item xs={6}>
                        Public
                      </Grid>
                      <Grid item xs={6}>
                        <Switch checked={Checked} onChange={toggleChecked}  color="primary"/>
                      </Grid>
                  </Grid>
                  
                {/* {MyData.map((item,index)=>{
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
                    
                })} */}
                  

                
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
