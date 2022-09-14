import { fastify } from "../..";
import { createOffer, getOffers } from "./offerQueries";
import { Offer } from "../../types";
import { offerValidation } from "./offerValidation";

export const offer = () => {
  fastify.get("/offer", async (request, response) => {
    const result = await getOffers();
    response.code(200).send({ data: result });
  });

  fastify.post<{ Body: Offer }>("/offer", async (request, response) => {
    const offerInfo = request.body;
    await offerValidation(offerInfo);
    const result = await createOffer(offerInfo);
    response.code(200).send({ data: result });
  });
};
