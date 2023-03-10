export const formatDisplay = (displayValue: string) => {
  let newDisplay;
  let currentDisplay = displayValue.toString();

  if (currentDisplay.includes(".")) {
    newDisplay = currentDisplay.replace(".", ",");
    return newDisplay;
  }
  return displayValue;
};
