<template>
<div>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="products"
      item-key="id"
      class="elevation-1 text-center"
      :search="search"
    >
    <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Products</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
                v-model="search"
                label="Search"
                single-line
                hide-details
            ></v-text-field>
            <v-btn elevation="" color="info" class="ml-10" :to="{ name: 'addProductPage' }">Add item</v-btn>
            <!-- <router-link color="info" class="ml-10" :to="{ name: 'addProductPage' }">Add</router-link> -->
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                New Item
              </v-btn>
            </template>
        </v-toolbar>
      </template>
    <template v-slot:[`item.image_url`]="{ item }">
      <v-img max-height="75" max-width="200" :src="item.image_url"></v-img>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
        <v-btn small class="mx-2"
          :to="{ name: 'editProductPage',
            params: {
              id: item.id,
              name: item.name,
              description: item.description,
              price: item.price,
              stock: item.stock,
              category: item.category,
              image_url: item.image_url } }">
          <v-icon class="" color="blue">mdi-pencil</v-icon>
        </v-btn>
        <v-btn small mx-2 @click="deleteProduct(item.id)">
          <v-icon color="red">mdi-delete</v-icon>
        </v-btn>
    </template>
    </v-data-table>
  </v-card>
</div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      search: '',
      name: '',
      description: '',
      price: '',
      stock: '',
      image_url: '',
      headers: [
        { text: 'Name', value: 'name', width: '30%' },
        { text: 'Description', value: 'description' },
        { text: 'Price', value: 'price' },
        { text: 'Stock', value: 'stock' },
        { text: 'Category', value: 'category' },
        { text: 'Image', value: 'image_url', sortable: false, width: '10%' },
        { text: 'Action', value: 'actions', sortable: false, width: '15%' }
      ]
    }
  },
  methods: {
    editItem (id) {
      this.$store.dispatch('fetchProductsById', id)
    },

    deleteProduct (id) {
      this.$store.dispatch('deleteProduct', id)
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
