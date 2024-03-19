import { NextFunction, Request, Response } from "express";
import admin from "firebase-admin";
import { AppError } from "../../../errors/AppErrors";

export async function googleAuthentication(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const bearertoken = request.headers.authorization;

  if (!bearertoken) {
    throw new AppError("no value identified in authorization token", 401);
  }

  const [, token] = bearertoken.split(" ");

  if (!token) {
    throw new AppError("Invalid token", 401);
  }

  try {
    const result = await admin.auth().verifyIdToken(token);

    const idgoogle = result.uid;

    request.user = {
      id: idgoogle,
    };

    next();
  } catch (e) {
    if (e.code === "auth/id-token-expired") {
      throw new AppError("tokenexpired", 401);
    } else {
      throw new AppError("Authentication error.", 401);
    }
  }
}
