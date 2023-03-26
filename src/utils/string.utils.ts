export const getLevelStatus = (level: string) => {
  if (level === "4") {
    return "Highly Broken";
  }

  if (level === "3") {
    return "Mid Broken";
  }

  if (level === "4") {
    return "Low Broken";
  }
};
