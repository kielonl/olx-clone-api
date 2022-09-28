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

export const userExistsByCredentials = async (userInfo: User) => {
  const userExistsByCredentials = await prisma.users.findFirst({
    where: {
      AND: {
        e_mail: userInfo.email,
        password: userInfo.password,
      },
    },
  });
  return userExistsByCredentials;
};

export const userExistsByUUID = async (author_id: string) => {
  const userExistsByUUID = await prisma.users.findFirst({
    where: {
      id: author_id,
    },
  });
  return userExistsByUUID;
};

export const getUsers = async () => {
  const getUsers = await prisma.users.findMany();
  return getUsers;
};
