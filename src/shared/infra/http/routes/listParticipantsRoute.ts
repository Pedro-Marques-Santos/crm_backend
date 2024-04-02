import { Router } from "express";
import { ListParticipantsController } from "../../../../modules/employment/useCases/ListParticipants/ListParticipantsController";
import { googleAuthentication } from "../middlewares/googleAuthentication";

const listParticipantsRoute = Router();

const listParticipantsController = new ListParticipantsController();

listParticipantsRoute.post("/", googleAuthentication, (request, response) => {
  return listParticipantsController.handle(request, response);
});

export { listParticipantsRoute };
