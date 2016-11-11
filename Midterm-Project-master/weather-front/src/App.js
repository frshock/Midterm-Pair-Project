import React, {Component} from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {

  constructor(){
    super();
    this.state = {
      weatherList: [{temp: 20,
                     condition: 'Clear',
                     icon: '10d'
    }],
      submissionText: '',
      currentCity: 'Toronto',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e){
    e.preventDefault(); //This holds the temperature response this time we're making a post request to update the data.
    const weatherArray = [];
    axios.post('http://localhost:8888/'+this.state.submissionText).then((res) => {
      for(let i=0; i<res.data.length; i++){
            weatherArray.push(res.data[i]); //Pushing all the temperatures into a temp array.
      }
      console.log(weatherArray)
    }).then((res)=>
      this.setState({
        weatherList: weatherArray,
        currentCity: this.state.submissionText
      }))
  }

  handleChange(e){
    this.setState({
      submissionText: e.target.value,
      
    })
  }

 

  componentDidMount(){
    const weatherArray = [];
    axios.get('http://localhost:8888').then((res) => {
      for(let i=0; i<res.data.length; i++){
            weatherArray.push(res.data[i]); //Pushing all the temperatures into a temp array.
      }
    }).then((res)=>
      this.setState({
        weatherList: weatherArray  //resetting our state to reflect the API response
      }))
  }
    //In our render we're mapping the current state of the weatherList to our bars.

  render() {
    const temp = this.state.weatherList;    
    let iconTemp = this.state.weatherList[0].icon;
    let currentCondition = this.state.weatherList[0].condition;
    let currentIcon = "http://openweathermap.org/img/w/"+{iconTemp}+".png";
    
    return (

      <div className="App">
      <div className="header"><h1>WEATHER FORECAST</h1></div>
      <div className="city-details">
      <h2 >{this.state.currentCity.toUpperCase()}</h2>
      <h3> Expect {this.state.weatherList[0].condition} </h3><img src={"http://openweathermap.org/img/w/"+iconTemp+".png"} /></div>

        <form className="search" type="input" onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Search by City" onChange={this.handleChange} />
        </form>

        <div className="container">
          <div className="chart-container">
            <div className="chart-divider"> 
            <span className="testZero">0C</span>
            {temp.map((weather, i) => {
                let style = {

                  bottom: weather.temp*5,
                  width: ((1140/temp.length)-5),
                  left: i*(1140/temp.length),
                  backgroundImage: 'url('+'http://openweathermap.org/img/w/'+weather.icon+'.png'+')'
                }
                return(
                  <div className="bar" style={style} >
                      <span className="label">{weather.temp}</span>
                  </div>
                )

              })
            }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
