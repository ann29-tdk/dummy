const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.set("view engine", "ejs");

app.get("/", function(request, response) {
  response.sendFile(__dirname + "/index.html");
});

let moviePlot="";
let movieName="";

app.post("/", function(request, response) {
  console.log(request.body.movieName);
  const name = request.body.movieName;
  const apiKey = "2f5a1cac";
  const url = "https://www.omdbapi.com/?apikey=" + apiKey + "&t=" + name;

  https.get(url, function(result) {

    // console.log(result);
    console.log(result.statusCode);

    let chunks = "";
    result.on("data", function(chunk) {
      chunks += chunk;

    });

    result.on("end", function() {
      console.log(chunks);

      movieData = JSON.parse(chunks);
      moviePlot = movieData.Plot;
      movieName = movieData.Title;

      // RENDER FUNCTION
      response.render("list",
      {
        listMovie:movieName,
        listDescription:moviePlot
      });
      //END OF RENDER FUNCTION

      console.log(moviePlot);
      // response.write("<h1>The weather is currently "+ moviePlot + "</h1>" );
      // response.write("<p>The temperature is currently "+ movieDirector + "</p>" );
      // response.send();

    });

  });

});

app.post("/back", function(req, res){res.redirect("/");});

app.listen(3000, function() {
  console.log("Server is running at port 3000.");
});
