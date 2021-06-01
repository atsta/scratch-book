import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from 'react-router-dom';
import {getSearchResults} from '../../../api.js';
/**
 *
 */
export default function SearchBar() {

    let history = useHistory();
   const[search_val,setSearch_val]=useState('');

    function submitSearch(e) {
        e.preventDefault()
        getSearchResults(search_val).then(function(value) {
            console.log("HELLO")
            // if(value!==undefined){
            //     console.log(value); // "Success"
            //     setResultBoard(value)
            // }
            history.push(
                {
                    pathname: '/search',
                    state:{
                        search_results:value,
                        search_word:search_val
                    }
                });
            
            }, function(value) {
            
            // not called
            });
        
        
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
