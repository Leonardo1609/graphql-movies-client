import { gql } from '@urql/vue'

export const registerUserMutation = gql`
  mutation RegisterUser(
    $username: String!
    $password: String!
    $email: String!
  ) {
    createUser(username: $username, password: $password, email: $email)
  }
`

export const loginUserMutation = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`
