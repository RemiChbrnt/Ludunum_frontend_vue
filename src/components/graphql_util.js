import gql from 'graphql-tag'

export const GET_USER = gql `query ($id: ID!) {
    user(id: $id) {
      username
      password
    }
  }`;

export const REGISTER_USER = gql`mutation ($username: String!, $password: String!) {
  createUser(username: $username, password: $password) {
    username
    password
  }
}`;
