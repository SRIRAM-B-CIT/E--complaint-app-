const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, required: true },
  area: { type: String, required: true },
  assignedAdmin: { type: String, default: "" },
  image: { type: String },
  response: { type: String, default: "" },   // ✅ Admin reply
  status: { type: String, default: "Pending" } // ✅ e.g. Pending / Resolved
}, {
  timestamps: true,
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
