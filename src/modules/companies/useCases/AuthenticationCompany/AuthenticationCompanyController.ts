import { Request, Response } from "express";
import { CompanyRepository } from "../../repositories/CompanyRepository";

class AuthenticationCompanyController {
  async handle(request: Request, response: Response): Promise<Response> {
    const userid = request.user.id;

    const companyRepository = new CompanyRepository();

    const company = await companyRepository.findByIdGoogle(userid);

    if (!company) {
      return response.json({ status: "noRegisterCompany" });
    }

    return response.json({ status: "companyOk" });
  }
}

export { AuthenticationCompanyController };
