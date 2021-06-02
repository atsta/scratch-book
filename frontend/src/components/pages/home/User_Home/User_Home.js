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
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CheckIcon from '@material-ui/icons/Check';
import ConfirmDialog from '../../ConfirmDialog/ConfirmDialog.js'
import {addBoard, deleteBoard, FollowBoard, UnfollowBoard} from '../../../../api.js';

import './User_Home.css';
import zIndex from '@material-ui/core/styles/zIndex';


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
    const [ ConfirmOpen, setConfirmOpen ] = useState(false);
    const [ Show_fbut, setShow_fbut ] = useState(true);



    // case of unfollow button
    function handle_unfollow(item, index){
        if(params.unfollow==="True"){
            return(
                <div>
                    <Button onClick={()=>{unfollowaBoard(item, index)}} style={{color: "red"}} startIcon={<RemoveIcon/>}>
                        Unfollow Board
                    </Button>
                </div>
                
            )
        }
    }

    function unfollowaBoard(item,index){
        var fdata = new FormData();
        fdata.append("title", item["title"]);

        let newArr=[...params.boards];
        newArr.splice(index, 1);
        params.changeBoards(newArr);

        UnfollowBoard(fdata);

    }

    // case of follow button
    function handle_follow(item, index){
        if(params.follow==="True"){
            if(Show_fbut){
                return(
                    <div>
                        <Button onClick={()=>{followaBoard(item, index)}} style={{color: "white"}} endIcon={<AddIcon/>}>
                            Follow Board
                        </Button>
                    </div>
                    
                )
            }
            else{
                return(
                    <div>
                        
                        <span>Followed</span>
                        <CheckIcon />
                    </div>  
                )
            }
            
        }
    }

    function followaBoard(item,comment){
        var fdata = new FormData();
        fdata.append("title", item["title"]);
        setShow_fbut(false)
        FollowBoard(fdata)

    }

    //case we want to show the rating
    function show_rating(rate, i_public){
        if(i_public){
            if(rate===undefined || rate===null){
                return(
                    <div>
                        <Rating defaultValue={0} precision={0.5} readOnly />
                        <Typography className="ml-1 small">({0})</Typography>
                    </div>
                    
                )
            }
            else{
                console.log(rate)
                let sum=0;
                for(var board_rating of rate) {
                    sum = sum + parseFloat(board_rating.rating);
                }
                return(
                    <div className="align-items-end ml-2">
                        <Rating defaultValue={sum/rate.length} precision={0.5} readOnly />
                        <Typography className="ml-1 small">({rate.length})</Typography>
                    </div>
                    
                )
            }
            
        }
    }   

    function show_edit(){
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
                    private:params.private,
                    follow:params.follow
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

    function p_color(item){
        if(item.is_public===true){
            return "green"
        }
        else{
            return "red"
        }
    }

    function handle_deleteBoard(item,index){
        if (params.private==="True"){
            return(
                <Grid container >
                    <Grid item xs={12} sm={10}>
                        
                            {/* <span>Public:</span>
                            <FiberManualRecordIcon style={{color:p_color(item)}}></FiberManualRecordIcon> */}
                        
                          
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Button onClick={()=>{ setConfirmOpen(true)/*deleteaBoard(item,index)*/}} startIcon={<DeleteIcon/>}>
                        Delete
                        </Button>
                        <ConfirmDialog
                            title={"Are you sure you want to delete Board "+item.title+"?"}
                            open={ConfirmOpen}
                            setOpen={setConfirmOpen}
                            children="*This action cannot be undone"
                            onConfirm={deleteaBoard}
                            item={item}
                            index={index}
                        ></ConfirmDialog>
                    </Grid>
                </Grid>
                
            )
        }
    }

    function open_board(board) {
        console.log(params.follow)
        history.push({
            pathname: `/boards/${board._id}`,
            state: { board:board,
                private:params.private,
                follow:params.unfollow,
            },
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
                                    <Button size="small" color='inherit'style={{textTransform: "none"}} > {/*onClick={handleShowAll} */}
                                        See all the list
                                    </Button>
                                </Grid>
                            </Grid>
                            
                        </Grid>
                    </Grid>
                    
                    {params.boards.map((item,index)=>{
                        return(
                            <div key={index} style={{marginBottom: "1.7%"}}>
                                <Card style={{backgroundColor: "#6E7A84", color:"black",padding:"1% 2% 2% 2%"}}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <Grid container>
                                                <Grid item>
                                                    {/*<Button className={classes.buttonStyle} onClick={()=>show_list(item)} color="inherit">*/}
                                                    {/*    <Box fontSize="1.5rem">{item.title}</Box>*/}
                                                    {/*</Button>*/}
                                                    <Button className={classes.buttonStyle} onClick={()=>open_board(item)} color="inherit">
                                                    <h4 className="text-white mb-0 font-weight-bold">{item.title}</h4>
                                                    </Button>
                                                </Grid>
                                                <Grid item>
                                                    <span className={`badge ${item.is_public ? 'badge-success' : 'badge-danger'} ml-2 pb-1`}
                                                        title="Board visibility"
                                                    >
                                                        {item.is_public ? 'public' : 'private'}
                                                    </span>
                                                </Grid>
                                            </Grid>
                                        
                                            
                                        </Grid>
                                        <Grid item xs={12} sm={6} align="right">
                                            {handle_deleteBoard(item,index)}
                                            {handle_follow(item,index)}
                                            {handle_unfollow(item,index)}
                                            {show_rating(item.ratings, item.is_public)}
                                            
                                            
                                        </Grid>
                                        <Grid item xs={12} align="center">
                                            <TextField
                                            style={{height:"auto",width:"86%"}}
                                            //id="standard-disabled"
                                            defaultValue={item.comment}
                                            fullWidth
                                            label="Comment"
                                            variant="filled"
                                            InputProps={{
                                                readOnly: true,
                                                className: "text-white",
                                            }}
                                            />
                                        </Grid>
                                    </Grid>
                                    
                                </Card>
                                
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
