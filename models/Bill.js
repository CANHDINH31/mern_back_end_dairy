const mongoose = require("mongoose");
const billSchema = new mongoose.Schema(
  {
    username: { type: String },
    pc: { type: String },
    product: { type: Array },
    proccess: { type: Boolean },
  },
  { timestamps: true }
);

const Bill = mongoose.model("Bill", billSchema);
module.exports = Bill;
