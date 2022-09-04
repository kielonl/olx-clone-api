import { prisma } from "../..";

export const EmailExists = async (email: string) => {
  const EmailExists = await prisma.users.findFirst({
    where: {
      e_mail: email,
    },
  });
  return EmailExists;
};
