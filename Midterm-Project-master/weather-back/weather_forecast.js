const express = require('express');
const request = require('request');
const axios = require('axios');
const app = express();
const PORT = 8888;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


const APIKEY = "8bf7a26998ebdf6bf75544a7218a45f5";

app.get('/', (req, res) => {
    let city = 'toronto';
    const url = "http://api.openweathermap.org/data/2.5/forecast?q="+ city +"&units=metric&APPID=" + APIKEY;
    request(url, (err, response, body)=> {
        if (!err && response.statusCode === 200){
            let test = JSON.parse(body);
            let parsedObj = [];
            for(let i=0; i<test.list.length; i++){
                    parsedObj.push(test.list[i].main); //Pushing the temperature data into the array we send back.
                    parsedObj.push(test.list[i].dt); //Pushing the UNIX time to the array we send back.
            }
            res.json(parsedObj); //Sending back a JSON of the array we just populated.
        }
    })
})


app.post('/:city', (req, res) => {
    let city = req.params.city; // this one's for updating the data to whatever the user wants.
    const url = "http://api.openweathermap.org/data/2.5/forecast?q="+ city +"&units=metric&APPID=" + APIKEY;
    request(url, (err, response, body)=> {
        if (!err && response.statusCode === 200){
            let test = JSON.parse(body);
            let parsedObj = [];
            for(let i=0; i<test.list.length; i++){
                    parsedObj.push(test.list[i].main); //Pushing the temperature data into the array we send back.
                    parsedObj.push(test.list[i].dt); //Pushing the UNIX time to the array we send back.
            }
            res.json(parsedObj); //Sending back a JSON of the array we just populated.
        }
    })
})

app.listen(PORT, () => {
    console.log('servers up');
})
