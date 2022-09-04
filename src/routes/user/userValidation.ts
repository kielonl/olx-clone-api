import createError from "http-errors";
import { Register } from "../../types";

import { EmailExists } from "./userQueries";

const emailValidation = async (email: string) => {
  const check = await EmailExists(email);
  if (check !== null)
    throw createError(400, "user with this e-mail already exists");
  return true;
};

const passwordValidation = (password: string) => {
  if (password.length < 3 || password.length > 12) {
    throw createError(
      400,
      "password length must be between 3 and 12 characters"
    );
  }
  if (password === password.toLowerCase()) {
    throw createError(400, "password must contain at least 1 uppercase letter");
  }
  if (!/\d/.test(password)) {
    throw createError(400, "password must contain at least 1 number");
  }
  return true;
};

export const userValidation = async (userInfo: Register) => {
  await emailValidation(userInfo.email);
  passwordValidation(userInfo.password);
  return true;
};
