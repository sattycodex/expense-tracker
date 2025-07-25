export const isLoggedIn = () => {
  return !!localStorage.getItem("Authorization");
};

export const saveToken = (token) => {
  localStorage.setItem("Authorization", token);
};

export const logout = () => {
  localStorage.removeItem("Authorization");
};