import { Request, Response } from "express";
import { Database } from "../databaseTypes.js";

export function getLocations(req: Request, res: Response, database: Database) {
  const restaurantLocations = database.locations;

  res.json(restaurantLocations);
}
