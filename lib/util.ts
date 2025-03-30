export const isEmptyInputValue = (value?: string): boolean => {
  return value == null || ((typeof value === "string" || Array.isArray(value)) && value.length === 0);
};
