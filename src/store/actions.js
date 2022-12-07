import axios from "axios";
import api from "@/api";

export const getWeathers = ({ commit }) => {
  api.get('/').then(response => {
    commit('SET_WEATHERS', response.data);
  })
}

export const getWeather = ({ commit }, cityName ) => {
  api.get(`/${cityName}`).then(response => {
    commit('SET_WEATHER', response.data);
  })
}

export const getPlaces = ({ commit }, input) => {
  api.post(`/search`, {
    'input': input
  }).then(response => {
    commit('SET_PLACES', response.data);
  })
}
