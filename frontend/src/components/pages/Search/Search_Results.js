import React from 'react';
import UserHome from '../home/User_Home/User_Home.js';
import { useAuth } from '../../../contexts/AuthContext.js';





export default function Search_Results(params) {
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
                Search Results for <em>{params.location.state.search_word}</em> !
            </h4>
            {isLoggedIn() ? (
                <div>
                    <UserHome boards={data} private="False" />
                </div>
            ):(
                <div>
                                        
                </div>
            )}
        </div>
        
    );
};
