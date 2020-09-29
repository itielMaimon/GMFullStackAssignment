const fs = require("fs").promises;
const metadata = "././db/metadata.json";

const initialRides = [];

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
  rides: [],
};

const getRides = async () => await metadataStore.read();

module.exports = { getRides };
