export const getNestedErrorMessage = (errors, name) => {
  if (!errors || !name) return null;

  // Split the name by "." to handle nested fields like "links.0.name"
  const nameParts = name.split(".");

  // Traverse the errors object using the parts of the name
  let error = errors;
  for (let part of nameParts) {
    error = error?.[part];
    if (!error) break; // If part of the path is undefined, return null
  }

  return error?.message || null; // Return the error message if exists
};
