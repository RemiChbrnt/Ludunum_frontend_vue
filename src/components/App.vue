<template>
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
      <button @click="">Log In</button>

      <button @click="createUser()">Sign In</button>
    </nav>
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
        return {id: "609aaf7b319f02436c55b537"}
      },
    },
  }

}
</script>
