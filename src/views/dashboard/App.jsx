import React from "react";
import styled from "styled-components";
import Navbar from "../../components/navbar_dashboard/navbar";
import Predict from "./sections/predict";
import bg from "../../assets/img/bg1.jpg";

const AppContainer = styled.div`
  background-image: url(${bg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: auto;
  background-attachment:fixed;
`;

export default class App extends React.Component {
  
  render() {
    return (
      <AppContainer>
        <Navbar />
        <Predict />
      </AppContainer>
    );
  }
}
