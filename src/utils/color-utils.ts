const hexRegex = /#[0-9A-Fa-f]{6}/g;
const isHex = (str: string): boolean => {
  const match = str.match(hexRegex);
  return match && str === match[0] ? true : false;
};

const colorHex: { [key: string]: string } = {
  primary: "#007bff",
  secondary: "#6c757d",
  sucess: "#28a745",
  warning: "#ffc107",
  danger: "#dc3545",
  info: "#17a2b8",
} as const;

const isColor = (str: string) => {
  return Object.keys(colorHex).includes(str.toLowerCase());
};

const colorToHex = (str: string): string => {
  return colorHex[str] || "#000000";
};

export const stringToColor = (str?: string): string => {
  if (!str) return colorToHex("primary");
  if (isColor(str)) return colorToHex(str);
  if (isHex(str)) return str;
  return colorToHex("primary");
};

export const addHexOpacity = (str: string) => {
  return str + "3a";
};
