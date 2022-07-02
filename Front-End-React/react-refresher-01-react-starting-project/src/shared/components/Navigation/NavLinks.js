import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';
import { EventContext } from '../../context/event-context';
import './NavLinks.css';

const NavLinks = props => {
  const auth = useContext(AuthContext);
  const eve = useContext(EventContext);
  console.log("navlink",auth)

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          Home
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/events`} exact>Events</NavLink>
        </li>
      )}
       {auth.isLoggedIn && auth.role === 'user' && (
        <li>
          <NavLink to="/orders">Orders</NavLink>
        </li>
      )}
      {auth.isLoggedIn && eve.details &&  (
        <li>
          <NavLink to={`/${eve.eventId}/details`}>Details</NavLink>
        </li>
      )}
      {auth.isLoggedIn && auth.role === 'agent' && (
        <li>
          <NavLink to="/events/new" exact>Add Event</NavLink>
        </li>
      )}
      {auth.isLoggedIn && auth.role === 'agent' && (
        <li>
          <NavLink to="/agent/orders" exact>My Orders</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth" exact>AUTHENTICATE</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>LOGOUT</button>
        </li>
      )}
      
    </ul>
  );
};

export default NavLinks;
