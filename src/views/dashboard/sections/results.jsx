import React from "react";
import styled from "styled-components";
import "../../../assets/css/results.css";
import wheat from "../../../assets/img/wheat.jpg";
import mungbean from "../../../assets/img/mungbean.jpg";
import Tea from "../../../assets/img/Tea.jpg";
import millet from "../../../assets/img/millet.jpg";
import maize from "../../../assets/img/maize.jpg";
import lentil from "../../../assets/img/lentil.jpg";
import jute from "../../../assets/img/jute.jpg";
import cofee from "../../../assets/img/cofee.jpg";
import cotton from "../../../assets/img/cotton.jpg";
import peas from "../../../assets/img/peas.jpg";
import rubber from "../../../assets/img/rubber.jpg";
import sugarcane from "../../../assets/img/sugarcane.jpg";
import tobacco from "../../../assets/img/tobacco.jpg";
import coconut from "../../../assets/img/coconut.jpg";
import blackgram from "../../../assets/img/blackgram.jpg";
import banana from "../../../assets/img/banana.jpg";
import grapes from "../../../assets/img/grapes.jpg";
import apple from "../../../assets/img/apple.jpg";
import mango from "../../../assets/img/mango.jpg";
import muskmelon from "../../../assets/img/muskmelon.jpg";
import orange from "../../../assets/img/orange.jpg";
import papaya from "../../../assets/img/papaya.jpg";
import watermelon from "../../../assets/img/watermelon.jpg";
import pomegranate from "../../../assets/img/pomegranate.jpg";
import ground_nut from "../../../assets/img/groundnut.jpg";
import kidney_beans from "../../../assets/img/kidneybeans.jpg";
import moth_beans from "../../../assets/img/mothbeans.jpg";
import adzuki_beans from "../../../assets/img/adzukibeans.jpg";
import pigeon_peas from "../../../assets/img/pigeonpeas.jpg";
import chick_peas from "../../../assets/img/chickpeas.jpg";
import rice from "../../../assets/img/rice.jpg";

const Div = styled.div`
  width: 50%;
  @media (max-width: 768px) {
    width: 100%;
  }
  float: left;
`;

const dict = {'rice':rice,'wheat':wheat,'Mung Bean':mungbean,'Tea':Tea,'millet':millet,'maize':maize,'Lentil':lentil,'Jute':jute,'Coffee':cofee,'Cotton':cotton,'Ground Nut':ground_nut,'peas':peas,'Rubber':rubber,'sugarcane':sugarcane,'tobacco':tobacco,'kidneybeans':kidney_beans,'mothbeans':moth_beans,'coconut':coconut,'blackgram':blackgram,'adzukibeans':adzuki_beans,'pigeonpeas':pigeon_peas,'chickpea':chick_peas,'banana':banana,'grapes':grapes,'apple':apple,'mango':mango,'muskmelon':muskmelon,'orange':orange,'papaya':papaya,'watermelon':watermelon,'pomegranate':pomegranate};

export default class Results extends React.Component {
  render() {
    return (
      <>
        <Div style={{ display: this.props.display }}>
          <div className="header1">Results</div>
          <div className="body1">
            <img src={dict[this.props.crop]} style={{ width: "320px" }} alt={dict[this.props.crop]}/>
            
            <p>
              Crop best suited for your field is{" "}
              <h1>{this.props.crop.toUpperCase()}</h1>
            </p>
            <p></p>
          </div>
        </Div>
      </>
    );
  }
}
