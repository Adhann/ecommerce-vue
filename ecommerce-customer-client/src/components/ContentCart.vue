<template>
  <v-main>
    <v-container class="">
      <div class="white">
      </div>
      <h2 class="text-center pt-2 pb-5 white--text">All Your Cart </h2>
      <!-- <pre class="white">{{carts}}</pre>    -->
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
       <CardCarts
        v-for="cart in carts"
        :key="cart.id"
        :cart="cart"
        >
      </CardCarts>
        <!-- <pre class="white">{{carts.user_id}}asdasd</pre> -->
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import CardCarts from '../components/CardCarts'
export default {
  components: {
    CardCarts
  },
  data () {
    return {
    }
  },
  computed: {
    carts () {
      return this.$store.state.carts
    }
  },
  created () {
    this.$store.dispatch('fetchCarts')
  }
}
</script>

<style>

</style>
