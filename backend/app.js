const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());

app.get("/api/v1/", (req, res) => {
  res.json();
});

app.listen(8000, () => {
  console.log("Backend running");
});
