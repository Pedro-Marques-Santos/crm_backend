import { Request, Response } from "express";
import { UserRepository } from "../../repositories/UserRepository";

class AuthenticationUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const userid = request.user.id;

    const userRepository = new UserRepository();

    const user = await userRepository.findByIdGoogle(userid);

    if (!user) {
      return response.json({ status: "noRegisterUser" });
    }

    return response.json({ status: "userOk" });
  }
}

export { AuthenticationUserController };
