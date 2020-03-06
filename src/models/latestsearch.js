import Cookies from 'universal-cookie'
const cookies = new Cookies()

export function setLatestSearch (objLatest) {
  cookies.set('latestsearch', objLatest)
}
export function getLatestSearch () {
  return cookies.get('latestsearch')
}
