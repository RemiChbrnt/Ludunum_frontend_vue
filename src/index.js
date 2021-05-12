import Vue from "vue"
import App from './components/App.vue'

import ApolloClient from 'apollo-boost'
import VueApollo from "vue-apollo";

const apolloProvider = new VueApollo({
  defaultClient: new ApolloClient({
    uri: 'http://localhost:3000/graphql'
  })
});

Vue.use(VueApollo); // use middleware

new Vue({
  el: '#app',
  apolloProvider, // add option
  render: h => h(App)
})
