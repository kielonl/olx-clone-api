import crypto from "crypto";
import createError from "http-errors";
import {
  EMAIL_VALID_REGEX,
  INCLUDES_NUMBER_REGEX,
} from "../../constants/REGEX_PATTERNS";
import {
  emailExists,
  insertUser,
  userExistsByCredentials,
} from "./userQueries";

import { User } from "../../types";
import { lengthValid } from "../../helpers/helpers";

const passwordHashing = (password: string) => {
  if (process.env.HASH_KEY !== undefined) {
    const hasher = crypto.createHmac("sha256", process.env.HASH_KEY);
    password = hasher.update(password).digest("hex");
    return password;
  }
  throw createError(500, "hash key error");
};
const passwordValidation = (password: string) => {
  if (!lengthValid(password, 3, 12)) {
    throw createError(
      400,
      "password length must be between 3 and 12 characters"
    );
  }
  if (password === password.toLowerCase()) {
    throw createError(400, "password must contain at least 1 uppercase letter");
  }
  if (!INCLUDES_NUMBER_REGEX.test(password)) {
    throw createError(400, "password must contain at least 1 number");
  }
  return true;
};

const emailValidation = async (email: string) => {
  const check = await emailExists(email);
  if (check !== null) {
    throw createError(400, "user with this e-mail already exists");
  }
  if (EMAIL_VALID_REGEX.test(email)) return true;
};

const checkUser = async (userInfo: User) => {
  userInfo.password = passwordHashing(userInfo.password);
  const userDoesExist = await userExistsByCredentials(userInfo);

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
