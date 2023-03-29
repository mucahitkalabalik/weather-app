<template>
  <div class="d-flex align-center justify-center flex-wrap" v-if="getLast5">
    <v-list
      class="d-flex align-center justify-center list-item mr-3 mb-2 rounded-xl"
      v-for="(item, index) in getLast5"
      :key="item + index"
    >
      <v-list-item
        class="d-flex flex-column align-start justify-start py-3 px-5 ma-2"
      >
        <v-list-item-title class="mb-5 title text-h3">
          {{ format_time(item.dt) }}
        </v-list-item-title>
        <v-list-item-title class="mb-4">
          {{ item.weather[0].description.toUpperCase() }}
        </v-list-item-title>
        <v-list-item-title>
          Sıcaklık {{ Math.ceil(item.main.temp) }}°C
        </v-list-item-title>
        <v-list-item-title>
          Minimum Sıcaklık {{ Math.ceil(item.main.temp_min) }}°C
        </v-list-item-title>
        <v-list-item-title class="mb-4">
          Maksimum Sıcaklık {{ Math.ceil(item.main.temp_max) }}°C
        </v-list-item-title>
        <v-list-item-title>
          Rüzgar:
          {{ Math.ceil(item.wind.speed) }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("weather", ["getLast5"]),
  },
  methods: {
    format_time(s) {
      return new Date(s * 1e3).toISOString().slice(-13, -5);
    },
  },
};
</script>

<style>
.list-item {
  opacity: 0.8;
  width: 220px;
  animation: pulse 1000ms cubic-bezier(0.9, 0.7, 0.5, 0.9);
}

@keyframes pulse {
  0% {
    transform: rotateY(180deg);
  }
  50% {
    transform: rotateY(0deg);
  }
}
</style>