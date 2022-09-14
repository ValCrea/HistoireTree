const hexRegex = /#[0-9A-Fa-f]{6}/g;
export const isHex = (str: string) => {
  let match = str.match(hexRegex);
  return match && str === match[0];
};

const colors = ["primary", "secondary", "sucess", "warning", "danger", "info"];
export const isColor = (str: string) => {
  return colors.includes(str.toLowerCase());
};

const colorHex: { [key: string]: string } = {
  primary: "#007bff",
  secondary: "#6c757d",
  sucess: "#28a745",
  warning: "#ffc107",
  danger: "#dc3545",
  info: "#17a2b8",
};
export const stingToHex = (str: string): string => {
  return colorHex[str] || "#000000";
};

export const addHexOpacity = (str: string) => {
  return str + "3a";
};
