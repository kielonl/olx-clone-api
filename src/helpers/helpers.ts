export const lengthValid = (
  string: string,
  min: number,
  max: number
): boolean => {
  return string.trim().length > min && string.trim().length < max;
};

export const capitalize = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
