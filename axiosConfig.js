
import axios from 'axios'
import getConfig from 'next/config'
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
const apiKey = serverRuntimeConfig.APIKEY ? serverRuntimeConfig.APIKEY : publicRuntimeConfig.APIKEY

const axiosConfig = axios.create({
  baseURL: `https://www.omdbapi.com/?apikey=${apiKey}&`
})
export default axiosConfig
