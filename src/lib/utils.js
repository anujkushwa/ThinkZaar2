export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function truncateText(text, length = 100) {
  if (text.length <= length) return text;

  return text.slice(0, length) + "...";
}

export function generateSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replaceAll(" ", "-")
    .replace(/[^\w-]+/g, "");
}

export function randomNumber(min = 1, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}