import { Request, Response } from "express";
import { Database } from "../databaseTypes.js";

export function getLocationOrders(
  req: Request<{ locationName: string }>,
  res: Response,
  database: Database
) {
  const restaurantLocation = database.locations.find(
    (location) => location.name === req.params.locationName
  );
  if (restaurantLocation == undefined) {
    return res.status(404).send("Invalid location");
  }

  res.send(JSON.stringify(restaurantLocation.orders));
}
