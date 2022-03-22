import { gql } from '@apollo/client';

export const AUTH_MUTATION = gql`
  mutation AuthGoogle($input: AuthInput!) {
    authGoogle(input: $input) {
      email
    }
  }
`;
