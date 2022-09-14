import createError from "http-errors";
import { Offer } from "../../types";
import { categoryExists } from "../category/categoryQueries";

const lengthValid = (string: string, min: number, max: number) => {
  return string.length > min || string.length < max;
};

const titleValidation = (title: string): boolean => {
  if (!lengthValid(title.trim(), 5, 20)) {
    throw createError(400, "title length must be between 5 and 20 characters");
  }
  return true;
};

const categoryValidation = async (category: string): Promise<boolean> => {
  const categExists = await categoryExists(category);
  if (!categExists) {
    throw createError(400, "given category does not exist");
  }
  return true;
};

const descriptionValidation = (description: string): boolean => {
  if (!lengthValid(description.trim(), 10, 200)) {
    throw createError(
      400,
      "description length must be between 10 and 200 characters"
    );
  }
  return true;
};

export const offerValidation = async (offerInfo: Offer): Promise<boolean> => {
  titleValidation(offerInfo.title);
  await categoryValidation(offerInfo.category);
  descriptionValidation(offerInfo.description);
  return true;
};
