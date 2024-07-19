const { default: axios } = require("axios");

const weatherApiKey = process.env.WEATHER_API_KEY;
exports.getCurrentWeather = async (req, res) => {
  try {
    const { city } = req.query;
    const api = `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${city}`;
    const response = await axios.get(api);
    res.status(200).send({
      message: "Weather fetched successfully",
      data: response.data,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getForecast = async (req, res) => {
  try {
    const { city } = req.query;
    const api = `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${city}&days=7`;
    const response = await axios.get(api);
    res.status(200).send({
      message: "Weather fetched successfully",
      data: response.data,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getHistorical = async (req, res) => {
  const { city } = req.query;
  let promises = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const formattedDate = date.toISOString().split("T")[0];
    promises.push(
      axios.get(
        `https://api.weatherapi.com/v1/history.json?key=${weatherApiKey}&q=${city}&dt=${formattedDate}`
      )
    );
  }
  try {
    const responses = await Promise.all(promises);
    const histoiricalData = responses.map((res) => res.data);
    res.status(200).send({
      message: "Weather fetched successfully",
      data: histoiricalData,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      error: error.message,
    });
  }
};
