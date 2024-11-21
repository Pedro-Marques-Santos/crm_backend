import { Router } from "express";

import { googleAuthentication } from "../middlewares/googleAuthentication";
import { ListCreatedJobsExpiredController } from "../../../../modules/companies/useCases/ListCreatedJobsExpired/ListCreatedJobsExpiredController";

const listCreatedJobsExpiredRoute = Router();

const listCreatedJobsExpiredController = new ListCreatedJobsExpiredController();

listCreatedJobsExpiredRoute.get(
  "/",
  googleAuthentication,
  (request, response) => {
    return listCreatedJobsExpiredController.handle(request, response);
  },
);

export { listCreatedJobsExpiredRoute };
