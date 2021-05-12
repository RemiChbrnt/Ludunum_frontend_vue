import gql from 'graphql-tag'

exports.GET_USER = gql `query ($id: ID!) {
    user(id: $id) {
      username
      password
    }
  }`;
