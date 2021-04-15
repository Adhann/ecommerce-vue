<template>
  <v-app>
    <Sidebar v-if="$route.name !== 'Login'"/>
    <Login v-if="$route.name === 'Login'"/>
  </v-app>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import Login from '@/views/Login.vue'
// import Footer from '@/components/Footer.vue'
export default {
  components: {
    Sidebar,
    Login
    // Footer
  }
}
</script>

<style>

</style>
