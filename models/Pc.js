const mongoose = require("mongoose");

const PcSchema = new mongoose.Schema(
  {
    number: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
    },
    run: { type: Boolean },
  },
  { timestamps: true }
);

const Pc = mongoose.model("Pc", PcSchema);
module.exports = Pc;
