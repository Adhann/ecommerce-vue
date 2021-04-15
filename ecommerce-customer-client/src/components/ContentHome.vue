<template>
  <v-main>
    <v-container class="">
      <div class="white">
      </div>
      <h2 class="text-center pt-2 pb-5 white--text">All Product</h2>
      <!-- <v-row>
        <v-col
          v-for="n in 24"
          :key="n"
          cols="4"
        >
          <v-card height="200"></v-card>
        </v-col>
      </v-row> -->
      <v-row>
       <CardProducts
        v-for="product in products"
        :key="product.id"
        :product="product"
        >
      </CardProducts>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import CardProducts from '../components/CardProducts'
export default {
  components: {
    CardProducts
  },
  data () {
    return {
    }
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  created () {
    this.$store.dispatch('fetchProducts')
  }
}
</script>

<style>

</style>
