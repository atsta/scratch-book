import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import {Button} from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import EditBoards from './Edit_Boards.js';
import EditLink from './EditLink.js';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Rating from '@material-ui/lab/Rating';
import ConfirmDialog from '../../ConfirmDialog/ConfirmDialog.js'
import {getLinks, addLink, deleteLink} from '../../../../api.js';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';


import AddLink from './AddLink.js';
import Rate_Me from './Rate_me.js';

export default function ListInfo(params) {


    

    const [ Open_add, setOpen_add ] = useState(false);
    const [ Open_edit, setOpen_edit ] = useState(false);
    const [ ConfirmOpen, setConfirmOpen ] = useState(false);
    const [ myLinks, setmyLinks ] = useState(params.location.state.Board_info.webpages);
    const [ MyBoard, setMyBoard ] = useState(params.location.state.Board_info);
    const [ Checked, setChecked ] = useState(false);
    const [ myIndex, setmyIndex ] = useState(0);


    useEffect(() => {
        getLinks(params.location.state.Board_info._id).then(function(value) {
            console.log(value); // "Success"
            setmyLinks(value.URLS)
          }, function(value) {
            
            // not called
          });

    },[])

    function make_the_change(index,link,comment){
        let newArray=[...myLinks]
        newArray[index]["url"]=link
        newArray[index]["comment"]=comment

        setmyLinks(newArray)
    }

    function handle_show_ed(){
        if (Open_edit===true){
            return(
                <EditBoards
                handleClose={setOpen_edit}
                data={myLinks}
                changeData={setmyLinks}
                Board_info={MyBoard}
                changeBoard={setMyBoard}
                >
                </EditBoards>
            )
        } 
    }

    function addaLink(title,comment){
        let item={url: title , comment:comment }    //Comment: comment
        console.log(item)
        var fdata = new FormData();
        for ( var key in item ) {
            fdata.append(key, item[key]);
        }
        let newArr = myLinks;
        addLink(params.location.state.Board_info._id,fdata)
        newArr.push(item);
        setmyLinks(newArr);
    }

    function handle_show_add(){
        if (Open_add===true){
            return(
                <AddLink
                handleClose={setOpen_add}
                addnewLink={addaLink}
                b_id={params.location.state.Board_info._id}
                >
                </AddLink>
            )
        } 
    }

    function delete_item(item,index){
        let newArray=[...myLinks]

        var fdata = new FormData();

        fdata.append("position",index);

        // fdata.append("url",myLinks[index].url);
        // for (var value of fdata.values()) {
        //     console.log(value);
        //  }

        
        console.log("HELLO");

        deleteLink(params.location.state.Board_info._id,fdata)
        newArray.splice(index, 1);
        setmyLinks(newArray)
    }

    function open_Dialog(index){
        setChecked(true)
        setmyIndex(index)
    }

    function close_dialog(){
        setChecked(false)
    }

    function show_Modul(){
        if(Checked===true){
            return(
                <EditLink
                index={myIndex}
                item={myLinks[myIndex]}
                b_id={params.location.state.Board_info._id}
                index={myIndex}
                changeItem={make_the_change}
                close_dialog={close_dialog}
                ></EditLink>
            )
        }
        
    }

    function handle_editlink(index,item){
        if (params.location.state.private==="True"){
            return(
                <div>
                    <Button onClick={()=>{open_Dialog(index)}} endIcon={<SettingsIcon/>}>
                    
                    </Button>
                    
                    <Button onClick={()=>{setConfirmOpen(true) /*delete_item(item,index)*/}} endIcon={<DeleteIcon/>}>
                    
                    </Button>
                    <ConfirmDialog
                        title="Delete Post?"
                        open={ConfirmOpen}
                        setOpen={setConfirmOpen}
                        onConfirm={delete_item}
                        item={item}
                        index={index}
                    ></ConfirmDialog>
                </div>
                
            )
        }
    }

    function handle_edit(){
        if (params.location.state.private==="True"){
            return(
                <div>
                    <Button onClick={()=>{setOpen_add(true)}} style={{color: "white"}} endIcon={<AddIcon/>}>
                    Add new Link
                    </Button>
                    <Button onClick={()=>{setOpen_edit(true)}} style={{color: "white"}} endIcon={<SettingsIcon/>}>
                        Edit my Board
                    </Button>
                </div>
                
            )
        }
    }

    function p_color(item){
        if(item.is_public===true){
            return "green"
        }
        else{
            return "red"
        }
        
        
    }

    function show_rating(rate){
        console.log(rate)
        if(params.location.state.private!=="True"){
            if(rate===undefined || rate===null){
                return(
                    <div>
                        <Rating defaultValue={0} precision={0.5} readOnly/>
                        <Typography variant="h6" color="textSecondary" style={{display: 'inline-block'}}>
                            (0)
                        </Typography>
                    </div>
                    
                )
            }
            else{
                
                let sum=0;
                for(var board_rating of rate) {
                    sum = sum + parseFloat(board_rating.rating);
                }
                console.log(sum)
                console.log(rate.length)
                return(
                    <div>
                        <Rating defaultValue={sum/rate.length} precision={0.5} readOnly/>
                        <Typography variant="h6" color="textSecondary" style={{display: 'inline-block'}}>
                            ({rate.length})
                        </Typography>
                    </div>
                    
                )
            }
            
        }
    }

    return(
        <div >
            <Grid container>
                <Grid item xs={12} sm={2}>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Grid container>
                        <Grid item xs={12} sm={6}>
                            <Grid container>
                                <Grid item xs={'auto'} >
                                    <Typography className="text-white" variant="h4" align="left"><Box fontSize="1.8rem">{MyBoard.title}</Box></Typography>
                                </Grid>
                                <Grid item >
                                    {params.location.state.private==="True" ?
                                    <FiberManualRecordIcon style={{color:p_color(MyBoard)}}></FiberManualRecordIcon>
                                    :
                                    <div></div>}
                                    
                                </Grid>
                            </Grid>
                            
                        </Grid>
                        <Grid item xs={12} sm={6} align="right">
                            {handle_edit()}
                            {show_rating(MyBoard.ratings)}
                        </Grid>

                    </Grid>
                    <Grid container>
                        <Grid item  xs={12}>
                        <TextField 
                                style={{height:"auto",color:"white"}}
                                //id="standard-disabled"
                                value={MyBoard.comment}
                                fullWidth
                                label="Comment"
                                variant="outlined"
                                InputProps={{
                                    readOnly: true,
                                }}
                                />
                        </Grid>
                    </Grid>
                    {myLinks!==null ? 
                    <List className="p-3 mb-2 bg-light">
                    {myLinks.map((item,index)=>{
                        return(
                            <div key={index}>
                                
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <AccountCircleIcon fontSize='large' color='inherit'></AccountCircleIcon>
                                    </ListItemAvatar>
                                    <Grid container>
                                        <Grid item xs={10}>
                                            <ListItemText
                                            primary={
                                                <a href={item.url} rel="noopener noreferrer" target="_blank" style={{display: "table-cell"}}>{item.url}</a>
                                                
                                            }
                                            secondary={
                                                <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    color="textPrimary"
                                                >
                                                {item.comment}
                                                </Typography>
                                                {" "}
                                                </React.Fragment>
                                            }
                                            />
                                        </Grid>
                                        <Grid item xs={2} align="right">
                                                {handle_editlink(index,item)}
                                            </Grid>
                                    </Grid>
                                    {show_Modul(index,item)}
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </div>
                            
                        )
                    })}
                </List>
                    :<div></div>}
                    {params.location.state.follow==="True" ? 
                    <Rate_Me MyBoard={MyBoard}></Rate_Me>
                    :
                    <div></div>
                    }
                    
                    
                    {handle_show_ed()}
                    {handle_show_add()}
                </Grid>
                <Grid item xs={12} sm={2}>
                </Grid>
            </Grid>
            
        </div>
    )
};
