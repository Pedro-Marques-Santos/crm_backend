import { Router } from "express";
import { createUserRoute } from "./createUserRoute";
import { authenticationRoute } from "./authentication";
import { createCompanyRoute } from "./createCompanyRoute";
import { createEmploymentRoute } from "./createEmploymentRoute";
import { registerForJobUserRoute } from "./registerForJobUser.route";
import { listJobsRegisteredRoute } from "./listJobsRegisteredRoute";
import { listCreatedJobsRoute } from "./listCreatedJobsUseCase";
import { listParticipantsRoute } from "./listParticipantsRoute";
import { expirationEmploymentRoute } from "./expirationEmploymentRoute";
import { listAllEmploymentsRoute } from "./listAllEmploymentsRoute";
import { nextStepRoute } from "./nextStepRoute";
import { nextGroupStepRoute } from "./nextGroupStep";
import { downloadUsersPdfsRoute } from "./DownloadUsersPdfsRoute";
import { editCompanyNoImgRoute } from "./editCompanyRoute";
import { editImgCompanyRoute } from "./editImgCompanyRoute";
import { editEmploymentRoute } from "./editEmploymentRoute";
const routes = Router();

routes.use("/listAllEmployments", listAllEmploymentsRoute);
routes.use("/googleAuthentication", authenticationRoute);
routes.use("/createUser", createUserRoute);
routes.use("/createCompany", createCompanyRoute);
routes.use("/createEmployment", createEmploymentRoute);
routes.use("/registerforjobuser", registerForJobUserRoute);
routes.use("/listJobsRegistereduser", listJobsRegisteredRoute);
routes.use("/listJobsCreatedcompany", listCreatedJobsRoute);
routes.use("/listParticipantsEmployment", listParticipantsRoute);
routes.use("/expirationEmployment", expirationEmploymentRoute);
routes.use("/nextStep", nextStepRoute);
routes.use("/nextGroupStep", nextGroupStepRoute);
routes.use("/downloadPdfs", downloadUsersPdfsRoute);
routes.use("/editCompany", editCompanyNoImgRoute);
routes.use("/editImgCompany", editImgCompanyRoute);
routes.use("/editEmployment", editEmploymentRoute);

export { routes };
