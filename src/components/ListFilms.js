import Link from 'next/link'
import styles from '../styles/listfilm.module.css'

function ListFilm (props) {
  let imgPoster
  if (props.value.Poster === 'N/A') {
    imgPoster = '/avt_default.jpg'
  } else {
    imgPoster = props.value.Poster
  }

  return (
    <div className='col-sm-3 col-md-3 col-lg-3'>
      <div className={styles.infoFilm}>
        <Link
          as={`/detail/${props.value.imdbID}`}
          href={{
            pathname: '/detail',
            query: {
              filmId: `${props.value.imdbID}`,
              Title: `${props.value.Title}`
            }
          }}
        >
          <img src={imgPoster} className={styles.poster} alt='Image' />
        </Link>
        <br />
        <div className={styles.textFilm}>
          <Link
            as={`/detail/${props.value.imdbID}`}
            href={{
              pathname: '/detail',
              query: {
                filmId: `${props.value.imdbID}`,
                Title: `${props.value.Title}`
              }
            }}
          >
            <h4 className={styles.titleFilm}>{props.value.Title}</h4>
          </Link>
          <h5>Năm phát hành: {props.value.Year}</h5>
          <h5>Thể loại: {props.value.Type}</h5>
        </div>
      </div>
    </div>
  )
}
export default ListFilm
