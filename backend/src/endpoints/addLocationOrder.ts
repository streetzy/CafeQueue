import { Request, Response } from "express";
import { Database, Order } from "../databaseTypes.js";

export function addLocationOrder(
  req: Request<{ locationName: string }>,
  res: Response,
  database: Database
) {
  const parsedBody = JSON.parse(req.body);

  const restaurantLocation = database.locations.find(
    (location) => location.name === req.params.locationName
  );
  if (restaurantLocation == undefined) {
    return res.status(404).send("Invalid location");
  }

  const data: Order = {
    id: idGenerator(restaurantLocation.orders),
    description: parsedBody[0],
    isPrepared: parsedBody[1],
  };
  restaurantLocation.orders.push(data);
  res.status(200).send("OK");
}

// Under the assumption that a location won't accumulate a 100 orders and not fulfill any
// of them so that there wouldn't be duplicates.
function idGenerator(orderArray: Order[]) {
  if (orderArray.length > 100) return 1;
  return orderArray.length + 1;
}
