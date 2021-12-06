import CONST_STORAGE from 'constants/storage';

export const setToken = (token: string) =>
  localStorage.setItem(CONST_STORAGE.USER.ACCESS_TOKEN, token);

export const getToken = () =>
  localStorage.getItem(CONST_STORAGE.USER.ACCESS_TOKEN);

export const removeToken = () =>
  localStorage.removeItem(CONST_STORAGE.USER.ACCESS_TOKEN);

export const clean = () => localStorage.clear();
