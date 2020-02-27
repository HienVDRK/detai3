
import axios from 'axios'
import getConfig from 'next/config'
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
console.log('publicRuntimeConfig-----', publicRuntimeConfig.APIKEY)
console.log('serverRuntimeConfig-----', serverRuntimeConfig.KEY)

export const getFilmsByTitle = async (keyWord) => {
  const response = await axios.get(`https://www.omdbapi.com/?s=${keyWord}&apikey=${publicRuntimeConfig.APIKEY}`)
  if (response.data) {
    return response.data
  }
}

export const getDetailFilmsById = async (keyWord) => {
  const response = await axios.get(`https://www.omdbapi.com/?i=${keyWord}&apikey=${publicRuntimeConfig.APIKEY}`)
  if (response.data) {
    return response.data
  }
}
