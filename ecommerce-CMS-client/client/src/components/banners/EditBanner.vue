<template>
  <v-card
    class=""
    elevation=""
    max-width=""
    >
    <v-card-title primary-title>
      Edit Banner
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
          @click.prevent="editiBanner"
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
      bannerId: this.$route.params.id,
      bannerTitle: this.$route.params.title,
      bannerStatus: this.$route.params.status,
      bannerImage: this.$route.params.image_url
    }
  },
  methods: {
    editiBanner () {
      this.$store.dispatch('editBanner', {
        id: this.bannerId,
        title: this.bannertitle,
        status: this.bannerStatus,
        imageUrl: this.bannerImage
      })
    }
  }
}
</script>

<style>

</style>
