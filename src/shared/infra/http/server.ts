import { NextFunction, Request, Response } from "express";
import "express-async-errors";
import "reflect-metadata";
import express from "express";

import "../../containers/index";

import admin from "firebase-admin";
import { connectToDatabase } from "../../services";
import { routes } from "./routes";
import { AppError } from "../../errors/AppErrors";

var serviceAccount = require("../../../../firebase.json");

connectToDatabase();

const app = express();

app.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

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
