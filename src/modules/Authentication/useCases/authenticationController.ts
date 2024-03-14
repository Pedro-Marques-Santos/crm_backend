import { Request, Response } from "express";
import { UserRepository } from "../../users/repositories/UserRepository";
import { CompanyRepository } from "../../companies/repositories/CompanyRepository";

class AuthenticationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const userid = request.user.id;

    const userRepository = new UserRepository();
    const companyRepository = new CompanyRepository();

    const user = await userRepository.findByIdGoogle(userid);
    const company = await companyRepository.findByIdGoogle(userid);

    if (!user && !company) {
      return response.json({ status: "noRegister" });
    }

    return response.json({ status: user ? user : company });
  }
}

export { AuthenticationController };
