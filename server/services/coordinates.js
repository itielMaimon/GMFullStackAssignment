const fs = require("fs").promises;
const gps_coordinates = "././db/gps_coordinates.json";

const initialCoordinates = [];

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

const calculateCoorsDelta = (velocity) => {
  const fps = 100;

  // Calculate the distance between two coors in meters.
  const metersPerCoor = velocity / 3.6 / fps;

  // Calculate the coors delta.
  // How many coors should be returned in order to maintain a continuous path on the map.
  let coorsDelta = 1;

  // Get a coordinate for every 2 meters.
  if (metersPerCoor < 2) {
    coorsDelta = Math.round(2 / metersPerCoor);
  }
  return coorsDelta;
};

const getCoordinates = async (id) => {
  // Usually we'd use id to get matched coors.
  // However, in this assignment, the same coors match all ids.

  // Default max speed (given in the assignment).
  const maxSpeed = 110;

  const coordinates = await coordinatesStore.read();
  const reducedCoordinates = [];

  let coorsDelta = 1;
  // Avoiding using filter because we don't want to loop over all the elements.
  // We instead access the coors directly with a for loop.
  for (i = 0; i < coordinates.length; i = i + coorsDelta) {
    // Get the coordinates delta for the current point in accordance with the current velocity.
    // Velocity should be available at coors.velocity, in this assignment, the velocity is constant at 110KMH.
    coorsDelta = calculateCoorsDelta(maxSpeed);
    reducedCoordinates.push(coordinates[i]);
  }

  return reducedCoordinates;
};

module.exports = { getCoordinates };
