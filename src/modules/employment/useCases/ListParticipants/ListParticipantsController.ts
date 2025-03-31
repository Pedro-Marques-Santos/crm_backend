import { Response, Request } from "express";

import { container } from "tsyringe";
import { ListParticipantsUseCases } from "./ListParticipantesUseCase";

class ListParticipantsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { idemployment, statusEmplyoment } = request.body;

    const userid = request.user.id;

    const listParticipantsUseCase = container.resolve(ListParticipantsUseCases);

    const listParticipants = await listParticipantsUseCase.execute(
      userid,
      idemployment,
      statusEmplyoment,
    );

    return response.json(listParticipants);
  }
}

export { ListParticipantsController };
