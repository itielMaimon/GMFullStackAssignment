const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const fs = require("fs").promises;
const Ride = require("./models/ride");

const metadata = "./db/metadata.json";
const gps_coordinates = "./db/gps_coordinates.json";

const initialRides = [];
const initialCoordinates = [];

const metadataStore = {
  async read() {
    try {
      await fs.access(metadata);
      this.rides = JSON.parse((await fs.readFile(metadata)).toString());
    } catch (e) {
      this.rides = initialRides;
    }

    return this.rides;
  },

  async getIndexById(id) {
    try {
      const rides = await this.read();
      return rides.findIndex((ride) => ride.id === +id);
    } catch (e) {
      console.log(e);
    }
  },

  async getNextRideId() {
    let maxId = 0;
    const rides = await this.read();
    rides.forEach((ride) => {
      if (ride.id > maxId) maxId = ride.id;
    });
    return maxId + 1;
  },

  rides: [],
};

const coordinatesStore = {
  async read() {
    try {
      await fs.access(gps_coordinates);
      this.coordinates = JSON.parse(
        (await fs.readFile(gps_coordinates)).toString()
      );
    } catch (e) {
      this.coordinates = initialCoordinates;
    }

    return this.coordinates;
  },

  coordinates: [],
};

router.get("/", (req, res) => {
  res.send("Server is up and running");
});

router.get("/rides", async (req, res) => {
  res.json(await metadataStore.read());
});

router.get("/coordinates/:id", async (req, res) => {
  // Usually we'd use req.params.id to get matched coors.
  // However, in this assignment, the same coors match all ids.

  // Default max speed and fps values.
  const maxSpeed = 110;
  const fps = 100;

  // Calculate the distance between two coors in meters.
  const metersPerCoor = maxSpeed / 3.6 / fps;
  console.log(metersPerCoor);

  // Calculate the coors delta; How many coors should be returned by vehicle velocity and fps.
  let coorsDelta = 1;

  // Get a coordinate for every 2 meters.
  if (metersPerCoor < 2) {
    coorsDelta = Math.round(2 / metersPerCoor);
  }
  console.log(coorsDelta);

  const coordinates = await coordinatesStore.read();
  const reducedCoordinates = [];

  // Avoiding using filter because we don't want to loop over all the elements.
  // We instead access the coors directly with a for loop.
  for (i = 0; i < coordinates.length; i = i + coorsDelta) {
    reducedCoordinates.push(coordinates[i]);
  }

  res.json(reducedCoordinates);
});

module.exports = router;
