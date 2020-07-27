import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'

const axiosInstance = axios.create({
  paramsSerializer: params => {
    return qs.stringify(params, { arrayFormat: 'repeat' })
  },
  baseURL: process.env.DEVELOP ?'http://localhost:8080' : 'https://bandpadtest.com/bandpadPaymentsAPI/'
})

const setErrorInterceptor = (errorFunction) => {
  axiosInstance.interceptors.response.use((response) => {
    return response
  }, (error) => {
    if (!error.response) {
      errorFunction()
    }
    return Promise.reject(error)
  })
}

const setBaseURL = (baseURL) => {
  axiosInstance.defaults.baseURL = baseURL
}

Vue.prototype.$axios = axiosInstance

export { axiosInstance, setErrorInterceptor, setBaseURL }
