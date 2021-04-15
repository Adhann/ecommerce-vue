<template>
<div>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="banners"
      item-key="id"
      class="elevation-1 text-center"
      :search="search"
    >
    <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Banners</v-toolbar-title>
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
            <v-btn elevation="" color="info" class="ml-10" :to="{ name: 'addBannerPage' }">Add item</v-btn>
            <!-- <router-link color="info" class="ml-10" :to="{ name: 'addBannerPage' }">Add</router-link> -->
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
          :to="{ name: 'editBannerPage',
            params: {
              id: item.id,
              title: item.title,
              status: item.status,
              image_url: item.image_url } }">
          <v-icon class="" color="blue">mdi-pencil</v-icon>
        </v-btn>
        <v-btn small mx-2 @click="deleteBanner(item.id)">
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
      title: '',
      status: false,
      image_url: '',
      headers: [
        { text: 'Image', value: 'image_url', sortable: false, width: '15%' },
        { text: 'Title', value: 'title' },
        { text: 'Status', value: 'status' },
        { text: 'Action', value: 'actions', sortable: false, width: '15%' }
      ]
    }
  },
  methods: {
    editItem (id) {
      this.$store.dispatch('fetchBannersById', id)
    },
    deleteBanner (id) {
      this.$store.dispatch('deleteBanner', id)
    }
  },
  computed: {
    banners () {
      return this.$store.state.banners
    }
  },
  created () {
    this.$store.dispatch('fetchBanners')
  }
}
</script>

<style>

</style>
