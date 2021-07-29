import React from 'react';
import { NavBar } from './styled';
import { NavLink } from 'react-router-dom';

function Navbar({ currentUser }) {
  return (
    <NavBar>
      <h1>{currentUser.username}</h1>
      <NavLink exact activeClassName='active' to='/'>
        Home
      </NavLink>
      <NavLink exact activeClassName='active' to='/items/new'>
        My Profile
      </NavLink>
      <NavLink exact activeClassName='active' to='/sign_up'>
        Sign up
      </NavLink>
      <NavLink exact activeClassName='active' to='/log_in'>
        Log in
      </NavLink>
    </NavBar>
  );
}

export default Navbar;
