import React, { useContext, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
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
  text-align:center;
  border-radius:8px;
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

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState("none");
  const [flag, setFlag] = useState(false);

  const token = localStorage.getItem("token");

  const Submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        url: "https://backend-django.herokuapp.com/api/login/",
        method: "POST",
        data: {
          username: username,
          password: password,
        },
      });
      localStorage.setItem("token", response.data.token);
      setFlag(true);
    } catch (error) {
      setUsername("");
      setPassword("");
      setOpen("block");
    }
  };

  const redirect = () => {
    if (flag || token !== "") return <Redirect to="/dashboard" />;
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
      </FormContainer>
      <Alert style={{display:open}}>
        <Span
          onClick={() => setOpen("none")}
        >
          &times;
        </Span>
        Your Username and Password combination is <strong>Not Valid</strong>
      </Alert>
      <Marginer direction="vertical" margin={10} />
      <MutedLink >Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={Submit}>
        Sign in
      </SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink >Don't have an account? </MutedLink>
      <BoldLink  onClick={switchToSignup}>
        Sign up
      </BoldLink>
    </BoxContainer>
  );
}
