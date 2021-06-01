import React, { useState }  from 'react';
import UserHome from '../home/User_Home/User_Home.js';
import { useAuth } from '../../../contexts/AuthContext.js';




export default function Search_Results(params) {
    // const data = [
    //     { BoardsName: 'Cooking' ,Comment:"Δεν μαγειρεύω καλά",rating:4, public:true },
    //     { BoardsName: 'Pc' ,Comment:"Θέλω να φτιάξω PC",rating:4.5 ,public:true},
    //     { BoardsName: 'Rock Songs' ,Comment:"Ωραίες plalist για rock",rating:1 ,public:true},
    //     { BoardsName: 'Java basic' ,Comment:"Για να μάθω java",rating:4 ,public:true},
    // ];

    const [ ResultBoard, setResultBoard ] = useState(params.location.state.search_results);

    
    

    // useEffect(() => {
       
    //     getSearchResults(params.location.state.search_word).then(function(value) {
    //         console.log("HELLO")
    //         if(value!==undefined){
    //             console.log(value); // "Success"
    //             setResultBoard(value)
    //         }
            
    //       }, function(value) {
            
    //         // not called
    //       });
    // },[])

    console.log(params.location.state.search_results)
    const { isLoggedIn } = useAuth();
    return (
        <div>
            <h4 className="pt-5 text-white text-center">
                Search Results for <em>{params.location.state.search_word}</em> !
            </h4>
            {(isLoggedIn() && ResultBoard!==null) ? (
                <div>
                    <UserHome boards={ResultBoard} private="False" follow="True"/>
                </div>
            ):(
                <div>
                                        
                </div>
            )}
        </div>
        
    );
};
