import { fastify } from "../..";
import { User } from "../../types";
import { loginValidation, registerValidation } from "./userValidation";

export const user = () => {
  fastify.post<{ Body: User }>("/user", async (request, response) => {
    const userInfo = request.body;
    console.log(userInfo);
    await registerValidation(userInfo);

    response.code(200).send({ userInfo });
  });

  fastify.post<{ Body: User }>("/auth/login", async (request, response) => {
    const userInfo = request.body;
    await loginValidation(userInfo);
    response.code(200).send({ userInfo });
  });
};
