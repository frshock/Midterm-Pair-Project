import React, {Component} from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {

  constructor(){
    super();
    this.state = {
      weatherList: [],
      submissionText: '',
      cityName:"Toronto"

    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    const parsedArray = []; //This holds the temperature response this time we're making a post request to update the data.
    axios.post('http://localhost:8888/'+this.state.submissionText).then((res) => {
      for(let i=0; i<res.data.length; i++){
          if(i%2===0){
            parsedArray.push(res.data[i].temp) //Pushing all the temperatures into a temp array.
          }
      }
    }).then((res)=>
      this.setState({
        weatherList: parsedArray, //resetting our state to reflect the API response
        cityName:this.state.submissionText

      }))
  }

  handleChange(e){
    this.setState({
      submissionText: e.target.value,
      
    })
  }

  componentWillMount(){
    const parsedArray = []; //This holds the temperature response
    axios.get('http://localhost:8888').then((res) => {
      for(let i=0; i<res.data.length; i++){
          if(i%2===0){
            parsedArray.push(res.data[i].temp) //Pushing all the temperatures into a temp array.
          }
      }
    }).then((res)=>
      this.setState({
        weatherList: parsedArray //resetting our state to reflect the API response
      }))
  }
    //In our render we're mapping the current state of the weatherList to our bars.

  render() {
    const temp = this.state.weatherList;
    return (

      <div className="App">
        <div className="header"><h1>WEATHER FORECAST</h1></div>
        <h2 className="city-details">{this.state.cityName.toUpperCase()}</h2>

        <form type="input" onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Search by City" onChange={this.handleChange} />
        </form>

        <div className="container">
          <div className="chart-container">
            <div className="chart-divider"> 
            <span className="testZero">0C</span>
            {temp.map((weather, i) => {
                let style = {
                  border: '1px solid #000000',
                  bottom: weather*5,
                  width: ((1140/temp.length)-7),
                  left: i*(1140/temp.length)
                }
                return(
                  <div className="bar" style={style} >
                      <span className="label">{weather}C</span>
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
