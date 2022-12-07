<template>
  <v-app>
    <v-app-bar
      app
      color="purple"
      dark
    >
      <div class="d-flex align-center">
        <router-link class="" to="/">
          <v-icon
              large
              color=" darken-2"
          >
            mdi-white-balance-sunny
          </v-icon>

        </router-link>
      </div>

      <v-spacer></v-spacer>

      <router-link class="" to="/weathers">
        <span class="mr-2 white--text">Weathers</span>
      </router-link>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>
<style>
@import './assets/styles/style.css';
</style>
<script>

export default {
  name: 'App',

  data: () => ({
    //
  })
};
</script>
