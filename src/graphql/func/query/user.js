import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  query LOGIN_USER($data:{$email:String!,$password:String!}){
    LoginUser(data:$data){
      token
      message
      user{
        id
        fullName
      }
    }
  }
`;
