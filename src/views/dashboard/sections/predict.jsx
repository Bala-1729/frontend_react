import React from "react";
import "../../../assets/css/predict.css";
import styled from "styled-components";
import Results from "./results";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Table from "./Table";

const Input = styled.input`
  width: 35%;
  height: 42px;
  outline: none;
  border: 1px solid rgba(200, 200, 200, 0.3);
  padding: 0px 10px;
  border-bottom: 1.4px solid transparent;
  transition: all 200ms ease-in-out;
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
  @media (max-width: 768px) {
    width: 100%;
  }
  margin-left:3px;
`;

const SubmitButton = styled.button`
  width: 40%;
  padding: 11px;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  border: none;
  border-radius: 30px;
  text-align: center;
  cursor: pointer;
  transition: all, 240ms ease-in-out;
  background: linear-gradient(75deg, #00b0e0, #3490de);
  &:hover {
    filter: brightness(1.03);
  }
`;

const Div = styled.div`
  width: 50%;
  margin: auto;
  @media (max-width: 768px) {
    width: 100%;
    margin: auto;
  }
  display: inline-block;
  float: left;
`;
let token = localStorage.getItem("token");

export default class Predict extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: 29.73770045,
      humidity: 47.54885174,
      ph_value: 5.954626604,
      moisture: 90.09586854,
      display: "block",
      result_display: "none",
      float: "none",
      crop: "Mango",
      n: "",
      p: "",
      k: "",
      flag: false,
      submitbutton: false,
    };

    this.submitEvent = this.submitEvent.bind(this);
    this.onChangetemp = this.onChangetemp.bind(this);
    this.onChangehumidity = this.onChangehumidity.bind(this);
    this.onChangeph = this.onChangeph.bind(this);
    this.onChangemoisture = this.onChangemoisture.bind(this);
    this.onChangeN = this.onChangeN.bind(this);
    this.onChangeP = this.onChangeP.bind(this);
    this.onChangeK = this.onChangeK.bind(this);
    this.loadEvent = this.loadEvent.bind(this);
    this.sendNPK = this.sendNPK.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  submitEvent(event) {
    event.preventDefault();
    axios({
      url: "https://backend-django.herokuapp.com/predict/",
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
      },
      data: {
        temp: this.state.temp,
        humidity: this.state.humidity,
        ph_value: this.state.ph_value,
        moisture: this.state.moisture,
        n: this.state.n,
        p: this.state.p,
        k: this.state.k,
      },
    })
      .then((response) => {
        this.setState({ crop: response.data["crop"] });
        this.setState({
          display: "inline-block",
          float: "left",
          result_display: "inline-block",
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  sendNPK(event) {
    event.preventDefault();
    axios({
      url: "https://backend-django.herokuapp.com/npk-values/",
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
      },
      data: {
        n: this.state.n,
        p: this.state.p,
        k: this.state.k,
      },
    })
      .then((response) => {
        this.setState({
          n: "",
          p: "",
          k: "",
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  loadEvent(event) {
    event.preventDefault();
    axios({
      url: "https://backend-django.herokuapp.com/api/load-data/",
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => {
        this.setState({
          temp: response.data.values["temperature"],
          humidity: response.data.values["humidity"],
          ph_value: response.data.values["ph"],
          moisture: response.data.values["moisture"],
        });
        if (this.state.temp !== "please reload")
          this.setState({ submitbutton: false });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangetemp(event) {
    this.setState({ temp: event.target.value });
  }
  onChangehumidity(event) {
    this.setState({ humidity: event.target.value });
  }
  onChangeph(event) {
    this.setState({ ph_value: event.target.value });
  }
  onChangemoisture(event) {
    this.setState({ moisture: event.target.value });
  }
  onChangeN(event) {
    this.setState({ n: event.target.value });
  }
  onChangeP(event) {
    this.setState({ p: event.target.value });
  }
  onChangeK(event) {
    this.setState({ k: event.target.value });
  }
  redirect() {
    if (token === "") return <Redirect to="/login" />;
  }

  render() {
    token = localStorage.getItem("token");
    return (
      <>
        <Div style={{ display: this.state.display, float: this.state.float }}>
          {this.redirect()}
          <div className="header">Crop Prediction</div>
          <form className="body">
            <br />
            <label>Temperature: </label>
            <Input
              type="text"
              value={this.state.temp}
              onChange={this.onChangetemp}
              placeholder="Enter Temperature"
              required
            />
            <label style={{ marginLeft: "10px" }}>Nitrogen: </label>
            <Input
              type="text"
              value={this.state.n}
              onChange={this.onChangeN}
              placeholder="Enter value in ppm"
            />
            <br />
            <br />
            <label>Humidity: </label>
            <Input
              type="text"
              value={this.state.humidity}
              onChange={this.onChangehumidity}
              placeholder="Enter Humidity"
            />
            <label style={{ marginLeft: "10px" }}>Phosphorus: </label>
            <Input
              type="text"
              value={this.state.p}
              onChange={this.onChangeP}
              placeholder="Enter value in ppm"
            />
            <br />
            <br />
            <label>PH Value: </label>
            <Input
              type="text"
              value={this.state.ph_value}
              onChange={this.onChangeph}
              placeholder="Enter PH"
            />
            <label style={{ marginLeft: "10px" }}>Potassium: </label>
            <Input
              type="text"
              value={this.state.k}
              onChange={this.onChangeK}
              placeholder="Enter value in ppm"
            />
            <br />
            <br />
            <label>Moisture: </label>
            <Input
              type="text"
              value={this.state.moisture}
              onChange={this.onChangemoisture}
              placeholder="Enter Moisture"
            />
            <SubmitButton
              title="Send NPK values to control nutrient flow in the field"
              type="submit"
              onClick={this.sendNPK}
              style={{ marginLeft: "100px", width: "200px" }}
            >
              Send NPK
            </SubmitButton>
            <br />
            <br />
            <br />
            <SubmitButton
              title="Load data from your device"
              type="submit"
              onClick={this.loadEvent}
              style={{ marginRight: "30px" }}
            >
              Load Data
            </SubmitButton>
            <SubmitButton
              type="submit"
              onClick={this.submitEvent}
              disabled={this.state.submitbutton}
            >
              Predict Crop
            </SubmitButton>
          </form>
        </Div>
        <Results display={this.state.result_display} crop={this.state.crop} />
        <hr style={{ visibility: "hidden" }} />
        <Table />
      </>
    );
  }
}
