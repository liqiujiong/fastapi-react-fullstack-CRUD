export const getJwt = () => {
  return window.localStorage.getItem('jwt') || '';
};

export const removeJwt = () => {
  window.localStorage.removeItem('jwt');
};

export const setJwt = (jwt: string) => {
  window.localStorage.setItem('jwt', jwt);
};
