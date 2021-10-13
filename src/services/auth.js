export const TOKEN_KEY = "@ipet-Token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
  
  localStorage.removeItem('@petid');
  localStorage.removeItem(TOKEN_KEY);
  this.props.history.push("/");
};
