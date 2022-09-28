import { prisma } from "../..";

export const getLocalizations = async () => {
  const getLocalizations = await prisma.places.findMany({
    // take: 10,
  });
  return getLocalizations;
};

export const getLocalizationByPostCode = async (postCode: string) => {
  const getLocalizationByPostCode =
    await prisma.$queryRaw`SELECT DISTINCT (post_code) FROM public.places WHERE post_code LIKE ${
      postCode + "%"
    };`;
  return getLocalizationByPostCode;
};

// export const getLocalizationByPostCode = async (post_code: string) => {
//   const getLocalizationByPostCode = await prisma.places.findMany({
//     distinct: ["post_code"],
//     where: {
//       post_code: {
//         contains: post_code,
//       },
//     },
//   });
//   return getLocalizationByPostCode;
// };
