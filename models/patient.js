const mongoose = require("mongoose");
var Schema = mongoose.Schema,
  autoIncrement = require("mongoose-plugin-autoinc");
year = new Date().getFullYear();

var schema = Schema({
  title: { type: String },
  name: { type: String },
  age: { type: Number },
  mobile: { type: Number },
  bgroup: { type: String },
  email: { type: String },
  address: { type: String },
  city: { type: String },
  pincode: { type: Number },
  referral: { type: String },
  channel: { type: String },
});

schema.plugin(autoIncrement.plugin, {
  model: "Patient",
  field: "PID",
  startAt: year * 10000 + 1,
  incrementBy: 1,
});

module.exports = mongoose.model("Patient", schema);
