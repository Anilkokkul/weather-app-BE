const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.registerUser = async (req, res) => {
  try {
    const payload = req.body;
    const userExist = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });
    if (userExist) {
      return res
        .status(400)
        .send({ message: "User already exist with the given Email Id" });
    }
    const hashedPassword = bcrypt.hashSync(payload.password, 10);
    const newUser = await prisma.user.create({
      data: {
        email: payload.email,
        password: hashedPassword,
      },
    });
    res
      .status(201)
      .send({ message: "User Registered Successfully", data: newUser });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!userExist) {
      return res
        .status(404)
        .send({ message: "User does not exist with given email" });
    }
    const isMatch = bcrypt.compareSync(password, userExist.password);
    if (isMatch) {
      const token = jwt.sign({ userId: userExist.id }, process.env.SECRET_KEY);
      res.cookie("accessToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        expires: new Date(Date.now() + 86400000),
      });
      res.status(200).send({ message: "Login Successful", token: token });
    } else {
      return res.status(400).send({ message: "Invalid Password" });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      error: error.message,
    });
  }
};
