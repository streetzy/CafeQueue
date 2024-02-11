import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { getLocation } from "./endpoints/getLocation.js";
import { getLocations } from "./endpoints/getLocations.js";
import { addLocation } from "./endpoints/addLocation.js";
import { deleteLocation } from "./endpoints/deleteLocation.js";
import { getLocationOrders } from "./endpoints/getLocationOrders.js";
import { getLocationOrder } from "./endpoints/getLocationOrder.js";
import { addLocationOrder } from "./endpoints/addLocationOrder.js";
import { deleteLocationOrder } from "./endpoints/deleteLocationOrder.js";
import { Database } from "./databaseTypes.js";
import { patchLocationOrder } from "./endpoints/patchLocationOrder.js";

const app = express();

const database: Database = { locations: [] };

// SOME endpoints (listed below this comment) were not used, but they'll be kept just in case for future-proofing (even though I will probably never touch this project again ;)
// Said endpoints are:
// GET /locations/:locationID
// GET /locations/:locationID/orders
// GET /locations/:locationID/orders/:orderID

//ENDPOINTS:
// GET /locations
// GET /locations/:locationID
// ADD /locations
// DELETE /locations/:locationID
// GET /locations/:locationID/orders
// GET /locations/:locationID/orders/:orderID
// ADD /locations/:locationID/orders
// PATCH /locations/:locationID/orders/:orderID     only occurs if an order is prepared
// DELETE /locations/:locationID/orders/:orderID
// editing locations makes no sense, so it's not going to be implemented
// editing DESCRIPTIONS of orders makes no sense, so it's not going to be implemented

app.use(
  cors({
    //one for backend 8080, one for frontend 3000
    origin: ["http://localhost:8080/", "http://localhost:3000"],
  })
);
app.use(bodyParser.text());

// Each endpoint leads to its own script/function, some (as described above) are unused; however, but could be implemented
// in the future.

app.get("/locations", (req, res) => getLocations(req, res, database));
app.get("/locations/:locationName", (req, res) =>
  getLocation(req, res, database)
);
app.post("/locations", (req, res) => addLocation(req, res, database));
app.delete("/locations/:locationName", (req, res) =>
  deleteLocation(req, res, database)
);

app.get("/locations/:locationName/orders", (req, res) =>
  getLocationOrders(req, res, database)
);
app.get("locations/:locationName/orders/:orderID", (req, res) =>
  getLocationOrder(req, res, database)
);
app.post("/locations/:locationName/orders", (req, res) =>
  addLocationOrder(req, res, database)
);
app.patch("/locations/:locationName/orders/:orderID", (req, res) =>
  patchLocationOrder(req, res, database)
);

app.delete("/locations/:locationName/orders/:orderID", (req, res) =>
  deleteLocationOrder(req, res, database)
);

app.listen(8080, () => {
  console.log("Backend is running");
});
