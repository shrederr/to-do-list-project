export const toFormData = (values: Partial<any>, ignoreFields: string[]) => {
  const formData = new FormData();
  for (const key in values) {
    if (Object.prototype.hasOwnProperty.call(values, key)) {
      if (!ignoreFields.includes(key) && values[key] !== null && values[key] !== undefined) {
        formData.append(key, values[key]);
      }
    }
  }
  return formData;
};
