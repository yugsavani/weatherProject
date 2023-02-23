const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    
    res.sendFile(__dirname + "/index.html");

})

app.post("/", function (req, res) {
    
    const query = req.body.cityName;
    const apiKey = "554921579f76f06a4fa9b840070933dc&units=metric"
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    https.get(url, function (response) {
        console.log(response.statusCode); //response tells if the port is getting the data from the url
        //if statuscode not written it will give full function result 
        response.on("data", function(data){   //response.on will give only the details from thr url about the weather only
            const weatherdata = JSON.parse(data);   //JSON.parse will give the data in a well written manner
            const temp = weatherdata.main.temp      //will give only the details about the temp which is in the main function
            const weatherdescription = weatherdata.weather[0].description //similar to above line
            const icon = weatherdata.weather[0].icon
            const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            // You can write like this -
            // res.send("<h1>The weather is currently " + weather + "<br/>" + "The temperature in london is :" + temp + " degree celsius</h1>");
            //or
            res.write("<h1>The temperature in "+query+" is :" + temp + " degree celsius</h1>");
            res.write("<p>The weather is currently " + weatherdescription + "</p>");
            res.write("<img src=" + imgURL + ">");
            res.send();
        })
    });
})






app.listen(3000, function () {
    console.log("Server is running on port 3000");
})  