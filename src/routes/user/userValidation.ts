import crypto from "crypto";
import createError from "http-errors";
import { EMAIL_VALID, INCLUDES_NUMBER } from "../../constants/REGEX_PATTERNS";
import { emailExists, insertUser, userExists } from "./userQueries";

import { User } from "../../types";

const passwordHashing = (password: string) => {
  //@ts-ignore
  const hasher = crypto.createHmac("sha256", process.env.HASH_KEY);
  password = hasher.update(password).digest("hex");
  return password;
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
  if (!INCLUDES_NUMBER.test(password)) {
    throw createError(400, "password must contain at least 1 number");
  }
  return true;
};

const emailValidation = async (email: string) => {
  const check = await emailExists(email);
  if (check !== null) {
    throw createError(400, "user with this e-mail already exists");
  }
  if (EMAIL_VALID.test(email)) return true;
};

const checkUser = async (userInfo: User) => {
  userInfo.password = passwordHashing(userInfo.password);
  const userDoesExist = await userExists(userInfo);

  if (userDoesExist === null) {
    throw createError(400, "incorrect credentials");
  }

  return userDoesExist;
};

export const registerValidation = async (userInfo: User) => {
  await emailValidation(userInfo.email);
  passwordValidation(userInfo.password);

  userInfo.password = passwordHashing(userInfo.password);
  await insertUser(userInfo);

  return true;
};

export const loginValidation = async (userInfo: User) => {
  await checkUser(userInfo);
  return true;
};
