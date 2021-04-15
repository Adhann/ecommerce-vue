<template>
  <v-main>
    <v-container class="px-4 py-0 fill-height" fluid>
      <v-row class="fill-height">
        <v-col>
          <transition name="fade">
            <router-view></router-view>
          </transition>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {

}
</script>

<style>

</style>
