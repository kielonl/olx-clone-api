import { fastify } from "../..";
import { createOffer, getOffers } from "./offerQueries";
import { Offer } from "../../types";
import { offerValidation, paginatedResults } from "./offerValidation";

interface OfferParams {
  page: string;
}

export const offer = () => {
  fastify.get<{ Params: OfferParams }>(
    "/offer/:page",
    async (request, response) => {
      const offers = await getOffers();
      const result = paginatedResults(offers, request.params.page);
      response.code(200).send(result);
    }
  );

  fastify.post<{ Body: Offer }>("/offer", async (request, response) => {
    const offerInfo = request.body;
    await offerValidation(offerInfo);
    const result = await createOffer(offerInfo);
    response.code(200).send({ data: result });
  });
};
