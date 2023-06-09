import createError from "http-errors";
import { lengthValid } from "../../helpers/helpers";
import { Offer } from "../../types";
import { categoryExists } from "../category/categoryQueries";
import { userExistsByUUID } from "../user/userQueries";

const titleValidation = (title: string): boolean => {
  if (!lengthValid(title, 5, 20)) {
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

const authorValidation = async (authorId: string): Promise<boolean> => {
  const userExists = await userExistsByUUID(authorId);
  if (!userExists) {
    throw createError(400, "this user does not exist");
  }
  return true;
};

export const offerValidation = async (offerInfo: Offer): Promise<boolean> => {
  await authorValidation(offerInfo.author_id);
  titleValidation(offerInfo.title);
  await categoryValidation(offerInfo.category);
  descriptionValidation(offerInfo.description);
  return true;
};
