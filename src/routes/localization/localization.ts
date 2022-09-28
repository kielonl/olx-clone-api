import { fastify } from "../..";
import {
  getLocalizationByPostCode,
  getLocalizations,
} from "./localizationQueries";
import { similarityCalculation } from "./localizationValidation";

export const localization = () => {
  fastify.get("/localization", async (request, response) => {
    // const localizations = await getLocalizations();
    const result = await similarityCalculation("99-41");
    // const res = result && (await getLocalizationByPostCode(result.postCode));
    const res = await getLocalizationByPostCode("99-41");
    response.code(200).send({ res });
  });
};
