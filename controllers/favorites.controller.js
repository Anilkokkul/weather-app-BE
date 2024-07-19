const { PrismaClient } = require("@prisma/client");
const weatherApiKey = process.env.WEATHER_API_KEY;
const prisma = new PrismaClient();
const { default: axios } = require("axios");

exports.addToFavorite = async (req, res) => {
  try {
    const { city } = req.body;
    const userId = req.userId;
    // console.log("userIdd:::", userId);

    const alreadyAddedCity = await prisma.favorite.findFirst({
      where: {
        city: city,
        userId: userId,
      },
    });

    if (alreadyAddedCity) {
      return res.status(400).json({ message: "City already added" });
    }

    const favorite = await prisma.favorite.create({
      data: {
        city: city,
        userId: userId,
      },
    });
    res.status(200).send({
      status: "success",
      data: userId,
      city,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error while adding favorite city",
      error: error.message,
    });
  }
};

exports.getFavoriteCity = async (req, res) => {
  try {
    const userId = req.userId;

    const favorites = await prisma.favorite.findMany({
      where: {
        userId: userId,
      },
      select: {
        city: true,
      },
    });
    const weatherPromises = favorites.map((fav) => {
      return axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${fav.city}`
      );
    });
    const weatherData = await Promise.all(weatherPromises);
    const data = weatherData.map((res) => res.data);
    res.status(200).send({ status: "Weather fetched Successfully", data });
  } catch (error) {
    res.status(500).send({
      message: "Error while adding favorite city",
      error: error.message,
    });
  }
};
