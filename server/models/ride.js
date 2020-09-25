const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RideSchema = new Schema({
  date: { type: Date, required: true },
  location: { type: String, required: true },
  vehicle_name: { type: String, required: true },
  scenario_name: { type: String, required: true },
  objective: { type: String, required: true },
  weather: { type: String, required: true },
  lightning_conditions: { type: String, required: true },
  road_conditions: { type: String, required: true },
});

module.exports = Ride = mongoose.model("rides", RideSchema);
