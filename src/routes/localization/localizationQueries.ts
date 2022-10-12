import { prisma } from "../..";
import { capitalize } from "../../helpers/helpers";

export const getLocalizations = async () => {
  const getLocalizations = await prisma.places.findMany({
    // take: 10,
  });
  return getLocalizations;
};

export const getLocalizationByPostCode = async (postCode: string) => {
  const getLocalizationByPostCode =
    await prisma.$queryRaw`SELECT DISTINCT (post_code),county FROM public.places WHERE post_code LIKE ${
      postCode + "%"
    } LIMIT 10;`;
  return getLocalizationByPostCode;
};

export const getLocalizationByPlace = async (place: string) => {
  const getLocalizationByPlace =
    await prisma.$queryRaw`SELECT place,county,voivodeship,id FROM public.places WHERE place  LIKE ${
      capitalize(place) + "%"
    } LIMIT 10;`;
  return getLocalizationByPlace;
};
