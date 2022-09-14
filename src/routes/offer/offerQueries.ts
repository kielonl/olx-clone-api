import { prisma } from "../..";
import { Offer } from "../../types";
export const getOffers = async () => {
  const getOffers = await prisma.offer.findMany();
  return getOffers;
};

export const createOffer = async (offerInfo: Offer) => {
  const createOffer = await prisma.offer.create({
    data: {
      title: offerInfo.title,
      category: offerInfo.category,
      images: offerInfo.images,
      description: offerInfo.description,
      localisation: offerInfo.localisation,
      author_id: offerInfo.author_id,
    },
    include: { categories: true },
  });
  return createOffer;
};
