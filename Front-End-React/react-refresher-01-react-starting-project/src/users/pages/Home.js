// import React, { useEffect, useState } from 'react';


// import ErrorModal from '../../shared/components/UIElements/ErrorModal';
// import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
// import { useHttpClient } from '../../shared/hooks/http-hook';

// const Users = () => {
//   const { isLoading, error, sendRequest, clearError } = useHttpClient();
//   const [loadedUsers, setLoadedUsers] = useState();

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const responseData = await sendRequest(
//           'http://localhost:5000/api/users'
//         );

//         setLoadedUsers(responseData.users);
//       } catch (err) {}
//     };
//     fetchUsers();
//   }, [sendRequest]);

//   return (
//     <React.Fragment>
//       <ErrorModal error={error} onClear={clearError} />
//       {isLoading && (
//         <div className="center">
//           <LoadingSpinner />
//         </div>
//       )}
//       {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
//     </React.Fragment>
//   );
// };

// export default Users;


import React from "react";
import {useState,useEffect} from 'react'
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { useContext } from "react";
import Card from "../../shared/components/UIElements/Card";
import { Link } from "react-router-dom";
import  { Button } from '../../shared/components/FormElements/Button'
import LoginCard from "../components/LoginCard";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import './Home.css'
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import agnetImg from './img/Agent.jfif'
import useImg from './img/user.jfif'
// import homeImg from './img/Home.jpg'
const Home = ()=>{
   const auth = useContext(AuthContext)
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
  //  const [currentUser, setCurrentUser] = useState(null);
 const {login,isMax} =auth;
 console.log("in home isMax",isMax,auth)

  useEffect(() => {
    console.log("effect Home...................")
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          'http://localhost:4000/api/users/currentuser','GET',null,
            {
            'Content-Type': 'application/json'
          }
          
        )
        console.log("resp",responseData)
        if(responseData.currentUser){
        login({...responseData.currentUser},isMax)
        }

        // setCurrentUser(responseData.currentUser);
        
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest,login]);
  
    return (
      <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && (
          <div className="center">
            <LoadingSpinner />
          </div>
        )}
        {!isLoading && auth.currentUser &&
         <div className="home">
        <center><h1>WELCOME TO EVENTMS</h1></center>
        {/* <h2>{auth.currentUser.userName}</h2> */}
        <center> <h2>{auth.currentUser.role}</h2></center>
        </div>}

        {!isLoading && !auth.currentUser && <ul className="auth-list">
              
              <LoginCard
                role='agent'
                image={agnetImg}
                name='Agent Login'    
              />
              
              <LoginCard
                role='user'
                image={useImg}
                name='User Login'         
              />
          </ul> }
      </React.Fragment>
    );


}

export default Home;