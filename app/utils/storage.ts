export function setStorage(name: string, data: any) {
  if (typeof data === "string") {
    localStorage.setItem(name, data);
  } else {
    const stringifyData = JSON.stringify(data);
    localStorage.setItem(name, stringifyData);
  }
}

export const getStorage = (name: string) => {
  const item = localStorage.getItem(name);
  return item;
};

export const removeStorage = (name: string) => {
  localStorage.removeItem(name);
};

export const removeAllFromStorage = () => {
  localStorage.clear();
};

export function setSessionStorage(name: string, data: any) {
  if (typeof data === "string") {
    sessionStorage.setItem(name, data);
  } else {
    const stringifyData = JSON.stringify(data);
    sessionStorage.setItem(name, stringifyData);
  }
}

export const getSessionStorage = (name: string) => {
  const current = sessionStorage.getItem(name);
  const item = current && JSON.parse(current);
  return item;
};

export const removeSessionStorage = (name: string) => sessionStorage.removeItem(name);
