<template>
  <v-col
    cols="4"
  >
    <v-card
      dark
      class="mx-auto black"
      max-width="344"
    >
      <v-img
        :src="product.image_url"
        height="350px"
      ></v-img>

      <v-card-title>
        {{product.name}}
      </v-card-title>

      <v-card-subtitle>
        Rp. {{ product.price.toLocaleString('id') }}
      </v-card-subtitle>
      <div class="d-flex justify-center">
        <v-btn color="green accent-4" width="200px" class="black--text" @click.prevent="addToCart(product.id)">ADD TO CART</v-btn>
      </div>

      <v-card-actions>
        <v-btn
          color="orange lighten-2"
          text
        >
          Description
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn
          icon
          @click.prevent="show = !show"
        >
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>

          <v-card-text>
            {{product.description}}
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </v-col>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  props: ['product'],
  data () {
    return {
      show: false
    }
  },
  methods: {
    addToCart (id) {
      if (!localStorage.getItem('access_token')) {
        Swal.fire({
          title: 'Error!',
          text: 'You need to login first!',
          icon: 'error',
          confirmButtonText: 'OK'
        })
        this.$router.push('/login')
      } else {
        this.$store.dispatch('addToCart', id)
      }
    }
  }
}
</script>

<style>

</style>
