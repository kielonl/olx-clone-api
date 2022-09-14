import { fastify } from "../..";
import { User } from "../../types";
import { getUsers } from "./userQueries";
import { loginValidation, registerValidation } from "./userValidation";

export const user = () => {
  fastify.get("/user", async (request, response) => {
    const result = await getUsers();
    response.code(200).send({ data: result });
  });
  fastify.post<{ Body: User }>("/user", async (request, response) => {
    const userInfo = request.body;
    await registerValidation(userInfo);

    response.code(200).send({ userInfo });
  });

  fastify.post<{ Body: User }>("/auth/login", async (request, response) => {
    const userInfo = request.body;
    await loginValidation(userInfo);
    response.code(200).send({ userInfo });
  });
};
