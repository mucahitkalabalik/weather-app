<template>
  <v-card
    class="d-flex align-center justify-center pa-2 search-card"
    variant="tonal"
  >
    <v-row>
      <v-col offset-lg="2" offset-md="2" lg="9" md="9" class="d-flex">
        <v-icon class="mr-3">mdi-map-marker-radius</v-icon>
        <v-text-field
          v-model="city"
          label="İl yada İlçe Girin"
          color="indigo-darken-4"
          variant="outlined"
        ></v-text-field
      ></v-col>
    </v-row>
    <v-col lg="1" md="1">
      <v-btn variant="tonal" color="info" @click="search()">
        <v-icon>mdi-magnify</v-icon>Ara</v-btn
      ></v-col
    >
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      city: "",
      current: null,
      appid: "d6be614ecc40781bd4e51ce77440004d",
      units: "metric",
      lang: "tr",
    };
  },

  methods: {
    async search() {
      let data = {
        params: {
          q: this.city,
          appid: this.appid,
          units: this.units,
          lang: this.lang,
        },
      };
      await this.$store.dispatch("weather/searching", data);
    },
  },
};
</script>

<style>
.search-card {
  background: linear-gradient(90deg, #298aab 0%, #fff 100%) !important;
}
</style>