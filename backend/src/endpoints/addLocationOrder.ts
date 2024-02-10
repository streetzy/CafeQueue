import { Request, Response } from "express";
import { Database } from "../databaseTypes.js";

export function addLocationOrder(
  req: Request<{ locationID: string; orderID: string }>,
  res: Response,
  database: Database
) {}
