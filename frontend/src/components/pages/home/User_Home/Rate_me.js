import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Rating from '@material-ui/lab/Rating';
import {getmyRating, setmyRating} from '../../../../api.js';


export default function Rate_me(params) {

    const [ MyRate, setMyRate ] = useState(0);

    console.log(params.MyBoard._id)

    useEffect(() => {getmyRating(params.MyBoard._id).then(function(value) {
            console.log(value); // "Success"
            setMyRate(parseFloat(value.rating))
          }, function(value) {
            
            // not called
          });

    },[])

    function setNewRate(newValue){
        setMyRate(newValue);
        var fdata = new FormData();
        fdata.append("rating",parseFloat(newValue));
        
        setmyRating(params.MyBoard._id,fdata);
    }
    
    return(
        <Grid container>
            <Grid item xs={6} align="right">
                <Typography variant="h5" className="text-white">
                    Rate this board:
                </Typography>
            </Grid>
            <Grid item xs={6} align="left">
                {
                    MyRate!==null && MyRate!==undefined?
                        <Rating name="myRate" value={MyRate}
                        onChange={(event, newValue) => {
                            event.preventDefault()
                            setNewRate(newValue)
                        }} precision={0.5} size="large" />
                    :
                    <div></div>
                }
                
            </Grid>
        </Grid>
    )
};
