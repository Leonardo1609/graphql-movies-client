import { gql } from '@urql/vue'

export const verifyUserQuery = gql`
  query VerifyUser {
    verifyUser {
      token
      user {
        email
        username
      }
    }
  }
`
