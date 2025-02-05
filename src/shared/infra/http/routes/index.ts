import { Router } from "express";
import { createUserRoute } from "./createUserRoute";
import { authenticationRoute } from "./authentication";
import { createCompanyRoute } from "./createCompanyRoute";
import { createEmploymentRoute } from "./createEmploymentRoute";
import { registerForJobUserRoute } from "./registerForJobUser.route";
import { listJobsRegisteredRoute } from "./listJobsRegisteredRoute";
import { listCreatedJobsRoute } from "./listCreatedJobsUseCase";
import { listParticipantsRoute } from "./listParticipantsRoute";
import { listAllEmploymentsRoute } from "./listAllEmploymentsRoute";
import { nextStepRoute } from "./nextStepRoute";
import { nextGroupStepRoute } from "./nextGroupStep";
import { downloadUsersPdfsRoute } from "./DownloadUsersPdfsRoute";
import { editCompanyNoImgRoute } from "./editCompanyRoute";
import { editImgCompanyRoute } from "./editImgCompanyRoute";
import { editEmploymentRoute } from "./editEmploymentRoute";
import { activeDateExpirationRoute } from "./activeDateExpirationRoute";
import { deleteEmploymentsExpirationsRoute } from "./deleteEmploymentsExpirationRoute";
import { listCreatedJobsExpiredRoute } from "./listCreatedJobsExpiredRoute";
import { recruiterSendEmailRoute } from "./recruiterSendEmailRoute";
import { processEmailRoute } from "./processEmailRoute";
import { recruiterSendNewStepEmailRoute } from "./recruiterSendNewStepEmailRoute";
import { reactiveEmploymentRoute } from "./reactiveEmploymentRoute";
import { editUserNoImgRoute } from "./editUserNoImgRoute";
import { editImgUserRoute } from "./editImgUserRoute";
import { editResumeRoute } from "./editResumeRoute";
import { SearchEmploymentRoute } from "./SearchEmploymentRoute";

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
routes.use("/nextStep", nextStepRoute);
routes.use("/nextGroupStep", nextGroupStepRoute);
routes.use("/downloadPdfs", downloadUsersPdfsRoute);
routes.use("/editCompany", editCompanyNoImgRoute);
routes.use("/editImgCompany", editImgCompanyRoute);
routes.use("/editImgUser", editImgUserRoute);
routes.use("/editEmployment", editEmploymentRoute);
routes.use("/activeDateExpiration", activeDateExpirationRoute);
routes.use("/deleteEmploymentsExpirations", deleteEmploymentsExpirationsRoute);
routes.use("/listCreatedJobsExpired", listCreatedJobsExpiredRoute);
routes.use("/recruiterSendEmail", recruiterSendEmailRoute);
routes.use("/processEmail", processEmailRoute);
routes.use("/recruiterSendMessagesNewStep", recruiterSendNewStepEmailRoute);
routes.use("/reactiveEmployment", reactiveEmploymentRoute);
routes.use("/editUser", editUserNoImgRoute);
routes.use("/editResume", editResumeRoute);
routes.use("/searchEmployment", SearchEmploymentRoute);

export { routes };
