import { Request, Response } from "express";
import { Database } from "../databaseTypes.js";

export function getLocationOrders(
  req: Request<{ locationID: string }>,
  res: Response,
  database: Database
) {}
