const express = require("express");
const cors = require("cors");
const router = require("./router");

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(router);

app.listen(PORT, () => console.log("Server is listening on port %d", PORT));
