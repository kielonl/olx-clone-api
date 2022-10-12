import { similarity } from "../../helpers/similarity";
import { getLocalizations } from "./localizationQueries";

//change types later

let prevValues: any = [];

export const similarityCalculation = async (givenString: string) => {
  if (prevValues[givenString] !== undefined) {
    return prevValues[givenString];
  }
  const localizations = await getLocalizations();
  for (let i = 0, length = localizations.length; i < length; i++) {
    const result = {
      postCode: localizations[i].post_code,
      similarity: similarity(givenString, localizations[i].post_code),
    };

    if (result.similarity > 0.8) {
      prevValues[givenString] = result;
      return result;
    }
  }
  return false;
};
