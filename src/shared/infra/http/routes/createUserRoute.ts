import { Router } from "express";
import { CreateUserController } from "../../../../modules/users/useCases/CreateUser/CreateUserController";
import { googleAuthentication } from "../middlewares/googleAuthentication";

const createUserRoute = Router();

const createUserController = new CreateUserController();

createUserRoute.post("/", googleAuthentication, (request, response) => {
  return createUserController.handle(request, response);
});

export { createUserRoute };
