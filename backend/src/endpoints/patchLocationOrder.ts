import { Request, Response } from "express";
import { Database } from "../databaseTypes.js";

export function patchLocationOrder(
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
  if (requestedOrder == undefined) {
    return res.status(404).send("Invalid order id");
  }

  // Goes thru database, takes the restaurant location in the locations arr, then takes the requested
  // order from the orders arr, and sets its prepared state to true.
  database.locations[database.locations.indexOf(restaurantLocation)].orders[
    restaurantLocation.orders.indexOf(requestedOrder)
  ].isPrepared = true;

  res.status(200).send("OK");
}
