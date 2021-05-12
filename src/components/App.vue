<template>
  <div id="app">
    <h1> LUGDUNUM DEVELOPER STUDIO </h1>
    <nav></nav>
    <logo>
      <img src = "./img/Lugdunum_logo.png" alt="lugdunum logo">
    </logo>

    <p class="username">{{ user.username }}'s posts:</p>
    <ul>
      <li v-for="post in posts" :key="post.id">{{ post.content }}</li>
    </ul>
    <div>
      <input v-model="newPostContent">
      <button @click="addPost()">Add Post</button>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

const GET_USER = gql `query ($id: ID!) {
    user(id: $id) {
      username
      password
    }
  }`;

export default {
  name: 'app',
  data: function(){
    return {
      user: { username: 'user' },
      posts: [],
      newPostContent: ''
    }
  },
  methods: {
    addPost() {
      this.posts.push({ content: this.newPostContent })
      this.newPostContent = '';
    }
  },
  apollo: {
    user: {
      query: GET_USER,
      variables() {
        return {id: "609aaf7b319f02436c55b537"}
      },
    }
  }

}
</script>
