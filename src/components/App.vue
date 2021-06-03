<template>
  <div>
    <div id="app">
      <div class="upper_container">
        <img class="upper_container" src ="./img/Lugdunum_logo.png" alt="lugdunum logo">
        <h1>SITE POUR STATISTIQUES</h1>
        <nav>
          <a href="/login" class="item upper_container">Connexion</a>
          <a href="/map" class="item upper_container">Notre Carte</a>
        </nav>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
}
</script>

