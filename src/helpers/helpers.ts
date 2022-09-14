export const lengthValid = (
  string: string,
  min: number,
  max: number
): boolean => {
  return string.trim().length > min && string.trim().length < max;
};
