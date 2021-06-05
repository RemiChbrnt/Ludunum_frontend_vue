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

export const GET_LOCALIZATIONS = gql`query {
  localizations{
    id
    lat
    long
    userId
    createdAt
  }
}`;

export const LOGIN = gql `query ($username: String!, $password: String!) {
  login(username: $username, password: $password)
}`
