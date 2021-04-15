<template>
<!-- <v-app> -->
  <v-app-bar
      app
      height="80px"
      dark
      class="black"
    >
    <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
    <v-btn color="black" @click.prevent="goHome"><span>STORE</span></v-btn>
    <!-- <router-link @click.prevent="goHome">Store</router-link> -->
    <v-tabs
      centered
      dark
      icons-and-text
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#tab-1">
        keyboard
        <v-icon>mdi-keyboard</v-icon>
      </v-tab>

      <v-tab href="#tab-2">
        headset
        <v-icon>mdi-headphones</v-icon>
      </v-tab>

      <v-tab href="#tab-3">
        laptop
        <v-icon>mdi-laptop-mac</v-icon>
      </v-tab>
    </v-tabs>

    <!-- <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="i in 3"
        :key="i"
        :value="'tab-' + i"
      >
        <v-card flat>
          <v-card-text></v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items> -->

      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon @click.prevent="wishListPage">
            <v-badge
              color=""
              content=""
              overlap
            >
              <v-icon
                v-bind="attrs"
                v-on="on"
                >mdi-heart</v-icon>
            </v-badge>
          </v-btn>
        </template>
        <span>Wishlist</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon @click.prevent="cartPage">
            <v-badge v-if="carts.length > 0"
              color="green"
              :content="carts.length"
              overlap
            >
              <v-icon
                v-bind="attrs"
                v-on="on"
                >mdi-cart-outline
              </v-icon>
            </v-badge>
            <v-badge v-if="carts.length <= 0"
              color=""
              content=""
              overlap
            >
              <v-icon
                v-bind="attrs"
                v-on="on"
                >mdi-cart-outline
              </v-icon>
            </v-badge>
          </v-btn>
        </template>
        <span>Cart</span>
      </v-tooltip>
      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item-group>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account-settings</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Setting</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="statusLogin" @click.prevent="logout">
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>

              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="!statusLogin" @click.prevent="goLogin">
              <v-list-item-icon>
                <v-icon>mdi-login</v-icon>
              </v-list-item-icon>

              <v-list-item-title>login</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
  </v-app-bar>
<!-- </v-app> -->
</template>

<script>
import Swal from 'sweetalert2'
export default {
  data () {
    return {
      // tab: null,
      // text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  },
  methods: {
    logout () {
      this.$router.push({ path: '/' })
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't logout ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, logout it!'
      }).then((result) => {
        if (result.value) {
          Swal.fire({
            icon: 'success',
            title: `GoodBye ${localStorage.name}!!`,
            timer: 2000,
            timerProgressBar: true
          })
          this.$store.dispatch('changeIsLogin', false)
          localStorage.clear()
          this.$router.push({ path: '/' })
        }
      })
    },
    goLogin () {
      this.$router.push({ path: '/login' })
    },
    goHome () {
      this.$router.push({ path: '/' })
    },
    cartPage () {
      if (!localStorage.getItem('access_token')) {
        Swal.fire({
          title: 'Error!',
          text: 'You need to login first!',
          icon: 'error',
          confirmButtonText: 'OK'
        })
      } else {
        this.$router.push({ path: '/cart' })
      }
    },
    wishListPage () {
      if (!localStorage.getItem('access_token')) {
        Swal.fire({
          title: 'Error!',
          text: 'You need to login first!',
          icon: 'error',
          confirmButtonText: 'OK'
        })
      } else {
        // this.$router.push({ path: '/cart' })
      }
    }
  },
  created () {
    if (localStorage.getItem('access_token')) {
      this.$store.dispatch('fetchCarts')
    }
    // this.$store.dispatch('fetchCarts')
  },
  computed: {
    statusLogin () {
      return this.$store.state.isLogin
    },
    carts () {
      return this.$store.state.carts
    }
  }
}
</script>

<style>

</style>
