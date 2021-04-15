<template>
  <v-card
    class=""
    elevation=""
    max-width=""
    >
    <v-card-title primary-title>
      Add Banner
    </v-card-title>
    <v-card-text>
      <form>
        <v-text-field
          v-model="bannerTitle"
          label="Name"
          required
        ></v-text-field>
        <v-switch
          v-model="bannerStatus"
          inset
          label="Active"
        ></v-switch>
        <!-- <v-text-field
          v-model="bannerStatus"
          label="Status"
          required
        ></v-text-field> -->
        <!-- <v-file-input
          prepend-icon="mdi-camera"
          v-model="bannerImage"
          accept="image/*"
          label="banner Image"
          ></v-file-input> -->
          <v-text-field
          v-model="bannerImage"
          label="Image url"
          required
        ></v-text-field>
        <v-btn
          class="mr-4"
          @click.prevent="addingBanner"
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
      bannerTitle: '',
      bannerStatus: false,
      bannerImage: ''
    }
  },
  methods: {
    addingBanner () {
      console.log(this.bannerImage, '<< file image')
      this.$store.dispatch('addBanner', {
        title: this.bannerTitle,
        status: this.bannerStatus,
        imageUrl: this.bannerImage
      })
    }
  }
}
</script>

<style>

</style>
