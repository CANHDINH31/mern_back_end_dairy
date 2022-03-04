//dotenv -- phai khoi tao dau tien
require("dotenv").config();

//connect db
const { connectDB } = require("./configs/db");
connectDB();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const path = require("path");

const authRoute = require("./routes/authRoute");
const postRoute = require("./routes/postRoute");

const { errorHandler } = require("./middlewares/errorsHandler");

app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  next();
});

app.use(function (req, res, next) {
  res.header("Content-Type", "application/json;charset=UTF-8");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/posts", postRoute);

app.all("*", (req, res, next) => {
  const err = new Error("the route cannot be found");
  err.statusCode = 404;
  next(err);
});
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
