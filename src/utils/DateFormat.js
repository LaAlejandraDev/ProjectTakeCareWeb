export function formatMessageDate(isoDate) {
  if (!isoDate) return "";

  const date = new Date(isoDate);
  const now = new Date();

  const isToday =
    date.toDateString() === now.toDateString();

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  const isYesterday =
    date.toDateString() === yesterday.toDateString();

  const options = {
    hour: "2-digit",
    minute: "2-digit",
  };

  if (isToday) {
    return `Hoy - ${date.toLocaleTimeString("es-MX", options)}`;
  }

  if (isYesterday) {
    return `Ayer - ${date.toLocaleTimeString("es-MX", options)}`;
  }

  return `${date.toLocaleDateString("es-MX")} - ${date.toLocaleTimeString("es-MX", options)}`;
}
