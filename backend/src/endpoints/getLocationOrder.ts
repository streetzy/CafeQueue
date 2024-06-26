import { Request, Response } from "express";
import { Database } from "../databaseTypes.js";

export function getLocationOrder(
  req: Request<{ locationName: string; orderID: string }>,
  res: Response,
  database: Database
) {
  const restaurantLocation = database.locations.find(
    (location) => location.name === req.params.locationName
  );
  if (restaurantLocation == undefined) {
    return res.status(404).send("Invalid location");
  }

  const requestedOrder = restaurantLocation.orders.find(
    (order) => order.id == +req.params.orderID
  );
  if (requestedOrder == undefined)
    return res.status(404).send("Invalid order id");

  res.send(requestedOrder);
}
