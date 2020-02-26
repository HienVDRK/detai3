import styles from '../styles/listfilm.module.css'
import Link from 'next/link'

function ListFilm (props) {
  return (
    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
      <div className={styles.infoFilm}>
        <Link as={`/detail/${props.value.imdbID}`} href={{ pathname: '/detail', query: { idFilm: `${props.value.imdbID}` } }}>
          <img src={props.value.Poster} className={styles.poster} alt='Image' />
        </Link>
        <br />
        <div className={styles.textFilm}>
          <Link as={`/detail/${props.value.imdbID}`} href={{ pathname: '/detail', query: { idFilm: `${props.value.imdbID}` } }}>
            <h4 className={styles.titleFilm}>{props.value.Title}</h4>
          </Link>
          <h5>Năm ra mắt: {props.value.Year}</h5>
          <h5>Thể loại: {props.value.Type}</h5>
        </div>
      </div>
    </div>
  )
}
export default ListFilm
