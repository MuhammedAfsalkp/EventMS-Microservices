import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Home from './users/pages/Home'
import Event from './events/pages/Event';
import AddEvent from './events/pages/AddEvent';
import OrderedEvent from './orders/pages/OrderedEvent';
import AgentOrders from './orders/pages/AgentOrders';
import Auth from './users/pages/Auth';
import Details from './events/pages/Details';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
import { EventContext } from './shared/context/event-context';
import { useAuth } from './shared/hooks/auth-hook';
import { useEvent } from './shared/hooks/event-hook';
import UpdateEvent from './events/pages/UpdateEvent';
import DetailsByAgent from './events/pages/DetailsByAgent';
// import { useHttpClient } from './shared/hooks/http-hook';
// import { useState,useEffect,useContext } from 'react'
// import {useAuth} from './shared'
// import Card from './shared/components/UIElements/Card';
// import ErrorModal from './shared/components/UIElements/ErrorModal';
// import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';

const App = () => {
  console.log("app")


const { role, login, logout, currentUser,isLoggedIn, authMode,entry,isMax,setMax} = useAuth();
 const { details,eventId,setId,setDetails} = useEvent();

  console.log("in app uuser",currentUser)
  // useEffect(()=>{
  //   console.log("effect")-

  //   async function fetchApi(){


  //     const responseData = await sendRequest(
  //       'http://localhost:4000/api/users/currentuser',
  //       'GET',null,
  //       {
  //         'Content-Type': 'application/json'
  //       },
        
  //     );
  //     console.log("resp",responseData)
  //     setInit(false)
  //     setCurrentUser(responseData.currentUser);

  //   }
  //   fetchApi()
    
   

  // },[])



  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/events" exact>
          <Event />
          </Route>
          <Route path="/:eventId/details" exact>
          <Details />
          </Route>
          <Route path="/event/agent/:agentId/details" exact>
          <DetailsByAgent />
          </Route>
         < Route path="/events/new" exact>
          <AddEvent />
          </Route>
          < Route path="/orders" exact>
          <OrderedEvent />
          </Route>
          <Route path="/events/:eventId">
          <UpdateEvent />
        </Route>
          < Route path="/agent/orders" exact>
          <AgentOrders />
          </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        // token: token,
        currentUser,
        role,
        entry:entry,
        login: login,
        isMax:isMax,
        setMax: setMax,
        logout: logout,
        authMode:authMode
      }}
    >
      <EventContext.Provider
      value={{
        details:details,
        eventId:eventId,
        setId:setId,
        setDetails:setDetails
        
      }}
    >
      
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
      </EventContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;


//isMax updation correctly reflecting on front end-set in currentUser
