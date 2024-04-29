import { injectable } from "tsyringe";
import { Employment } from "../../model";

@injectable()
class ExpirationEmploymentDeleteUseCase {
  async execute(listIdsEmploymentMustDeleted: string[]) {
    const result = await Employment.deleteMany({
      _id: { $in: listIdsEmploymentMustDeleted },
    });
  }
}

export { ExpirationEmploymentDeleteUseCase };
