export const availabilityColor = (availability) => {
  switch (availability) {
    case "Open":
      return "green";
    case "Closed":
      return "red";
  }
};
export const statusColor = (status) => {
  switch (status) {
    case "Completed":
      return "green";
    case "Paused":
      return "yellow";
    case "In Progress":
      return "blue";
    case "Banned":
      return "red";
  }
};
