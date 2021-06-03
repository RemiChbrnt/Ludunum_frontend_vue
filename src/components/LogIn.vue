<template xmlns="http://www.w3.org/1999/html">
  <div id="login">
    <div class="mascotte">
      <img class="mascotte" src="./img/mascotte_02.png" alt="mascotte rhino">
    </div>
    <div class="loginStuff">
      <input v-model="usernameContent">
      <input v-model="passwordContent">
      <button class="button" @click=""><span>Se Connecter </span></button>

      <button class="button" @click="createUser()"><span>S'enregistrer</span></button>
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
      usernameContent: 'Nom d\'utilisateur',
      passwordContent: 'Mot de Passe'
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
