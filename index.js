const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const favoriteRoutes = require("./routes/favorite.routes");
const authRoutes = require("./routes/auth.routes");
const weatherRoutes = require("./routes/weather.routes");
require("dotenv").config();
const app = express();
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:5173"],
  credentials: true,
};
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(authRoutes);
app.use("/weather", weatherRoutes);
app.use(favoriteRoutes);
const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => [
  console.log(`Server is running on port http://localhost:${port}`),
]);
