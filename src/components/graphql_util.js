import gql from 'graphql-tag'

export const GET_USER = gql `query ($id: ID!) {
    user(id: $id) {
      username
      localizations
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
    lng
    userId
    createdAt
  }
}`;

export const LOGIN = gql `query ($username: String!, $password: String!) {
  login(username: $username, password: $password)
}`

export const ADD_LOCALIZATION = gql`mutation ($lng: Float!, $lat: Float!, $userId: ID!) {
  addLocalization(lng: $lng, lat: $lat, userId: $userId) {
    id
    lat
    lng
    userId
  }
}`;
