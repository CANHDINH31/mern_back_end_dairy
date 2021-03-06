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
const pcRoute = require("./routes/pcRoute");
const adminRoute = require("./routes/adminRoute");
const billRoute = require("./routes/billRoute");

const { errorHandler } = require("./middlewares/errorsHandler");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/pc", pcRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/bill", billRoute);

app.all("*", (req, res, next) => {
  const err = new Error("the route cannot be found");
  err.statusCode = 404;
  next(err);
});
app.use(errorHandler);

const port = process.env.PORT || 6000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
