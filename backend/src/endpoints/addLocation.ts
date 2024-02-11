import { Request, Response } from "express";
import { Database, RestaurantLocation } from "../databaseTypes.js";

export function addLocation(req: Request, res: Response, database: Database) {
  const data: RestaurantLocation = {
    id: idGenerator(database),
    name: req.body,
    orders: [],
  };
  database.locations.push(data);
  res.status(200).send("OK");
}

// Purpose of this is so that there are no duplicate IDs.
function idGenerator(db: Database) {
  if (db.locations.length === 0) return 1;
  return db.locations[db.locations.length - 1].id + 1;
}
