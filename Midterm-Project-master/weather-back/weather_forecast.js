const express = require('express');
const request = require('request');
const app = express();
const PORT = 8888;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const APIKEY = "8bf7a26998ebdf6bf75544a7218a45f5";
const url = "http://api.openweathermap.org/data/2.5/forecast?APPID=" + APIKEY;

function getWeatherData(city,res,unit){
    request(url+"&q="+city+'&units='+(unit?unit:'metric'), (err, response, body)=> {
        if (!err && response.statusCode === 200){
            let test = JSON.parse(body);
            let parsedObj = [];
            for(let i=0; i<test.list.length; i++){
                parsedObj.push({
                    temp: test.list[i].main.temp,
                    condition: test.list[i].weather[0].main,
                    icon: test.list[i].weather[0].icon,
                    maxTemp:test.list[i].main.temp_max,
                    minTemp: test.list[i].main.temp_min,
                   humidity: test.list[i].main.humidity,
                   windSpeed: test.list[i].wind.speed,
                   currentTime:test.list[i].dt_txt
                }); //Pushing the weather obj to the array we send back.
            }
            res.json(parsedObj); //Sending back a JSON of the array we just populated.
        }
    })
}


app.get('/', (req, res) => {
    getWeatherData('toronto',res);
})


app.post('/:city', (req, res,units) => {
    getWeatherData(req.params.city,res,req.params.units);
})

app.listen(PORT, () => {
    console.log('servers up');
})
