<template>
  <div>
    <v-card v-if="!getWeather && !current" class="w-100 h-100">
      <v-progress-linear indeterminate color="cyan"></v-progress-linear>
    </v-card>

    <v-card
      v-if="getWeather || current"
      class="show-card d-flex align-center justify-center flex-column mt-5 rounded-xl elevation-20"
    >
          <v-card-title>
            KONUM: {{ getWeather ? getWeather.name : current.name }}
          </v-card-title>
          <v-card-title>
            HAVA:
            {{
              getWeather
                ? getWeather.weather[0].description
                : current.weather[0].description
            }}
          </v-card-title>
    
          <v-card-title>
            <v-chip class="ma-5 text-h6" size="x-large" color="blue-lighten-4">
              Rüzgar:
              {{
                Math.ceil(
                  getWeather ? getWeather.wind.speed : current.wind.speed
                )
              }}
            </v-chip>
          </v-card-title>
          <v-card-title>
            <v-chip class="ma-5 text-h6" size="x-large" color="blue-lighten-4">
              Sıcaklık:
              {{
                Math.ceil(
                  getWeather ? getWeather.main.temp : current.main.temp
                )
              }}°C
            </v-chip>
          </v-card-title>

          <v-card-title>
            <v-chip class="ma-5 text-h6" size="x-large" color="blue-lighten-4">
              Minimum Sıcaklık:
              {{
                Math.ceil(
                  getWeather ? getWeather.main.temp_min : current.main.temp_min
                )
              }}°C
            </v-chip>
          </v-card-title>
          <v-card-title>
            <v-chip class="ma-5 text-h6" size="x-large" color="blue-lighten-4">
              Maksimum Sıcaklık:
              {{
                Math.ceil(
                  getWeather ? getWeather.main.temp_max : current.main.temp_max
                )
              }}°C
            </v-chip>
          </v-card-title>
    </v-card>
    <v-card
      v-if="getWeather || current"
      class="show-card mt-10 rounded-xl elevation-20"
    >
      <v-row>
        <v-col>
          <last-5 class="my-10" />
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import last5 from "@/components/last5.vue";
export default {
  comments: {
    last5,
  },
  data() {
    return {
      lon: null,
      lat: null,
      current: null,
    };
  },
  computed: {
    ...mapGetters("weather", ["getWeather"]),
  },
  async mounted() {
    this.getLocation();
  },
  // watch: {
  //   async stateLon(newValue) {
  //     console.log(newValue, "watch");
  //     await this.get5days();
  //   },
  // },
  methods: {
    async getCurrent() {
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&units=metric&lang=tr&appid=d6be614ecc40781bd4e51ce77440004d`
        )
        .then(async (res) => {
          this.current = res.data;
          this.$store.city = res.data.name;
          let cords = {
            lat: res.data.coord.lat,
            lon: res.data.coord.lon,
          };
          this.$store.commit("weather/setCoord", cords);
          console.log(this.$store, "this.$store");
          await this.$store.dispatch("weather/get5days");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getLocation() {
      console.log(navigator, "navigaotr");
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          this.showPosition,
          this.showError
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    },
    showPosition(position) {
      this.lat = position.coords.latitude;
      this.lon = position.coords.longitude;
      this.getCurrent();
    },
    showError(error) {
      console.log("getCurrentPosition returned error", error);
    },
  },
};
</script>

<style>
.show-card {
  background: linear-gradient(90deg, #fff 0%, #298aab 100%) !important;
}
</style>
