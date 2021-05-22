import { gql } from '@apollo/client';

export const GET_ME = gql`
  query GET_ME {
    GetMe {
      id
    }
  }
`;
export const IS_USER_LOGGED_IN = gql`
  query IsUserLoggedIn {
    IsUserLoggedIn @client(always: true)
  }
`;
