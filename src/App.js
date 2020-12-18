// Imports
import React,  { useEffect, useState } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'

// CSS
import './App.css';

// Components
import Welcome from './components/Welcome'
import Navbar from './components/Navbar'
import { Component } from 'react';

const PrivateRoute = ({ component : Component, ...rest }) => {
  const user = localStorage.getItem('jwtToken');
  return <Route {...rest } render={(props) => {
    return user ? <Component { ...rest} { ...props} /> : <Redirect to='/login'/>
  }} />
  return 
}

function App() {
  // Set state values
  const [currentUser, setCurrentUser] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  useEffect(() => {
    let token;

    // If there is no token in localStorage then the user is not authenticated.
    if(!localStorage.getItem('jwtToken')) {
      setIsAuthenticated(false)
    } else {
      token = jwt_decode(localStorage.getItem('jwtToken'))
      setAuthToken(localStorage.jwtToken);
      currentUser(token)
    }
  },[]);

  const nowCurrentUser = (userData) => {
    console.log('nowCurrentUser is here...')
    setCurrentUser(userData);
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    if(localStorage.getItem('jwtToken')) {
      localStorage.removeItem('jwtToken');
      setCurrentUser(null)
      setIsAuthenticated(false)
    }
  }

  //<Navbar handleLogout={handleLogout} isAuth={isAuthenticated} />

  return (
    <div className="App">
      
      <Welcome />
    </div>
  );
}

export default App;
