import React, { useState } from 'react';
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
import { Link,useHistory } from 'react-router-dom';
import Edit_Boards from './Edit_Boards.js';
import EditLink from './EditLink.js';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import zIndex from '@material-ui/core/styles/zIndex';


export default function ListInfo(params) {
    const links = [
        { LinkName: 'https://akispetretzikis.com/el/' ,Comment:"Δεν μαγειρεύω καλά",rating:4 },
        { LinkName: 'www.Argyro' ,Comment:"Θέλω να φτιάξω PC",rating:4.5 },
        { LinkName: 'www.Syntages' ,Comment:"Ωραίες plalist για rock",rating:1 },
        { LinkName: 'www.Moysakas' ,Comment:"Για να μάθω java",rating:4 },
    ];

    const [ Open_edit, setOpen_edit ] = useState(false);
    const [ Open_edit_link, setOpen_edit_link ] = useState(false);
    const [ myLinks, setmyLinks ] = useState(links);
    const [ MyBoard, setMyBoard ] = useState(params.location.state.Board_info);
    const [ Checked, setChecked ] = useState(false);
    const [ myIndex, setmyIndex ] = useState(0);

    function make_the_change(index,link,comment){
        let newArray=[...myLinks]
        newArray[index]["LinkName"]=link
        newArray[index]["Comment"]=comment
        setmyLinks(newArray)
    }

    function handle_show_ed(){
        if (Open_edit===true){
            return(
                <Edit_Boards
                handleClose={setOpen_edit}
                data={myLinks}
                changeData={setmyLinks}
                Board_info={MyBoard}
                changeBoard={setMyBoard}
                >
                </Edit_Boards>
            )
        } 
    }

    function delete_item(index){
        let newArray=[...myLinks]
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
                    
                    <Button onClick={()=>{delete_item(index)}} endIcon={<DeleteIcon/>}>
                    
                    </Button>
                </div>
                
            )
        }
    }

    function handle_edit(){
        if (params.location.state.private==="True"){
            return(
                <Button onClick={()=>{setOpen_edit(true)}} style={{color: "white"}} endIcon={<SettingsIcon/>}>
                    Edit my Board
                </Button>
            )
        }
    }

    console.log("list_info")
    console.log(myLinks)
    return(
        <div >
            <Grid container>
                <Grid item xs={12} sm={2}>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Grid container>
                        <Grid item item xs={12} sm={6}>
                            <Typography className="text-white" variant="h4" align="left"><Box fontSize="1.8rem">{MyBoard.BoardsName}</Box></Typography>
                        </Grid>
                        <Grid item item xs={12} sm={6} align="right">
                            {handle_edit()}
                        </Grid>

                    </Grid>
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
                                                    <a href={item.LinkName} target="_blank" style={{display: "table-cell"}}>{item.LinkName}</a>
                                                    
                                                }
                                                secondary={
                                                    <React.Fragment>
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        color="textPrimary"
                                                    >
                                                    {item.Comment}
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
                    {handle_show_ed()}
                </Grid>
                <Grid item xs={12} sm={2}>
                </Grid>
            </Grid>
            
        </div>
    )
};
