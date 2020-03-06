
import axiosConfig from '../../axiosConfig'

export const getFilmsByTitle = async (keyWord) => {
  const response = await axiosConfig.get(`&s=${keyWord}`)
  if (response.data) {
    return response.data
  }
}

export const getDetailFilmsById = async (keyWord) => {
  const response = await axiosConfig.get(`&i=${keyWord}`)
  if (response.data) {
    return response.data
  }
}
export const getFilmsByTitleandYear = async (title, year) => {
  const response = await axiosConfig.get(`&s=${title}&y=${year}`)
  if (response.data) {
    return response.data
  }
}
