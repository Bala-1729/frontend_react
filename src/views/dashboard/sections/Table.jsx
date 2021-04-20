import React from "react";
import styled from "styled-components";
import MaterialTable from "material-table";
import axios from "axios";

const Div = styled.div`
  width: 70%;
  margin: auto;
  @media (max-width: 768px) {
    width: 100%;
    margin: auto;
  }
`;

let token = localStorage.getItem("token");

export default class PatientTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
    };
    this.Load = this.Load.bind(this);
  }

  column = [
    { title: "Id", field: "id", align: "center" },
    { title: "Temperature", field: "temp", align: "center" },
    { title: "Humidity", field: "humidity", align: "center" },
    { title: "PH Value", field: "ph_value", align: "center" },
    { title: "Moisture", field: "moisture", align: "center" },
    { title: "Crop Predicted", field: "crop", align: "center" },
    { title: "Nitrogen", field: "n", align: "center" },
    { title: "Phosphorus", field: "p", align: "center" },
    { title: "Potassium", field: "k", align: "center" },
  ];

  Load() {
    axios({
      url: "https://backend-django.herokuapp.com/history/",
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => {
        console.log(response);
        this.setState({ rows: response.data.CropsHistory });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    this.Load();
  }

  render() {
    token = localStorage.getItem("token");
    return (
      <Div>
        <MaterialTable
          title="Crop Prediction History"
          style={{ borderRadius: "10px" }}
          columns={this.column}
          data={this.state.rows}
          options={{
            exportButton: true,
            search: true,
            headerStyle: {
              color: "white",
              background: "linear-gradient(60deg, #00b0e0, #3490de)",
              boxShadow:
                "0 12px 20px -10px rgba(52, 144, 222, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.6), 0 7px 10px -5px rgba(52, 144, 222, 0.5)",
            },
            rowStyle: {
              backgroundColor: "#EEE",
            },
          }}
        />
      </Div>
    );
  }
}
