const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI);
    console.log("success");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = { connectDB };
