import Link from 'next/link'
import Layout from '../src/layouts/DefaultLayout'
import styles from '../src/styles/detail.module.css'
import { getDetailFilmsById } from '../src/service/service'
import Cookies from 'universal-cookie'
import Helmet from 'react-helmet'
import YouTube from 'react-youtube'

function Detail (props) {
  const opts = {
    height: '465',
    width: '750',
    playerVars: {
      autoplay: 1
    }
  }
  const cookies = new Cookies()
  let btnBookmark
  let bookmarkFilm
  let imgPoster

  console.log('props.data.Title----', props.data.Title)

  const searchTrailerinYoutube = function () {
    // TODO
  }

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
        <button type='button' onClick={removeBookmark} className='btn btn-danger'>Xóa Bookmark</button>
      </div>
    )
  } else {
    btnBookmark = (
      <div>
        <button type='button' onClick={addBookmark} className='btn btn-success btn-lg' value=''>Thêm Bookmark</button>
      </div>
    )
  }

  if (props.data.Poster === 'N/A') {
    imgPoster = '/avt_default.jpg'
  } else {
    imgPoster = props.data.Poster
  }

  return (
    <Layout>
      <Helmet>
        <title>Chi tiết phim</title>
      </Helmet>
      <h1 className='text-center'>
        Trang chi tiết bộ phim
      </h1>
      <hr />
      <Link href='/search'>
        <button type='button' className='btn btn-primary'>Quay lại trang tìm kiếm</button>
      </Link>
      <br /><br />
      <div>
        <div className='row'>
          <div className='col-xs-4 col-sm-4 col-md-4 col-lg-4'>
            <img src={imgPoster} className={styles.imgPoster} />
          </div>
          <div className='col-xs-8 col-sm-8 col-md-8 col-lg-8'>
            <div className={styles.videoTrailer}>
              <YouTube
                videoId='DDT1ac-os6M'
                opts={opts}
              />
            </div>
          </div>
        </div>
        <br />
        <div className='row'>
          <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
            <span className={styles.info_films}>{props.data.Plot}</span><br /><br />
            <span className={styles.info_films}><b>Title :</b> {props.data.Title}</span><br />
            <span className={styles.info_films}><b>Released :</b> {props.data.Released}</span><br />
            <span className={styles.info_films}><b>Genre :</b> {props.data.Genre}</span><br />
            <span className={styles.info_films}><b>Director :</b> {props.data.Director}</span><br />
            <span className={styles.info_films}><b>Writers :</b> {props.data.Writer}</span><br />
            <span className={styles.info_films}><b>Stars :</b> {props.data.Actors}</span><br />
            <span className={styles.info_films}><b>Awards :</b> {props.data.Awards}</span><br />
            <span className={styles.info_films}><b>Runtime :</b> {props.data.Runtime}</span><br />
            <span className={styles.info_films}><b>Type :</b> {props.data.Type}</span><br />
            <span className={styles.info_films}><b>Rated :</b> {props.data.Rated}</span><br />
          </div>
        </div>
      </div>
      <hr />
      {btnBookmark}
    </Layout>
  )
}

Detail.getInitialProps = async ({ query: { idFilm } }) => {
  const getFilms = await getDetailFilmsById(idFilm)
  return {
    data: getFilms
  }
}

export default Detail
