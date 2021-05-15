import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
/**
 *
 */
export default function SearchBar() {

   const[search_val,setSearch_val]=useState('');

    function submitSearch(e) {
        e.preventDefault()
        
        console.log(search_val)
    }


    return (
        <Grid container>
            <Grid item>
                <TextField label="Search" 
                variant="outlined" 
                onChange={(event)=>{
                    setSearch_val(event.target.value)}}/>
                    
            </Grid>
            <Grid item xs={2}>
                
            <IconButton className="w-100" onClick={submitSearch} fontSize='large' style={{color: "white"}}>
                <SearchIcon fontSize='large'/></IconButton>
          
            </Grid>
            
        
 
        </Grid>
        
    );
    
};
