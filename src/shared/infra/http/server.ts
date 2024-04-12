import { NextFunction, Request, Response } from "express";
import "express-async-errors";
import "reflect-metadata";
import express from "express";

import "../../containers/index";

import { connectToDatabase } from "../../services/connectMongoDB";
import { routes } from "./routes";
import { AppError } from "../../errors/AppErrors";

import "../../services/connectFirebaseSDK";

connectToDatabase();

const app = express();

app.use(express.json());

app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: err.statusCode,
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  },
);

app.listen(9999, () => {
  console.log(process.env.PROJECT_NAME);
});
