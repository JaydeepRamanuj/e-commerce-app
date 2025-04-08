export function getRandomNumberInRange(min = 1, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function findDiscountNumber(price) {
  let discount = getRandomNumberInRange(20, 85);
  let discountPrice = (price * discount) / 100;
  return [Math.round(price - discountPrice), discount];
}

export function findDiscountedPrice(price, discountPercentage) {
  return Math.round(price - (price * discountPercentage) / 100);
}

export function formatDate(isoString) {
  const date = new Date(isoString);
  return date
    .toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(",", "");
}

export const makeCapitalize = (word) =>
  word.charAt(0).toUpperCase() + word.slice(1);
