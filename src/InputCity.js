import React, { Component } from "react";
import serializeForm from "form-serialize";
import { GithubPicker } from "react-color";

class InputCity extends Component {
  state = {
    inputDefault: "",
  };

  addCity = (event) => {
    event.preventDefault();
    const values = serializeForm(event.target, { hash: true });
    if (this.props.onAddCity) {
      if (values.cityName && values.cityState && values.cityZip) {
        this.props.onAddCity(values);
        Array.from(document.querySelectorAll("input")).forEach(
          (input) => (input.value = "")
        );
      }
    }
  };

  render() {
    return (
      <>
        <li className="add-city-item">
          <h3>Add a city</h3>

          <form onSubmit={this.addCity} className="add-city-details">
            <input
              type="text"
              placeholder="City name"
              id="add-city-name"
              name="cityName"
              ref="cityInput"
              style={{ color: `${this.props.color}` }}
            />
            <input
              type="text"
              placeholder="State"
              id="add-city-state"
              name="cityState"
              ref="cityInput"
              style={{ color: `${this.props.color}` }}
            />
            <input
              type="number"
              placeholder="Zip code"
              id="add-city-zip"
              name="cityZip"
              ref="cityInput"
              style={{ color: `${this.props.color}` }}
            />

            <button type="submit" name="add-city" style={{ cursor: "pointer" }}>
              Submit
            </button>
          </form>
        </li>
        <GithubPicker
          className="color-pick"
          onChangeComplete={this.props.handleColorChange}
        />
      </>
    );
  }
}

export default InputCity;
