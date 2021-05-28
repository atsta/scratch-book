import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import LinkM from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Rating from '@material-ui/lab/Rating';
import {Button} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from "@material-ui/core/styles";
import AddBoards from './AddBoard.js';
import DeleteIcon from '@material-ui/icons/Delete';
import {addBoard, deleteBoard} from '../../../../api.js';

import './User_Home.css';


const useStyles=makeStyles({
    buttonStyle:{
        textTransform:"none",
        paddingLeft:"0"
    }

});


export default function User_Home(params) {

    const classes=useStyles();
    let history = useHistory();
    const [ Open_add, setOpen_add ] = useState(false);

    function show_rating(rate){
        if(rate!==-1 && params.private!=="True"){
            return(
                <Rating defaultValue={rate} precision={0.5} readOnly/>
            )
        }
    }   

    function show_edit(rate){
        if(params.private==="True"){
            return(
                <Button onClick={()=>{setOpen_add(true)}} style={{color: "white"}} endIcon={<AddIcon/>}>
                    Add new Board
                </Button>
            )
        }
    }   

    function addaBoard(title,comment){
        let item={title: title , is_public:false,comment:comment }
        var fdata = new FormData();
        for ( var key in item ) {
            fdata.append(key, item[key]);
        }
        let newArr = [...params.boards];
        addBoard(fdata)
        newArr.push(item);
        params.changeBoards(newArr);
    }

    function deleteaBoard(item, index){
        
        let newArr=[...params.boards];
        var fdata = new FormData();
        fdata.append("title", item.title);
        deleteBoard(item._id,fdata);
        newArr.splice(index, 1);
        console.log(newArr);
        params.changeBoards(newArr);
        
        
    }

    function handle_show_add(){
        if (Open_add===true){
            return(
                <AddBoards
                handleClose={setOpen_add}
                addnewBoard={addaBoard}
                >
                </AddBoards>
            )
        } 
    }
    
    function show_Title(){
        if(params.private==="True"){
            return(
                "My Boards"
            )
        }
        else{
            return(
                "Public Boards"
            )
            
        }
    }    

    function show_list(value){
        history.push(
            {
                pathname: '/list',
                state:{
                    Board_info:value,
                    private:params.private
                }
            });
    }
    
    function handleShowAll(){
        history.push(
            {
                pathname: '/showAll',
                state:{
                    private:params.private
                }
            });
    }

    function handle_deleteBoard(item,index){
        if (params.private==="True"){
            return(
                <div>                    
                    <Button onClick={()=>{deleteaBoard(item,index)}} endIcon={<DeleteIcon/>}>
                    
                    </Button>
                </div>
                
            )
        }
    }

    return (
        <div className="text-white">
            <Grid container>
                <Grid item xs={12} sm={2}>

                </Grid>
                <Grid item xs={12} sm={8}>
                    <Grid container style={{marginBottom:"4%",marginTop:"4%"}}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h4" align="left"><Box fontSize="1.8rem">{show_Title()}</Box></Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} align="right">
                            <Grid container>
                                <Grid item xs={8}>
                                   {show_edit()}
                                </Grid>
                                <Grid item xs={4}>
                                    <Button size="small" color='inherit'style={{textTransform: "none"}} onClick={handleShowAll}>
                                        See all the list
                                    </Button>
                                </Grid>
                            </Grid>
                            
                        </Grid>
                    </Grid>
                    
                    {params.boards.map((item,index)=>{
                        return(
                            <div key={index}>
                                <Grid container>
                                    <Grid item xs={6}>
                                    <Button className={classes.buttonStyle} onClick={()=>show_list(item)} color="inherit">
                                        <Box fontSize="1.5rem">{item.title}</Box>
                                    </Button>
                                        
                                    </Grid>
                                    <Grid item xs={6} align="right">
                                        {show_rating(item.rating)}
                                        {handle_deleteBoard(item,index)}
                                    </Grid>
                                </Grid>
                                <TextField
                                style={{height:"auto"}}
                                //id="standard-disabled"
                                defaultValue={item.comment}
                                fullWidth
                                label="Comment"
                                variant="outlined"
                                InputProps={{
                                    readOnly: true,
                                }}
                                />
                            </div>
                        )
                            })
                        }
                
                        {handle_show_add()}
                </Grid>
                <Grid item xs={12} sm={2}>

                </Grid>
            </Grid>
            
        </div>
        
    );
};
