if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const axios = require("axios");

app.use(function (req, res, next) {
  const allowedOrigins = [
    "http://localhost:3000",
    "https://gis-front-project.herokuapp.com",
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const GoogleAPI = axios.create({
  baseURL: "https://maps.googleapis.com/maps/api/",
});

app.get("/get_places", (req, res) => {
  const { input } = req.query;
  GoogleAPI.get("/place/findplacefromtext/json", {
    params: {
      input,
      inputtype: "textquery",
      fields: "photos,formatted_address,name,rating,opening_hours,geometry",
      key: process.env.APIKey,
    },
  })
    .then((response) => {
      res.send(response.data.candidates);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/:photoReference", (req, res) => {
  GoogleAPI.get("/place/photo", {
    params: {
      maxwidth: "400",
      maxheight: "400",
      photoreference: req.params.photoReference,
      key: process.env.APIKey,
    },
  })
    .then((response) => {
      res.send(response.request.res.responseUrl);
    })
    .catch((err) => {
      res.send("No image");
    });
});

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`GIS Project listening on port ${port}!`));
