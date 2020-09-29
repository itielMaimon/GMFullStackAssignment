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

const getCoordinates = async (id) => {
  // Usually we'd use id to get matched coors.
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

  return reducedCoordinates;
};

module.exports = { getCoordinates };
