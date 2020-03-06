
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
export const getFilmsByTitleYearPage = async (title, year, page) => {
  const response = await axiosConfig.get(`&s=${title}&y=${year}&page=${page}`)
  if (response.data) {
    return response.data
  }
}
