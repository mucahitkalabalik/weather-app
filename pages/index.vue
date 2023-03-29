<template>
  <v-row>
    <v-col cols="12"><search /></v-col>
    <v-col cols="12"><show class="mb-10" /></v-col>
  </v-row>
</template>

<script>
import search from "@/components/search.vue";
import show from "@/components/show.vue";
export default {
  components: { search, show },
};
</script>

<style>
</style>
