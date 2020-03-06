import React, { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import getConfig from 'next/config'
import YouTube from 'react-youtube'
import YTSearch from 'youtube-api-search'
import Layout from '../src/layouts/DefaultLayout'
import styles from '../src/styles/detail.module.css'
import { getDetailFilmsById } from '../src/service/service'
import { getBookmark, setBookmark, deleteBookmark } from '../src/models/bookmarks'
import { getUser } from '../src/models/user'

function Detail (props) {
  const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
  const apiKeyYT = serverRuntimeConfig.API_KEY_YT ? serverRuntimeConfig.API_KEY_YT : publicRuntimeConfig.API_KEY_YT
  const opts = {
    height: '465',
    width: '100%',
    playerVars: {
      autoplay: 0
    }
  }
  const [video, setVideo] = useState({ videoId: '' })
  const trailerFilm = `${props.data.Title} trailer`
  const getBookmarkFilm = getBookmark()
  const getUserLogin = getUser(1)
  let btnBookmark
  let imgPoster
  let ratings

  const onFilterVideo = (trailerFilm) => {
    YTSearch({ key: apiKeyYT, term: trailerFilm }, (videos) => {
      setVideo({ videoId: videos[0].id.videoId })
    })
  }

  const _onReady = (event) => {
    onFilterVideo(trailerFilm)
    event.target.pauseVideo()
  }

  const addBookmark = () => {
    if (getUserLogin) {
      if (getBookmarkFilm && getBookmarkFilm.some(film => film.imdbID === props.data.imdbID)) {
        window.alert(`Phim ${props.data.Title} đã bookmark rồi!`)
      } else {
        setBookmark(props, getBookmarkFilm)
        window.alert(`Thêm bookmark ${props.data.Title} thành công!`)
      }
    } else {
      window.alert('Đăng nhập trước khi thêm phim vào bookmark!')
    }
  }

  const removeBookmark = () => {
    if (getUserLogin) {
      deleteBookmark(props, getBookmarkFilm)
      window.alert(`Xóa bookmark ${props.data.Title} thành công!`)
    } else {
      window.alert('Đăng nhập trước khi xóa phim khỏi bookmark!')
    }
  }

  if (props.data.Poster === 'N/A') {
    imgPoster = '/avt_default.jpg'
  } else {
    imgPoster = props.data.Poster
  }

  if (props.data.Ratings && props.data.Ratings[0] !== undefined) {
    ratings = props.data.Ratings[0].Value
  } else {
    ratings = null
  }

  if (getUserLogin) {
    if (getBookmarkFilm && getBookmarkFilm.some(film => film.imdbID === props.data.imdbID)) {
      btnBookmark = (
        <div>
          <button
            type='button'
            onClick={removeBookmark}
            className='btn btn-danger btn-lg'
          >
            Xóa Bookmark
          </button>
        </div>
      )
    } else {
      btnBookmark = (
        <div>
          <button
            type='button'
            onClick={addBookmark}
            className='btn btn-success btn-lg'
            value=''
          >
            Thêm Bookmark
          </button>
        </div>
      )
    }
  }

  return (
    <Layout>
      <Head>
        <title>Phim : {props.data.Title}</title>
      </Head>
      <h1 className='text-center'>
        Trang chi tiết bộ phim
      </h1>
      <hr />
      <Link href='/search'>
        <button
          type='button'
          className='btn btn-primary'
        >
          Quay lại trang tìm kiếm
        </button>
      </Link>
      <br />
      <div>
        <div className='row'>
          <div className='col-sm-10 col-md-10 col-lg-10'>
            <h1>{props.data.Title} ({props.data.Year})</h1>
            <span> {props.data.Rated}</span> |
            <span> {props.data.Runtime}</span> |
            <span> {props.data.Genre}</span> |
            <span> {props.data.Released}</span>
            <br />
            <br />
          </div>
          <div className='col-sm-2 col-md-2 col-lg-2'>
            <h3>{ratings}</h3>
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-4 col-md-4 col-lg-4'>
            <img src={imgPoster} className={styles.imgPoster} />
          </div>
          <div className='col-sm-8 col-md-8 col-lg-8'>
            <div className={styles.videoTrailer}>
              <YouTube
                videoId={video.videoId}
                opts={opts}
                onReady={_onReady}
              />
            </div>
          </div>
        </div>
        <br />
        <div className='row'>
          <div className='col-sm-12 col-md-12 col-lg-12'>
            <span className={styles.info_films}>{props.data.Plot}</span><br /><br />
            <span className={styles.info_films}><b>Director :</b> {props.data.Director}</span><br />
            <span className={styles.info_films}><b>Writers :</b> {props.data.Writer}</span><br />
            <span className={styles.info_films}><b>Stars :</b> {props.data.Actors}</span><br />
            <span className={styles.info_films}><b>Awards :</b> {props.data.Awards}</span><br />
          </div>
        </div>
      </div>
      <hr />
      {btnBookmark}
    </Layout>
  )
}

Detail.getInitialProps = async ({ query: { filmId } }) => {
  const film = await getDetailFilmsById(filmId)
  return {
    data: film
  }
}

export default Detail
