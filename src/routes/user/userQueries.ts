import { prisma } from "../..";
import { User } from "../../types";

export const emailExists = async (email: string) => {
  const emailExists = await prisma.users.findFirst({
    where: {
      e_mail: email,
    },
  });
  return emailExists;
};

export const insertUser = async (userInfo: User) => {
  const insertUser = await prisma.users.create({
    data: {
      e_mail: userInfo.email,
      password: userInfo.password,
    },
  });

  return insertUser;
};

export const userExists = async (userInfo: User) => {
  const userExists = await prisma.users.findFirst({
    where: {
      AND: {
        e_mail: userInfo.email,
        password: userInfo.password,
      },
    },
  });
  return userExists;
};
