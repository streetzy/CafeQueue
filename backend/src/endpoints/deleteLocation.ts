import { Request, Response } from "express";
import { Database } from "../databaseTypes.js";

export function deleteLocation(
  req: Request<{ locationID: string }>,
  res: Response,
  database: Database
) {}
