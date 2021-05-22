export const IsUserLoggedIn = async (root, variable, { cache, client }) => {
  return !!localStorage.getItem('token')
};