import { gql } from '@apollo/client';

export const USERS = gql`
  query UsersList {
    users {
      id
      email
    }
  }
`;
