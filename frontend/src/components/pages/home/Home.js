import React from 'react';
import User_Home from './User_Home/User_Home.js';
import { useAuth } from '../../../contexts/AuthContext.js';
import { Link, useHistory } from 'react-router-dom';
/**
 *
 */
export default function Home(){

    const data = [
        { BoardsName: 'Cooking' ,Comment:"Δεν μαγειρεύω καλά",rating:4, public:true },
        { BoardsName: 'Pc' ,Comment:"Θέλω να φτιάξω PC",rating:4.5 ,public:true},
        { BoardsName: 'Rock Songs' ,Comment:"Ωραίες plalist για rock",rating:1 ,public:true},
        { BoardsName: 'Java basic' ,Comment:"Για να μάθω java",rating:4 ,public:true},
    ];

    const { isLoggedIn } = useAuth();

    return (
        <div>
            <h4 className="pt-5 text-white text-center">
                Welcome to the <em>Scratch Book</em> !
            </h4>
            {isLoggedIn() ? (
                <div>
                    <User_Home boards={data} private="True" ></User_Home>
                    <User_Home boards={data} private="False" ></User_Home>
                </div>
            ):(
                <div>
                                        
                </div>
            )}
        </div>
        
    );
    
};
