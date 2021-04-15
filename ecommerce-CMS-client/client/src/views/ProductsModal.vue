<template>
<div>
  <!-- <Sidebar /> -->
  <v-card>
    <v-card-title>
      Products
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
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
          <v-toolbar-title>My CRUD</v-toolbar-title>
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
          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
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
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.name"
                        label="Dessert name"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.calories"
                        label="Calories"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.fat"
                        label="Fat (g)"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.carbs"
                        label="Carbs (g)"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.protein"
                        label="Protein (g)"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
    <template v-slot:[`item.image_url`]="{ item }">
      <v-img max-height="75" max-width="200" :src="item.image_url"></v-img>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item.id)" color="blue">mdi-pencil</v-icon>{{item.id}}
        <v-icon small @click="deleteItem(item.id)" color="red">mdi-delete</v-icon>
    </template>
    </v-data-table>
  </v-card>
  <!-- <Footer /> -->

</div>
</template>

<script>
// import Footer from '../components/Footer.vue'
// import Sidebar from '../components/Sidebar.vue'
export default {
  components: {
    // Footer
    // Sidebar
  },
  data () {
    return {
      dialog: false,
      dialogDelete: false,
      product: {},
      search: '',
      image: null,
      editedIndex: -1,
      headers: [
        { text: 'Name', value: 'name', width: '30%' },
        { text: 'Description', value: 'description' },
        { text: 'Price', value: 'price' },
        { text: 'Stock', value: 'stock' },
        { text: 'Category', value: 'category' },
        { text: 'Image', value: 'image_url', sortable: false, width: '10%' },
        { text: 'Action', value: 'actions', sortable: false, width: '10%' }
      ],
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      }
    }
  },
  methods: {
    editItem (id) {
      this.editedIndex = id
      this.editedItem = Object.assign({}, id)
      this.$store.dispatch('fetchProductsById', id)
      console.log(this.$store.dispatch('fetchProductsById', id), '<<< DISPATCH')
      console.log(this.editItem, '<<eddititem')
      this.dialog = true
    },

    deleteItem (id) {
      this.editedIndex = id
      this.editedItem = Object.assign({}, id)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    }
  },
  computed: {
    products () {
      // return this.$store.state.products.map(product => ({
      //   id: product.id,
      //   image_url: product.image_url
      // }))
      return this.$store.state.products
    },
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },
  created () {
    this.$store.dispatch('fetchProducts')
  }
}
</script>

<style>

</style>
