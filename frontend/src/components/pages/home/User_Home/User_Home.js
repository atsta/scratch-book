import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import LinkM from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Rating from '@material-ui/lab/Rating';
import {Button} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import Edit_Boards from './Edit_Boards.js';

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
    const [ Open_edit, setOpen_edit ] = useState(false);

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
                <Button onClick={()=>{setOpen_edit(true)}} style={{color: "white"}} endIcon={<SettingsIcon/>}>
                    Edit my Boards
                </Button>
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
                                        <Box fontSize="1.5rem">{item.BoardsName}</Box>
                                    </Button>
                                        
                                    </Grid>
                                    <Grid item xs={6} align="right">
                                        {show_rating(item.rating)}
                                    </Grid>
                                </Grid>
                                <TextField
                                style={{height:"auto"}}
                                //id="standard-disabled"
                                defaultValue={item.Comment}
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
                
               
                </Grid>
                <Grid item xs={12} sm={2}>

                </Grid>
            </Grid>
            
        </div>
        
    );
};
