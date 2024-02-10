import { Request, Response } from "express";
import { Database } from "../databaseTypes.js";

export function addLocation(
  req: Request<{ locationID: string }>,
  res: Response,
  database: Database
) {}
