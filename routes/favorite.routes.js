const express = require("express");
const { authorizationToken } = require("../utils/utils");
const {
  addToFavorite,
  getFavoriteCity,
} = require("../controllers/favorites.controller");

const router = express.Router();

//add favorite city route
router.post("/favorite", authorizationToken, addToFavorite);

//get favorites cities weather data route
router.get("/favorite", authorizationToken, getFavoriteCity);

module.exports = router;
