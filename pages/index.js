import Link from 'next/link'
import Layout from '../src/layouts/DefaultLayout'
import { getFilmsByTitleYearPage } from '../src/service/service'
import ListFilm from '../src/components/ListFilms'
import Cookies from 'universal-cookie'

function Index (props) {
  let showFilms
  if (props.data.Search === undefined) {
    showFilms = (
      <div>
        <h4>
          Hãy tìm kiếm phim nào đó
        </h4>
      </div>
    )
  } else {
    showFilms = (
      <div>
        <div className='row'>
          <div className='col-sm-12 col-md-12 col-lg-12'>
            <h4>Các bộ phim hiện có: {props.data.Search.length}</h4>
          </div>
        </div>
        <div className='row'>
          {props.data.Search.map((value, index) => (
            <ListFilm value={value} key={index} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <Layout>
      <h1 className='text-center'>Tìm kiếm phim trên IMDB</h1>
      <hr />
      <Link href='/search'>
        <button type='button' className='btn btn-primary'>Tìm phim</button>
      </Link>
      {showFilms}
    </Layout>
  )
}

Index.getInitialProps = async (ctx) => {
  const headers = ctx.req ? ctx.req.headers.cookie : undefined
  const cookies = new Cookies(headers)
  const film = cookies.get('latestsearch')
  const filmTitle = film !== undefined ? film.filmTitle : ''
  const yearRelease = film !== undefined ? film.yearRelease : ''
  const getFilms = await getFilmsByTitleYearPage(filmTitle, yearRelease, 1)
  return {
    data: getFilms
  }
}

export default Index
