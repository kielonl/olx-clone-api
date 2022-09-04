import { fastify } from "../..";
import { Register } from "../../types";
import { userValidation } from "./userValidation";

export const user = () => {
  fastify.post<{ Body: Register }>("/user", async (request, response) => {
    const userInfo = request.body;

    await userValidation(userInfo);

    response.code(200).send({ userInfo });
  });
};
