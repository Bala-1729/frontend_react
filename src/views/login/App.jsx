import "./App.module.css";
import styled from "styled-components";
import { AccountBox } from "./sections/accountBox";
import bg from "../../assets/img/login_bg.jpg";
import Navbar from "../../components/navbar/navbar";

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

function App() {
  return (
    <>
      <Navbar />
      <AppContainer>
        <AccountBox />
      </AppContainer>
    </>
  );
}

export default App;
