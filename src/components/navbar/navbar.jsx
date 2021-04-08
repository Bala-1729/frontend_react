import React, { Component } from "react";
import logo from "../../assets/img/leaves.png" 
import Navbar from "reactjs-navbar";
import { useHistory } from 'react-router-dom';

import {
  faHome,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
 
import "reactjs-navbar/dist/index.css";
import "../../assets/css/navbar.css";
 
export default function App () {

  let history = useHistory();
  
  const redirect_home = () => {
    history.push('/home')
  }

  const redirect_login = () => {
    history.push('/login');
  }

    return (
      <Navbar
        logo={logo}
        helpCallback={() => {
          alert("I need help... and coffee...");
        }}
        menuItems={[
          {
            title: "Home",
            icon: faHome,
            isAuth: true,
            onClick:() => redirect_home()
          },
          {
            title: "Login",
            icon: faSignInAlt,
            isAuth: true,
            onClick:() => redirect_login()
          },
        ]}
      />
    );
}