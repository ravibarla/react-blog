export * from "./constants";

export const setLocalItemInLocalStorage = (key, value) => {
  if (!key || !value) {
    return console.error("can not store in LS");
  }
  const valueToStore =
    typeof value !== "string" ? JSON.stringify(value) : value;
  localStorage.setItem(key, valueToStore);
};

export const getLocalItemInLocalStorage = (key) => {
  if (!key) {
    return console.error("can not get value from LS");
  }

  return localStorage.getItem(key);
};
export const removeItemFromLocalStorage = (key) => {
  if (!key) {
    return console.error("Can get the value from LS");
  }

  localStorage.removeItem(key);
};
export const getFormBody = (params) => {
  let formBody = [];
  for (let property in params) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(params[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  return formBody.join("&");
};
