<template>
  <v-card
    class=""
    elevation=""
    max-width=""
    >
    <v-card-title primary-title>
      Edit Product
    </v-card-title>
    <v-card-text>
      <form>
        <v-text-field
          v-model="productName"
          label="Name"
          required
        ></v-text-field>
        <v-text-field
          v-model="productDescription"
          label="Description"
          required
        ></v-text-field>
        <v-text-field
          v-model="productPrice"
          type="number"
          min="0"
          label="Price"
          required
        ></v-text-field>
        <v-text-field
          v-model="productStock"
          type="number"
          min="0"
          label="Stock"
          required
        ></v-text-field>
        <v-text-field
          v-model="productCategory"
          label="Category"
          required
        ></v-text-field>
        <!-- <v-file-input
          prepend-icon="mdi-camera"
          v-model="productImage"
          accept="image/*"
          label="product Image"
          ></v-file-input> -->
          <v-text-field
          v-model="productImage"
          label="Image Url"
          required
        ></v-text-field>
        <v-btn
          class="mr-4"
          @click.prevent="editiProduct"
        >
          submit
        </v-btn>
      </form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      productId: this.$route.params.id,
      productName: this.$route.params.name,
      productDescription: this.$route.params.description,
      productPrice: this.$route.params.price,
      productStock: this.$route.params.stock,
      productCategory: this.$route.params.category,
      productImage: this.$route.params.image_url
    }
  },
  methods: {
    editiProduct () {
      console.log(this.productName, '<< prod')
      this.$store.dispatch('editProduct', {
        id: this.productId,
        name: this.productName,
        description: this.productDescription,
        price: this.productPrice,
        stock: this.productStock,
        category: this.productCategory,
        imageUrl: this.productImage
      })
    }
  }
}
</script>

<style>

</style>
