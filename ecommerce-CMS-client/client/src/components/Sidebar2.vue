<template>
  <v-navigation-drawer>
      <v-list-item class="px-2">
          <v-list-item-avatar>
              <v-icon class="white--text">mdi-account-outline</v-icon>
          </v-list-item-avatar>
          <v-list-item-content class="text-truncate white--text">
              Jane Doeski
          </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list>
          <v-list-item v-for="item in items" :key="item.title" link :to="item.href">
              <v-list-item-icon>
                  <v-icon color="teal">{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                  <v-list-item-title class="teal--text">{{ item.title }}</v-list-item-title>
              </v-list-item-content>
          </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
  props: ['sidebarMenu', 'items', 'mini']
}
</script>

<style>

</style>
