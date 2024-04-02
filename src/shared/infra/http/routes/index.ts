import { Router } from "express";
import { createUserRoute } from "./createUserRoute";
import { authenticationRoute } from "./authentication";
import { createCompanyRoute } from "./createCompanyRoute";
import { createEmploymentRoute } from "./createEmploymentRoute";
import { registerForJobUserRoute } from "./registerForJobUser.route";
import { listJobsRegisteredRoute } from "./listJobsRegisteredRoute";
import { listCreatedJobsRoute } from "./listCreatedJobsUseCase";
import { listParticipantsRoute } from "./listParticipantsRoute";
const routes = Router();

routes.use("/googleAuthentication", authenticationRoute);
routes.use("/createUser", createUserRoute);
routes.use("/createCompany", createCompanyRoute);
routes.use("/createEmployment", createEmploymentRoute);
routes.use("/registerforjobuser", registerForJobUserRoute);
routes.use("/listJobsRegistereduser", listJobsRegisteredRoute);
routes.use("/listJobsCreatedcompany", listCreatedJobsRoute);
routes.use("/listParticipantsEmployment", listParticipantsRoute);

export { routes };
