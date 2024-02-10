const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

app.listen(3000, () => {
  console.log("Backend running");
});
