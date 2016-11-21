import React, {Component} from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      weatherList: [
        {
          temp: 20,
          condition: 'Clear',
          icon: '10d'
        }
      ],
      submissionText: '',
      currentCity: 'Toronto',
      currentTime:"",
      currentMax: 0,
      currentMin: 0,
      currentHum: 0,
      currentWind: 0
    }
    this.handleSubmit = this
      .handleSubmit
      .bind(this);
    this.handleChange = this
      .handleChange
      .bind(this);
    this.handleClick = this
      .handleClick
      .bind(this);
  }

  handleSubmit(e) {
    e.preventDefault(); //This holds the temperature response this time we're making a post request to update the data.
    const weatherArray = [];
    axios
      .post('http://localhost:8888/' + this.state.submissionText)
      .then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          weatherArray.push(res.data[i]); //Pushing all the temperatures into a temp array.
        }
        console.log(weatherArray)
      })
      .then((res) => this.setState({weatherList: weatherArray, currentCity: this.state.submissionText}))
  }

  handleChange(e) {
    this.setState({submissionText: e.target.value})
  }
  handleClick(i) {
    this.setState({currentMax: this.state.weatherList[i].maxTemp, currentMin: this.state.weatherList[i].minTemp, currentHum: this.state.weatherList[i].humidity, currentWind: this.state.weatherList[i].windSpeed,currentTime:this.state.weatherList[i].currentTime})
  }

  componentDidMount() {
    const weatherArray = [];
    axios
      .get('http://localhost:8888')
      .then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          weatherArray.push(res.data[i]); //Pushing all the temperatures into a temp array.
        }
      })
      .then((res) => this.setState({
        weatherList: weatherArray //resetting our state to reflect the API response
      }))
  }
  //In our render we're mapping the current state of the weatherList to our bars.

  render() {
    const temp = this.state.weatherList;
    let iconTemp = this.state.weatherList[0].icon;
    let currentCondition = this.state.weatherList[0].condition;
    let currentIcon = "http://openweathermap.org/img/w/" + {
      iconTemp
    } + ".png";

    return (

      <div className="App">
        <div className="header">
          <h1>WEATHER FORECAST</h1>
        </div>
        <div className="container">

          <div className="city-details">
            <h2 >{this
                .state
                .currentCity
                .toUpperCase()}</h2>
            <h3>
              Expect {this.state.weatherList[0].condition}
            </h3><img
              className="mainicon"
              src={"http://openweathermap.org/img/w/" + iconTemp + ".png"}/></div>

          <div className="detail-weather">
            <p>CURRENT TIME:{this.state.currentTime}GMT</p>
            <p>MAX TEMP: {this.state.currentMax}</p>
            <p>MIN TEMP: {this.state.currentMin}</p>
            <p>HUMIDITY: {this.state.currentHum}</p>
            <p>WIND SPEED: {this.state.currentWind}</p>
          </div>

          <form className="search" type="input" onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Search by City" onChange={this.handleChange}/>
          </form>

          <div className="chart-container">

            {temp.map((weather, i) => {
              let style = {

                bottom: 250 + (weather.temp * 5),
                width: ((1140 / temp.length) - 5),
                left: i*(1140 / temp.length),
                backgroundImage: 'url(http://openweathermap.org/img/w/' + weather.icon + '.png)'
              }
              return (
                <div className="bar" style={style} onClick={()=>{this.handleClick(i)}}>
                  <span className="label">{weather.temp}</span>
                </div>
              )

            })
}
            <div className="chart-divider">
              <span className="testZero">0C</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

// ** R E V I E W ** —>

// I like your idea of displaying an extended, detailed forecast, rather than just one temperature 
// for one day as you often see. I like how you used the API icons to see weather conditions at a glance, 
// as well as the hover effect over specific times. I actually used this app a few times to get a sense 
// of what the weekend would bring. :)

// Overall your code is very straightforward and well organized. This is a good core project from which you
// could build on if you wanted. Functionally there is little to improve on, though there are a few minor 
// things I wanted to point out to improve your understanding:


// In componentDidMount and handleSubmit(), you have two .then() statements chained together. However, for loops 
// run synchronously, so you only need one .then(). Unless you are performing aysnchronous HTTP or database 
// requests inside the body of the for loop, you do not need a promise to work with a for loop. 
// If you remove one .then() statement, the function will work exactly the same.


// One feature that would have been good to see would be clear markings where a new day starts.
// This could be accomplished by finding if the currentTime property contains "00:00:00".


// The indentation/formatting overall is very strong, with a few things that could be fixed.
// In handleClick, the object keys in setState should be on separate lines for readability; i.e. :

//    this.setState({currentMax: this.state.weatherList[i].maxTemp, 
//                   currentMin: this.state.weatherList[i].minTemp, 
//                   currentHum: this.state.weatherList[i].humidity, ... etc.

// As well the <h3>, <img>, and </div> tags near line 94 could be separated a little better.

// Finally your CSS values are all measured using pixels. However using PX causes many headaches when trying
// to format responsiveness for an app. I definitely recommend reading up on relative CSS values such
// as %, vh, vw, and rem.

// -- Dan