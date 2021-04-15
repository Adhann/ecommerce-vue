<template>
<div>
  <v-app>
    <v-app-bar app color="teal" dark elevation="0">
      <v-app-bar-nav-icon @click="toggleMini = !toggleMini"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-btn @click="toggleTheme" color="teal" class="mr-2">{{buttonText}}</v-btn>
      <!-- <v-icon>mdi-account</v-icon> -->
      <div class="col-1">
      <v-btn
        color="dark"
        @click.prevent="logout"
      >
        Logout
      </v-btn>
       <!-- <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
          >
            Dropdown
          </v-btn>
        </template>
        <v-list>
          <v-list-item
          >
            <v-list-item-title>logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu> -->
      </div>
    </v-app-bar>
    <!-- <Sidebar2
    v-model="sidebarMenu"
      color="blue-grey darken-4"
      app
      floating
      :permanent="sidebarMenu"
      :mini-variant.sync="mini"
      :items="items"
      /> -->
    <v-navigation-drawer
      v-model="sidebarMenu"
      color="blue-grey darken-4"
      app
      floating
      :permanent="sidebarMenu"
      :mini-variant.sync="mini"
      >
      <v-list-item class="px-2">
        <v-list-item-avatar>
            <v-icon class="white--text">mdi-account-outline</v-icon>
        </v-list-item-avatar>
        <v-list-item-content class="text-truncate white--text">
            Jane Doeski
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list class="theme--dark">
        <v-list-item v-for="item in items" :key="item.title" link :to="item.href">
          <v-list-item-icon>
            <v-icon color="teal">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="teal--text">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <Contents />
    <!-- <v-footer class="py-3">
            <span class="ml-auto overline">Iatek &copy;2020</span>
        </v-footer> -->
    <Footer />
  </v-app>
</div>
</template>

<script>
// import AdminNavbar from '@/components/Navbars/AdminNavbar.vue'
import Contents from '../components/Contents'
import Footer from '../components/Footer.vue'
// import Sidebar2 from '../components/Sidebar2.vue'
export default {
  components: {
    // AdminNavbar
    Contents,
    // Sidebar2,
    Footer
  },
  computed: {
    mini () {
      return (this.$vuetify.breakpoint.smAndDown) || this.toggleMini
    },
    buttonText () {
      return !this.$vuetify.theme.dark ? 'Go Dark' : 'Go Light'
    }
  },
  data: () => ({
    sidebarMenu: true,
    toggleMini: false,
    items: [
      { title: 'Dashboard', href: '/dashboard', icon: 'mdi-view-dashboard' },
      { title: 'Products', href: '/products', icon: 'mdi-package-variant' },
      { title: 'Banners', href: '/banners', icon: 'mdi-image-area' },
      { title: 'Cattegories', href: '/categories', icon: 'mdi-shape-outline' }
    ]
  }),
  methods: {
    toggleTheme () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
    logout () {
      localStorage.clear()
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style>

</style>
