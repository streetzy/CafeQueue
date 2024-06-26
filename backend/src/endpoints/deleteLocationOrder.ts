import { Request, Response } from "express";
import { Database } from "../databaseTypes.js";

export function deleteLocationOrder(
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

  if (!requestedOrder.isPrepared)
    return res.status(404).send("Invalid order id");

  // Takes the index of the restaurant location we are given, then goes through the orders of that location
  // and removes the requested order.
  database.locations[
    database.locations.indexOf(restaurantLocation)
  ].orders.splice(restaurantLocation.orders.indexOf(requestedOrder), 1);

  res.status(200).send("OK");
}
