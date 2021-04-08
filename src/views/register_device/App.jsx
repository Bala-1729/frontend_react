import "./App.module.css";
import styled from "styled-components";
import bg from "../../assets/img/login_bg.jpg";
import Navbar from "../../components/navbar_dashboard/navbar";
import {
  BoxContainer,
  FormContainer,
  SubmitButton,
} from "../login/sections/accountBox/common";
import { useState } from "react";
import {Redirect} from "react-router-dom";
import axios from "axios";
import { useHistory } from 'react-router-dom';
const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(${bg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: auto;
`;

const Div = styled.div`
  width: 21%;
  padding: 20px;
  color: #fff;
  font-size: 18px;
  font-weight: 300;
  border: none;
  border-radius: 8px;
  transition: all, 240ms ease-in-out;
  background: linear-gradient(75deg, #00b0e0, #3490de);

  @media (max-width: 600px) {
    width: 90%;
  }
  &:hover {
    filter: brightness(1.03);
  }
`;

const Input = styled.input`
  width: 100%;
  height: 42px;
  outline: none;
  border: 1px solid rgba(200, 200, 200, 0.3);
  padding: 0px 10px;
  border-bottom: 1.4px solid transparent;
  font-size: 14px;
  box-shadow: 0px 0px 2.5px rgba(15, 15, 15, 0.19);
  border-radius:8px;

  &::placeholder {
    color: color: rgba(0, 0, 0, 0.5);
  }

  &:not(:last-of-type) {
    border-bottom: 1.5px solid rgba(200, 200, 200, 0.4);
  }

  &:focus {
    outline: none;
    border-bottom: 2px solid #00b0e0;
  }
`;

const Div1 = styled.div`
  width: 21%;
  @media (max-width: 600px) {
    width: 90%;
  }
`;

let token = localStorage.getItem("token");

function App() {
  const [deviceId, setDeviceId] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  token = localStorage.getItem("token");

  const Submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        url: "https://backend-django.herokuapp.com/api/register-device/",
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
        },
        data: {
          DeviceId: deviceId,
          PhoneNumber: mobileNumber
        },
      });
      redirect_dashboard();
    } catch (error) {
      console.log(error)
    }
  };

  let history = useHistory();
  
  const redirect_dashboard = () => {
    history.push('/dashboard')
  }

  return (
    <>
      <Navbar />
      <AppContainer>
        <Div>Register your Device for the first time</Div>
        <br />
        <br />
        <Div1>
          <Input
            type="text"
            placeholder="Device Id/Number"
            value={deviceId}
            onChange={(exe) => setDeviceId(exe.target.value)}
          /><br/><br/>
          <Input
            type="text"
            placeholder="Mobile Number"
            value={mobileNumber}
            onChange={(exe) => setMobileNumber(exe.target.value)}
          />
          <br />
          <br />
          <SubmitButton type="submit" onClick={Submit}>Continue</SubmitButton>
        </Div1>
      </AppContainer>
    </>
  );
}

export default App;
