import { prisma } from "../..";

export const getCategories = async () => {
  const getCategories = await prisma.categories.findMany();
  return getCategories;
};

export const categoryExists = async (categoryId: string) => {
  const categoryExists = await prisma.categories.findUnique({
    where: {
      id: categoryId,
    },
  });
  return categoryExists;
};
