import { fastify } from "../..";
import { getCategories } from "./categoryQueries";

export const category = () => {
  fastify.get("/category", async (request, response) => {
    const result = await getCategories();
    response.code(200).send({ data: result });
  });
};
