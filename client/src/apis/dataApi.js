import axios from 'axios'
const BASE_URL = 'http://api-hitrello.herokuapp.com/'
export default axios.create({
  baseURL: BASE_URL
})

export const dataApiPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
})