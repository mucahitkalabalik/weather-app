import axios from "axios";
export const state = () => ({
  weather: null,
  last5: null,
  city: null,
  lat: null,
  lon: null,
});

export const getters = {
  getWeather(state) {
    return state.weather;
  },
  getLast5(state) {
    return state.last5;
  },
  getCity(state) {
    return state.city;
  },
  getLon(state) {
    return state.lon;
  },
};

export const mutations = {
  setWeather(state, data) {
    state.weather = data;
  },
  setLast5(state, data) {
    state.last5 = data;
  },
  clearLast5(state) {
    state.last5 = [];
  },
  setCoord(state, cord) {
    console.log(cord);
    state.lat = cord.lat;
    state.lon = cord.lon;
    console.log(state.lat, state.lon, "mut");
  },
};

export const actions = {
  async searching({ commit, dispatch }, data) {
    await axios
      .get(`https://api.openweathermap.org/data/2.5/weather?`, data)
      .then(async (res) => {
        console.log(res, "actions");
        commit("setWeather", res.data);
        let cord = {
          lat: res.data.coord.lat,
          lon: res.data.coord.lon,
        };
        commit("setCoord", cord);
        await dispatch("get5days");
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async get5days({ state, commit }) {
    commit("clearLast5");
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${state.lat}&lon=${state.lon}&units=metric&lang=tr&appid=3e65fbf58a49832ad23554041eb8df39`
      )
      .then((res) => {
        let last = [];
        for (let index = 0; index < 5; index++) {
          const element = res.data.list[index];
          last.push(element);
        }
        commit("setLast5", last);
        console.log("5 days city", last);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
