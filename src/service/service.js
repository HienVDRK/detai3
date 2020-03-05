
import getConfig from 'next/config'
import axiosConfig from '../../axiosConfig'
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
const apiKey = serverRuntimeConfig.APIKEY ? serverRuntimeConfig.APIKEY : publicRuntimeConfig.APIKEY
console.log(apiKey)
export const getFilmsByTitle = async (keyWord) => {
  const response = await axiosConfig.get(`/?s=${keyWord}&apikey=${apiKey}`)
  if (response.data) {
    return response.data
  }
}

export const getDetailFilmsById = async (keyWord) => {
  const response = await axiosConfig.get(`/?i=${keyWord}&apikey=${apiKey}`)
  if (response.data) {
    return response.data
  }
}
export const getFilmsByTitleandYear = async (title, year) => {
  const response = await axiosConfig.get(`/?s=${title}&y=${year}&apikey=${apiKey}`)
  if (response.data) {
    return response.data
  }
}
