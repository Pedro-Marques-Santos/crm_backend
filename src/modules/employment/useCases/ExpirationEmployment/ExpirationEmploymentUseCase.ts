import { injectable } from "tsyringe";
import { Employment } from "../../model";

@injectable()
class ExpirationEmplyomentUseCase {
  async execute(): Promise<void> {
    const result = await Employment.updateMany(
      { dataExpiration: { $lte: new Date() } },
      { dataExpirationActivity: true },
    );
  }
}

export { ExpirationEmplyomentUseCase };
