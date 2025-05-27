export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" }); // "May"
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};