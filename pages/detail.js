import Link from 'next/link'
import Layout from '../src/layouts/DefaultLayout'
import styles from '../src/styles/detail.module.css'
import { getDetailFilmsById } from '../src/service/service'
import Cookies from 'universal-cookie'

function Detail (props) {
  const cookies = new Cookies()
  let btnBookmark
  let bookmarkFilm

  const addBookmark = function () {
    if (cookies.get('bookmark') === undefined) {
      bookmarkFilm = []
    } else {
      bookmarkFilm = cookies.get('bookmark')
    }
    if (bookmarkFilm && bookmarkFilm.some(film => film.imdbID === props.data.imdbID)) {
      window.alert(`Phim ${props.data.Title} đã bookmark rồi!`)
    } else {
      bookmarkFilm.push({
        imdbID: props.data.imdbID,
        Title: props.data.Title,
        Poster: props.data.Poster,
        Year: props.data.Year,
        Type: props.data.Type
      })
      const jsonStr = JSON.stringify(bookmarkFilm)
      cookies.set('bookmark', jsonStr, { path: '/' })
      window.alert(`Thêm bookmark ${props.data.Title} thành công!`)
    }
  }

  const removeBookmark = function () {
    const getBookmarkFilm = cookies.get('bookmark')
    const index = getBookmarkFilm.findIndex(film => film.imdbID === props.data.imdbID)
    getBookmarkFilm.splice(index, 1)
    const jsonStr = JSON.stringify(getBookmarkFilm)
    cookies.set('bookmark', jsonStr)
    window.alert(`Xóa bookmark ${props.data.Title} thành công!`)
  }

  if (cookies.get('bookmark') && cookies.get('bookmark').some(film => film.imdbID === props.data.imdbID)) {
    btnBookmark = (
      <div>
        <button type='button' onClick={removeBookmark} className='btn btn-danger'>Xóa Bookmark</button><br /><br />
      </div>
    )
  } else {
    btnBookmark = (
      <div>
        <button type='button' onClick={addBookmark} className='btn btn-success'>Thêm Bookmark</button><br /><br />
      </div>
    )
  }
  return (
    <Layout>
      <h1 className='text-center'>
        Trang chi tiết bộ phim
      </h1>
      <hr />
      {btnBookmark}
      <div className='row'>
        <div className='col-xs-4 col-sm-4 col-md-4 col-lg-4'>
          <img src={props.data.Poster} className='img-responsive' />
        </div>
        <div className='col-xs-8 col-sm-8 col-md-8 col-lg-8'>
          <span className={styles.info_films}>ID IMDB : {props.data.imdbID}</span><br />
          <span className={styles.info_films}>Title : {props.data.Title}</span><br />
          <span className={styles.info_films}>Released : {props.data.Released}</span><br />
          <span className={styles.info_films}>Genre : {props.data.Genre}</span><br />
          <span className={styles.info_films}>Rated : {props.data.Rated}</span><br />
          <span className={styles.info_films}>Runtime : {props.data.Runtime}</span><br />
          <span className={styles.info_films}>Writer : {props.data.Writer}</span><br />
          <span className={styles.info_films}>Actors : {props.data.Actors}</span><br />
          <span className={styles.info_films}>Awards : {props.data.Awards}</span><br />
          <span className={styles.info_films}>Type : {props.data.Type}</span><br />
          <span className={styles.info_films}>Plot : {props.data.Plot}</span><br />
        </div>
      </div>
      <br />
      <hr />
      <Link href='/search'>
        <button type='button' className='btn btn-primary'>Quay lại trang tìm kiếm</button>
      </Link>
    </Layout>
  )
}

Detail.getInitialProps = async (props) => {
  const getFilms = await getDetailFilmsById(props.query.idFilm)
  return {
    data: getFilms
  }
}

export default Detail
