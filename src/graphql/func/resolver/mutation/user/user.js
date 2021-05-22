import { IS_USER_LOGGED_IN } from "graphql/func/query";

export const LogoutUser = async (root, variable, { cache, client }) => {
  localStorage.removeItem('token');
  cache.writeQuery({ query: IS_USER_LOGGED_IN, data: { IsUserLoggedIn: false } });
  client.resetStore();
  return null;
}

export default {
  LogoutUser,
}