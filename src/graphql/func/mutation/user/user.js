import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation LOGIN_USER($email: String!, $password: String!) {
    LoginUser(data: { email: $email, password: $password }) {
      token
      message
      user {
        id
        fullName
      }
    }
  }
`;
