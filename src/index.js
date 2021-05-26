import Vue from "vue";

import ApolloClient from 'apollo-boost';
import VueApollo from "vue-apollo";
import VueRouter from "vue-router";
import * as VueGoogleMaps from 'vue2-google-maps';


const apolloProvider = new VueApollo({
  defaultClient: new ApolloClient({
    uri: 'http://localhost:3000/graphql'
  })
});

Vue.use(VueApollo); // use middleware
Vue.use(VueRouter);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDn7CoqkAKD1fD1m8aWCsipfmt6rnrBK4g'
  },
});


const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: require('./components/LogIn.vue').default
    },
    {
      path: '/map',
      component: require('./components/Map.vue').default
    },
    {
      path: '/',
      component: require('./components/HomePage.vue').default
    },
    {
      //default route
      path: '*',
      redirect: require('/')
    }
  ]
})

new Vue({
  apolloProvider,
  router: router,
  render: h => h(require('./components/App.vue').default)
}).$mount('#app')


