import React, { useState, useEffect } from 'react';
import UserHome from './User_Home/User_Home.js';
import { useAuth } from '../../../contexts/AuthContext.js';
import { getBoards, getFollowedBoards } from '../../../api';
/**
 *
 */
export default function Home(){

    // const data = [
    //     { BoardsName: 'Cooking' ,Comment:"Δεν μαγειρεύω καλά",rating:4, public:true },
    //     { BoardsName: 'Pc' ,Comment:"Θέλω να φτιάξω PC",rating:4.5 ,public:true},
    //     { BoardsName: 'Rock Songs' ,Comment:"Ωραίες plalist για rock",rating:1 ,public:true},
    //     { BoardsName: 'Java basic' ,Comment:"Για να μάθω java",rating:4 ,public:true},
    // ];

    
    const { isLoggedIn } = useAuth();

    const [ MyBoard, setMyBoard ] = useState(null);
    const [ FollowedBoard, setFollowedBoard ] = useState(null);

    useEffect(() => {
        getBoards().then(function(value) {
            if(value!==undefined){
                console.log(value.owning); // "Success"
                setMyBoard(value.owning)
            }
            
          }, function(value) {
            
            // not called
          });
    },[])

    useEffect(() => {
        getFollowedBoards().then(function(value) {
            console.log(value); // "Success"
            setFollowedBoard(value.following)
          }, function(value) {
            
            // not called
          });

    },[])
    

    return (
        <div>
            <h4 className="pt-5 text-white text-center">
                Welcome to the <em>Scratch Book</em> !
            </h4>
            {(isLoggedIn() && MyBoard!==null)? (
                <div>
                    <UserHome boards={MyBoard} changeBoards={setMyBoard} private="True" ></UserHome>
                    { FollowedBoard!==null? (
                        <div>
                            <UserHome boards={FollowedBoard} changeBoards={setFollowedBoard} private="False" unfollow="True" rate="True"></UserHome>
                        </div>
                    ):(
                        <div>
                                                
                        </div>
                    )}
                </div>
            ):(
                <div>
                                        
                </div>
            )}
        </div>
        
    );
    
};
