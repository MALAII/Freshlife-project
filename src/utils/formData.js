export const formData = (data) => {
  const formData = new FormData();
  for (const key in data) {
    if (Array.isArray(data[key])) {
      data[key].forEach((item) => {
        if (item instanceof File) {
          formData.append(key, item); // Append file directly
        } else if (typeof item === "object") {
          // Instead of stringifying, you can append each property of the object
          for (const subKey in item) {
            formData.append(`${key}[${subKey}]`, item[subKey]);
          }
        } else {
          formData.append(key, item); // Append regular data
        }
      });
    } else if (data[key] instanceof File) {
      formData.append(key, data[key]); // Append file directly
    } else if (typeof data[key] === "object") {
      // Append each property of the object
      for (const subKey in data[key]) {
        formData.append(`${key}[${subKey}]`, data[key][subKey]);
      }
    } else {
      formData.append(key, data[key]); // Append regular data
    }
  }
  return formData
};
