import Vue from "vue";
import App from './components/App.vue';
import Map from './components/Map.vue';
import HomePage from './components/HomePage.vue';

import ApolloClient from 'apollo-boost';
import VueApollo from "vue-apollo";
import VueRouter from "vue-router";


const apolloProvider = new VueApollo({
  defaultClient: new ApolloClient({
    uri: 'http://localhost:3000/graphql'
  })
});

Vue.use(VueApollo); // use middleware
Vue.use(VueRouter);



const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/app',
      component: require('./components/App.vue').default
    },
    {
      path: '/map',
      component: require('./components/Map.vue').default
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
  render: h => h(require('./components/HomePage.vue').default)
}).$mount('#app')


