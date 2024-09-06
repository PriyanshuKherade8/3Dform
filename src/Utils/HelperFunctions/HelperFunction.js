export const allowOnlyAlphabetsNumberSpace = (e) => {
  e.target.value = e.target.value.replace(/[^a-zA-Z0-9\s]/gi, "");
};

export const allowSpecificCharacters = (e) => {
  e.target.value = e.target.value.replace(/[^a-zA-Z0-9/_\.]/g, "");
};
