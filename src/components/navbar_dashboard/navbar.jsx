import React from "react";
import logo from "../../assets/img/leaves.png" 
import Navbar from "reactjs-navbar";
import { useHistory } from 'react-router-dom';

import {
  faBorderAll,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
 
import "reactjs-navbar/dist/index.css";
import "../../assets/css/navbar_dashboard.css";


export default function App() {

    let history = useHistory();
  
    const redirect_dashboard = () => {
      history.push('/dashboard')
    }

    const redirect_logout = () => {
      localStorage.setItem('token','');
      history.push('/login');
    }
    return (
      <Navbar
        logo={logo}
        helpCallback={() => {
          alert("duhh bro ... not yet implemented");
        }}
        menuItems={[
          {
            title: "Dashboard",
            icon: faBorderAll,
            isAuth: true,
            onClick:() => redirect_dashboard()
          },
          {
            title: "LogOut",
            icon: faSignOutAlt,
            isAuth: true,
            onClick:() => redirect_logout()
          },
        ]}
      />
    );
}