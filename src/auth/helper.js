// auth.js
export const setAuthToken = (token) => {
  if (token) {
    // Attach the token to the Authorization header
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    // Remove the token from the Authorization header
    delete axios.defaults.headers.common["Authorization"];
  }
};
