
import axios from 'axios'

const axiosConfig = axios.create({
  baseURL: 'https://www.omdbapi.com'
})
export default axiosConfig
