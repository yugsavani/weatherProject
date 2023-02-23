const express = require("express");
const https = require("https");


const app=express();

app.get("/" , function(req,res){

    const url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=554921579f76f06a4fa9b840070933dc&units=metric"
    https.get(url , function(response){
        console.log(response.statusCode);

        response.on("data" , function(data){
            const weatherdata=JSON.parse(data);
            const temp=weatherdata.main.temp;
            const weather=weatherdata.wind.speed;
            console.log(temp);
            console.log(weather);
        })
    });
    res.send("The port is live");
})




app.listen(3000, function(){
    console.log("the server is working on port 3000");
});