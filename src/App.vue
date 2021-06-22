<template>
  <div class="entete">
    <h1>Recettes client-serveur</h1>
  </div>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

body {
  margin: 0px;
}

.entete {
  height: 250px;
  width: 100%;
  background-image: url("./assets/katie-smith-uQs1802D0CQ-unsplash.jpg");
  background-size: cover;
  background-position: 50% 50%;
  display: flex;
  align-items: center;
}

.entete h1 {
  margin: 0px;
  color: #fff;
  margin-left: 50px;
  font-size: 50px;
}
</style>
