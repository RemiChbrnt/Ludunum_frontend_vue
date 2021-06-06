<template xmlns="http://www.w3.org/1999/html">
  <div id="login">
    <div class="mascotte">
      <img class="mascotte" src="./img/mascotte_02.png" alt="mascotte rhino">
    </div>
    <div class="loginStuff">
      <input v-model="usernameContent">
      <input v-model="passwordContent">
      <button class="button" @click="loginUser()"><span>Se Connecter </span></button>

      <button class="button" @click="createUser()"><span>S'enregistrer</span></button>
      <p style="align-self: center; text-align: center; background-color: #faebd7B0; margin: 5%; color: #580000"> {{ loginMessage }} </p>
    </div>
  </div>
</template>

<script>
import {
  GET_USER,
  LOGIN,
  REGISTER_USER
} from "./graphql_util.js"

export default {
  data: function(){
    return {
      user: { username: 'user' },
      usernameContent: 'Nom d\'utilisateur',
      passwordContent: 'Mot de Passe',
      loginID: -1,
      loginMessage: ''
    }
  },
  methods: {
    createUser(){
      this.$apollo.mutate({
        mutation: REGISTER_USER,
        variables: { username: this.usernameContent, password: this.passwordContent },
      });
    },
    loginUser(){
      this.$apollo.query({
        query: LOGIN,
        variables: {username: this.usernameContent, password: this.passwordContent},
      })
        .then(result => {
          // if password is wrong:
          if(result.data.login == 2) {
            this.loginMessage = "Mot de Passe Incorrect, veuillez vérifier vos identifiants"
          // if username is not in Database
          }else if(result.data.login == 1){
            this.loginMessage = "Nom d'utilisateur Incorrect, veuillez vérifier vos identifiants ou inscrivez-vous avec le bouton [S'enregistrer]"
          }else{
            this.loginMessage = "Connexion effectuée avec succès !"
            this.loginID = result.data.login;
            this.getUser();
          }
      })
        .catch(err => {
          console.log(err);
          this.loginID = err.data;
        });
    },
    getUser(){
      this.$apollo.query({
        query: GET_USER,
        variables: {id: this.loginID},
      })
        .then(result => {
          console.log(result.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

}
</script>
