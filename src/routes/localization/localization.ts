import { fastify } from "../..";
import { Localization } from "../../types";
import { getLocalizationByPlace } from "./localizationQueries";

export const localization = () => {
  fastify.post<{ Body: Localization }>(
    "/localization",
    async (request, response) => {
      const localizationInfo = request.body;
      const res = await getLocalizationByPlace(localizationInfo.place);
      response.code(200).send({ res });
    }
  );
};
