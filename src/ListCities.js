import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/database";
import firebaseConfig from "./firebase.config";
import sortBy from "sort-by";
import nanoId from "nano-id";
import InputCity from "./InputCity";

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

class ListCities extends Component {
  state = {
    isConnected: false,
    database: [],
    sortBy: "city",
    cityColor: "black",
  };

  constructor(props) {
    super(props);
    this.handleColorChange = this.handleColorChange.bind(this);
  }

  componentDidMount = async () => {
    firebase
      .database()
      .ref()
      .on("value", (snapshot) => {
        let citieslist = [];
        snapshot.forEach((snap) => {
          citieslist.push(snap.val());
        });
        this.setState({ database: citieslist });
      });
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.state.database === nextState.database) {
  //     return false;
  //   }
  //   return true;
  // }

  updateSorting = (selector) => {
    this.setState({ sortBy: selector });
  };

  addCity = async (city) => {
    if (city.cityName && city.cityState && city.cityZip) {
      try {
        const id = nanoId(15);
        const data = {
          id: id,
          city: city.cityName,
          state: city.cityState,
          zip: city.cityZip,
          color: this.state.cityColor,
          time: new Date().toLocaleString(),
        };
        const joinedData = this.state.database.concat(data);
        await firebase.database().ref(id).set(data);

        this.setState({
          database: joinedData,
          cityColor: "black",
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  removeCity = (cityId) => {
    firebase.database().ref(cityId).remove();
  };

  handleColorChange(color) {
    console.log(color.hex);
    this.setState({ cityColor: color.hex });
  }

  render() {
    let list;
    if (this.state.database.length !== 0) {
      list = this.state.database.sort(sortBy(this.state.sortBy)).map((data) => {
        return (
          <City database={data} key={data.id} onRemove={this.removeCity} />
        );
      });
    } else {
      list = (
        <li className="city-item">
          Database is empty. Add a new city in th form above.
        </li>
      );
    }
    return (
      <div className="cities">
        <ul className="cities-list">
          <InputCity
            onAddCity={this.addCity}
            handleColorChange={this.handleColorChange}
            color={this.state.cityColor}
          />

          <Options
            num={this.state.database.length}
            onSelectSort={this.updateSorting}
          />

          {list}
        </ul>
      </div>
    );
  }
}

class Options extends Component {
  onSelectSort = (event) => {
    if (this.props.onSelectSort) {
      this.props.onSelectSort(event.target.value);
    }
  };

  render() {
    return (
      <li className="options-item">
        <h4>
          {"We have " +
            this.props.num +
            `${this.props.num > 1 ? " cities" : " city"}`}
        </h4>

        <div className="sorting">
          <span>
            <i className="fas fa-sort-amount-down"></i>
            <p>Sort by </p>
          </span>
          <input
            type="radio"
            id="city"
            name="sort-filter"
            value="city"
            onClick={this.onSelectSort}
            defaultChecked
          />
          <label htmlFor="city">City</label>

          <input
            type="radio"
            id="state"
            name="sort-filter"
            value="state"
            onClick={this.onSelectSort}
          />
          <label htmlFor="state">State</label>

          <input
            type="radio"
            id="time"
            name="sort-filter"
            value="-time"
            onClick={this.onSelectSort}
          />
          <label htmlFor="time">Date Added</label>
        </div>
      </li>
    );
  }
}

class City extends Component {
  render() {
    const data = this.props.database;
    return (
      <li className="city-item" style={{ color: `${data.color}` }}>
        <h3>{data.city}</h3>
        <p>{"State: " + data.state}</p>
        <p>{"Zip code: " + data.zip}</p>
        <button
          className="remove-city-item"
          onClick={() => {
            this.props.onRemove(data.id);
          }}
        >
          Remove
        </button>
      </li>
    );
  }
}

export default ListCities;
