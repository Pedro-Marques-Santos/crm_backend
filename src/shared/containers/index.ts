import { container } from "tsyringe";
import { IUserRepository } from "../../modules/users/repositories/implemantation/IUserRepository";
import { UserRepository } from "../../modules/users/repositories/UserRepository";
import { ICompanyRepository } from "../../modules/companies/repositories/implemantation/ICompanyRepository";
import { CompanyRepository } from "../../modules/companies/repositories/CompanyRepository";
import { IEmploymentRepository } from "../../modules/employment/repositories/implamentarion/IEmploymentRepository";
import { EmploymentRepository } from "../../modules/employment/repositories/EmploymentRepository";
import { EmailRepository } from "../../modules/Email/repostiories/EmailRepository";
import { IEmailRepository } from "../../modules/Email/repostiories/implementation/IEmailRepository";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);

container.registerSingleton<ICompanyRepository>(
  "CompanyRepository",
  CompanyRepository,
);

container.registerSingleton<IEmploymentRepository>(
  "EmploymentRepository",
  EmploymentRepository,
);

container.registerSingleton<IEmailRepository>(
  "EmailRepository",
  EmailRepository,
);
