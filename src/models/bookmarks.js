import Cookies from 'universal-cookie'
const cookies = new Cookies()

export function getBookmark () {
  let bookmarkFilm
  if (cookies.get('bookmarks') === undefined) {
    bookmarkFilm = []
  } else {
    bookmarkFilm = cookies.get('bookmarks')
  }
  return bookmarkFilm
}

export function setBookmark (props, bookmark) {
  if (props === '') {
    cookies.set('bookmarks', JSON.stringify(bookmark))
  } else {
    const { imdbID, Title, Poster, Year, Type } = props.data
    bookmark.push({
      imdbID: imdbID,
      Title: Title,
      Poster: Poster,
      Year: Year,
      Type: Type
    })
    cookies.set('bookmarks', JSON.stringify(bookmark))
  }
}
