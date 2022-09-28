import { fastify } from "../..";
import {
  getLocalizationByPostCode,
  getLocalizations,
} from "./localizationQueries";
import { similarityCalculation } from "./localizationValidation";

export const localization = () => {
  fastify.get("/localization", async (request, response) => {
    // const localizations = await getLocalizations();
    const result = await similarityCalculation("62-709");
    const res = result && (await getLocalizationByPostCode(result.postCode));
    response.code(200).send({ res });
  });
};
