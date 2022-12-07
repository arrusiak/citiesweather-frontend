import axios from "axios";
import Vue from "vue";

const api = axios.create({
  withCredentials: false,
  baseURL: "http://localhost:8000/api",
  headers: {
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
})

api.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  Vue.$toast.open({
    message: error.response.statusText,
    type: 'error'
  });
  return Promise.reject(error);
});

export default api;
