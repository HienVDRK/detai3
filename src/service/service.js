
import axios from 'axios'

export const getFilmsByTitle = async (keyWord) => {
  const response = await axios.get(`http://www.omdbapi.com/?s=${keyWord}&apikey=dd31b83b`)
  if (response.data) {
    return response.data
  }
}

export const getDetailFilmsById = async (keyWord) => {
  const response = await axios.get(`http://www.omdbapi.com/?i=${keyWord}&apikey=dd31b83b`)
  if (response.data) {
    return response.data
  }
}
