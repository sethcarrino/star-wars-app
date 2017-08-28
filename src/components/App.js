import React, {Component} from 'react';
import '../styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    // bind event handlers
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //set state inside of constructor
    this.state = {
      vehicles: [],
      name: '',
      pilot: ''
    };
  }

  //handle input changes
  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  // sets what happens after form is submitted
  handleSubmit(event) {
    // prevent early submission
    event.preventDefault();
    // use state
    this.setState(
      {
        pilot: this.state.name,
        name: ''
      }
    )
  }


  // fetch data and set state of vehicles
  componentDidMount() {
    fetch('https://swapi.co/api/vehicles/')
    .then((response) => {
      return response.json()
  })
    .then((data) => {
      let vehicles = data.results;
      console.log(vehicles);
      this.setState({
        vehicles:vehicles
      })
    })
  }

  render() {
    let vehicleList = this.state.vehicles;
    let vehicles = vehicleList.map((vehicles) => {
      return (
        <div key={vehicles.name}>
          <div>
            <h3>Vehicle: {vehicles.name}</h3>
            <h4>Model: {vehicles.model}</h4>
            <div>
              <div>
                <h4>Specs</h4>
                <ul>
                  <li>Manufacturer: {vehicles.manufacturer}</li>
                  <li>Class: {vehicles.vehicle_class}</li>
                  <li>passengers: {vehicles.passengers}</li>
                  <li>Crew: {vehicles.crew}</li>
                  <li>Length: {vehicles.length}</li>
                  <li>Max Speed: {vehicles.max_atsmospering_speed}</li>
                  <li>Cargo Capacity: {vehicles.cargo_capacity}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
    })

    return (
      <div className="App">
      <div>
        <div>
          <div>
            <h1>Star Wars</h1> <hr/> <p> The Vehicles of Star Wars </p>
          </div>
          <div>
            <div>
              <h2>What is your name, pilot?</h2>
              <form onSubmit={this.handleSubmit}>
                <div>
                  <input id="name" onChange={this.handleNameChange} name="name" type="text" value={this.state.name} placeholder="Enter your name"/>
                </div>
                <button type="submit">Submit</button>
              </form>
              <h1>{this.state.pilot}</h1>
            </div>
          </div>
          <div>
            {vehicles}
          </div>
        </div>
      </div>
      </div>
    )
  }
}

export default App;
