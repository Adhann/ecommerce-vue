<template>
  <v-col
    cols="12"
    class="py-5"
  >
    <!-- <v-card
      dark
      class="mx-auto black"
      max-width="344"
    >
      <v-img
        :src="cart.Product.image_url"
        height="350px"
      ></v-img>

      <v-card-title>
        {{cart.Product.name}}
      </v-card-title>

      <v-card-subtitle>
        Rp. {{ cart.Product.price.toLocaleString('id') }}
      </v-card-subtitle>
      <div class="d-flex justify-center">
        <v-btn color="green accent-4" width="200px" class="black--text" @click.prevent="addToCart()">ADD TO CART {{cart.Product.id}}</v-btn>
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
          @click="show = !show"
        >
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>

          <v-card-text>
            {{cart.Product.description}}
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card> -->
  <v-card
      dark
      class="black m-2"
      elevation=""
      max-width=""
    >
    <div class="row">
      <div class="col col-2">
        <v-img
        :src="cart.Product.image_url"
        height="100px"
      ></v-img>
      </div>
      <div class="col col-4 px-0">
        <v-card-text class="pb-0 px-0">
        {{ cart.Product.name }}
        </v-card-text>
        <v-card-text class="pb-0 px-0 pt-2">
        Rp. {{ cart.Product.price.toLocaleString('id') }}
        </v-card-text>
      </div>
      <div class="col col-3 my-auto">
        <div class="row justify-center align-center align-content-center">
          <!-- <v-card-text>{{cart.quantity}}</v-card-text> -->
          <p class="pr-7 ma-0">{{cart.quantity}}</p>
          <!-- <p class="pr-7 ma-0">{{cart.Product.id}}</p> -->
          <v-btn
            class="mx-2"
            fab
            dark
            small
            color="red darken-3"
            @click.prevent="minusQty(cart.Product.id)"
          >
            <v-icon dark>
              mdi-minus
            </v-icon>
          </v-btn>
          <v-text-field
            v-model="cart.quantity"
            class="mt-7 dark"
            rounded
            solo
            dense
            placeholder=""
            light
            type="number"
            min="0"
          ></v-text-field>
          <v-btn
            class="mx-2"
            fab
            dark
            small
            color="primary"
            @click.prevent="updateCart(cart.Product.id)"
          >
            <v-icon dark>
              mdi-plus
            </v-icon>
          </v-btn>
        </div>
      </div>
      <div class="col col-2 px-0 my-auto text-lg-center">
        <v-card-text class="">
          Rp. {{ totalPrice.toLocaleString('id') }}
        </v-card-text>
      </div>
      <div class="col col-1 px-0 my-auto text-lg-center pr-15">
        <v-btn small elevation="" color="red darken-3" @click.prevent="deleteCart(cart.id)">Remove</v-btn>
      </div>
    </div>
  </v-card>
  </v-col>
</template>

<script>
export default {
  props: ['cart'],
  data () {
    return {
      show: false,
      totalPrice: `${this.cart.Product.price * this.cart.quantity}`
    }
  },
  methods: {
    updateCart (id) {
      this.$store.dispatch('updateQty', id)
      this.cart.totalPrice = this.cart.Product.price * (this.cart.quantity + 1)
      this.totalPrice = this.cart.totalPrice
    },
    minusQty (id) {
      if (this.cart.quantity === 1) {
        this.$store.dispatch('deleteCart', id)
      } else {
        this.cart.totalPrice = this.cart.Product.price * (this.cart.quantity - 1)
        this.totalPrice = this.cart.totalPrice
        this.cart.quantity = this.cart.quantity - 1
      }
    },
    deleteCart (id) {
      this.$store.dispatch('deleteCart', id)
    }
  },
  created () {
    this.$store.dispatch('fetchCarts')
    this.cart.totalPrice = this.cart.Product.price * this.cart.quantity
  }
}
</script>

<style scoped>
.v-text-field {
      width: 10px !important;
}
</style>
