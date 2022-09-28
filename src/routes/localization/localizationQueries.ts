import { prisma } from "../..";

export const getLocalizations = async () => {
  const getLocalizations = await prisma.places.findMany({
    // take: 10,
  });
  return getLocalizations;
};

export const getLocalizationByPostCode = async (post_code: string) => {
  const getLocalizationByPostCode = await prisma.places.findMany({
    where: {
      post_code: post_code,
    },
  });
  return getLocalizationByPostCode;
};
