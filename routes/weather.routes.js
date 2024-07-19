const express = require("express");
const {
  getCurrentWeather,
  getForecast,
  getHistorical,
} = require("../controllers/weather.controller");

const router = express.Router();

//getting current weather route
router.get("/current", getCurrentWeather);

//get forecast for 7 days
router.get("/forecast", getForecast);

//get 7 days historical weather
router.get("/historical", getHistorical);

module.exports = router;
