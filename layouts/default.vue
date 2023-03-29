<template>
  <v-app>
    <appheader />
    <v-container>
      <nuxt />
    </v-container>
  </v-app>
</template>

<script>
import appheader from "../components/appheader.vue";
export default {
  components: { appheader },
};
</script>

<style></style>
