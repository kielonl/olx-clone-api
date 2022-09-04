import createError from "http-errors";
import { Register } from "../../types";

import { EmailExists } from "./userQueries";

const emailValidation = async (email: string) => {
  const check = await EmailExists(email);
  console.log(check);
  if (check !== null)
    throw createError(400, "user with this e-mail already exists");
  return true;
};

export const userValidation = async (userInfo: Register) => {
  await emailValidation(userInfo.email);
  return true;
};
