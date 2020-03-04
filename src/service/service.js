
import getConfig from 'next/config'
import axiosConfig from '../../axiosConfig'
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
console.log(serverRuntimeConfig.APIKEY)
export const getFilmsByTitle = async (keyWord) => {
  const response = await axiosConfig.get(`/?s=${keyWord}&apikey=${serverRuntimeConfig.APIKEY}`)
  if (response.data) {
    return response.data
  }
}

export const getDetailFilmsById = async (keyWord) => {
  const response = await axiosConfig.get(`/?i=${keyWord}&apikey=${serverRuntimeConfig.APIKEY}`)
  if (response.data) {
    return response.data
  }
}
export const getFilmsByTitleandYear = async (title, year) => {
  const response = await axiosConfig.get(`/?s=${title}&y=${year}&apikey=${serverRuntimeConfig.APIKEY}`)
  if (response.data) {
    return response.data
  }
}
