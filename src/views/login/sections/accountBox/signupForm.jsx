import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
const Alert = styled.div`
  padding: 10px;
  background-color: #f44336;
  color: white;
  text-align: center;
  border-radius: 8px;
`;

const Span = styled.div`
  margin-left: 15px;
  color: white;
  font-weight: bold;
  float: right;
  font-size: 22px;
  line-height: 20px;
  cursor: pointer;
  transition: 0.3s;
`;

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [open, setOpen] = useState("none");
  const [open1, setOpen1] = useState("none");
  const [flag, setFlag] = useState(false);
  const token = localStorage.getItem("token");
  const Submit = async (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      setOpen1("block");
      setConfirmPassword("");
      setPassword("")
      return;
    }
    try {
      const response = await axios({
        url: "https://backend-django.herokuapp.com/api/register/",
        method: "POST",
        data: {
          username: username,
          email: username + "@farming.com",
          password: password,
        },
      });
      localStorage.setItem("token", response.data.token);
      setFlag(true);
    } catch (error) {
      setUsername("");
      setOpen("block");
    }
  };

  const redirect = () => {
    if (flag || token !== "") return <Redirect to="/register_device" />;
  };
  return (
    <BoxContainer>
      {redirect()}
      <FormContainer>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(exe) => setUsername(exe.target.value)}
        />
        <br />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(exe) => setPassword(exe.target.value)}
        />
        <br />
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(exe) => setConfirmPassword(exe.target.value)}
        />
        <br />
      </FormContainer>
      <Alert style={{ display: open }}>
        <Span onClick={() => setOpen("none")}>&times;</Span>
        Username already exists
      </Alert>
      <Alert style={{ display: open1 }}>
        <Span onClick={() => setOpen1("none")}>&times;</Span>
        Password didn't match
      </Alert>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit" onClick={Submit}>
        Signup
      </SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink>Already have an account?</MutedLink>
      <BoldLink onClick={switchToSignin}>Sign in</BoldLink>
      <br />
    </BoxContainer>
  );
}
