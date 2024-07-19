const jwt = require("jsonwebtoken");

exports.authorizationToken = (req, res, next) => {
  const cookies = req.cookies;
  if (cookies.accessToken) {
    const obj = jwt.verify(cookies.accessToken, process.env.SECRET_KEY);
    // console.log("obj:::", obj);
    if (!obj.userId) {
      res.status(401).json({ message: "Unauthorized user" });
    }
    req.userId = obj.userId;
    return next();
  }
  res.status(401).send({
    message: "Not Authenticated need to login",
  });
};
