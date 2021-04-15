<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',

  components: {
    // HelloWorld
  },

  data: () => ({
    //
  }),
  created () {
    if (!localStorage.getItem('access_token')) {
      this.$store.dispatch('changeIsLogin', false)
    } else {
      this.$store.dispatch('changeIsLogin', true)
    }
  }
}
</script>

<style>
#app {
  background: #111b27 !important;
}
</style>
