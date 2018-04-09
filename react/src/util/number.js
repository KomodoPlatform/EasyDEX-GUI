export const isNumber = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

export const isPositiveNumber = (value) => {
  return isNumber(value) && (+value) > 0;
}