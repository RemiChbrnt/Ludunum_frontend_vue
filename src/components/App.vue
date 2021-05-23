<template xmlns="http://www.w3.org/1999/html">
  <div id="app">
    <div class="upper_container">
      <img class="upper_container" src ="./img/Lugdunum_logo.png" alt="lugdunum logo">
      <h1 class="upper_container" >Website for Subscription and Statistics</h1>
    </div>


    <p class="username">{{ user.username }}'s posts:</p>
    <ul>
      <li v-for="post in posts" :key="post.id">{{ post.content }}</li>
    </ul>
    <nav>
      <input v-model="usernameContent">
      <input v-model="passwordContent">
      <button class="button" @click=""><span>Log In </span></button>

      <button class="button" @click="createUser()"><span>Sign In </span></button>
    </nav>
    <div>
      <a href="/map" class="item">Map</a>
    </div>
  </div>
</template>

<script>
import {
  GET_USER,
  REGISTER_USER
} from "./graphql_util.js"

export default {
  name: 'app',
  data: function(){
    return {
      user: { username: 'user' },
      posts: [],
      newPostContent: '',
      usernameContent: 'Username',
      passwordContent: 'Password'
    }
  },
  methods: {
    goToMap() {
      this.$router.push('map');
    },
    addPost() {
      this.posts.push({ content: this.newPostContent })
      this.newPostContent = '';
    },
    createUser(){
      this.$apollo.mutate({
        mutation: REGISTER_USER,
        variables: { username: this.usernameContent, password: this.passwordContent },
      })
    }
  },
  apollo: {
    user: {
      query: GET_USER,
      variables() {
        return {id: "60a93859b639ab41f858724a"}
      },
    },
  }

}
</script>
