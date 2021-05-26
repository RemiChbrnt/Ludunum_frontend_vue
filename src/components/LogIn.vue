<template xmlns="http://www.w3.org/1999/html">
  <div id="login">
    <p class="username">{{ user.username }}'s posts:</p>
    <div class="loginStuff">
      <input v-model="usernameContent">
      <input v-model="passwordContent">
      <button class="button" @click=""><span>Log In </span></button>

      <button class="button" @click="createUser()"><span>Sign In </span></button>
    </div>
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
  data: function(){
    return {
      user: { username: 'user' },
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
      variables: { id: "60a93859b639ab41f858724a"}
    },
  },
}
</script>
