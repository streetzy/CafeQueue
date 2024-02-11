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

//ENDPOINTS:
// GET /locations
// GET /locations/:locationID
// ADD /locations/:locationID
// DELETE /locations/:locationID
// GET /locations/:locationID/orders
// GET /locations/:locationID/orders/:orderID
// ADD /locations/:locationID/orders/:orderID
// PATCH /locations/:locationID/orders/:orderID     only occurs if an order is prepared
// DELETE /locations/:locationID/orders/:orderID
// editing locations makes no sense, so it's not going to be implemented

app.use(cors());
app.use(bodyParser.text());

app.get("/locations", (req, res) => getLocations(req, res, database));
app.get("/locations/:locationID", (req, res) =>
  getLocation(req, res, database)
);
app.post("/locations/:locationID", (req, res) =>
  addLocation(req, res, database)
);
app.delete("/locations/:locationID", (req, res) =>
  deleteLocation(req, res, database)
);

app.get("/locations/:locationID/orders", (req, res) =>
  getLocationOrders(req, res, database)
);
app.get("locations/:locationID/orders/:orderID", (req, res) =>
  getLocationOrder(req, res, database)
);
app.post("/locations/:locationID/orders/:orderID", (req, res) =>
  addLocationOrder(req, res, database)
);
app.patch("/locations/:locationID/orders/:orderID", (req, res) =>
  patchLocationOrder(req, res, database)
);

app.delete("/locations/:locationID/orders/:orderID", (req, res) =>
  deleteLocationOrder(req, res, database)
);

app.listen(8000, () => {
  console.log("Backend is running");
});
