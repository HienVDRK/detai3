import Layout from '../src/layouts/DefaultLayout'
import ListFilm from '../src/components/ListFilms'
import Cookies from 'universal-cookie'
import Helmet from 'react-helmet'

function Bookmark () {
  const cookies = new Cookies()
  let showBookmark
  if (cookies.get('bookmark') && cookies.get('bookmark').length) {
    showBookmark = (
      <div>
        <div className='row'>
          <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
            <h4>Các bộ phim đã bookmark: {cookies.get('bookmark').length}</h4>
          </div>
        </div>
        <div className='row'>
          {cookies.get('bookmark').map((value, index) => (
            <ListFilm value={value} key={index} />
          ))}
        </div>
      </div>
    )
  } else {
    showBookmark = (
      <div className='row'>
        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
          <h4>Chưa có bộ phim nào được bookmark</h4>
        </div>
      </div>
    )
  }

  return (
    <Layout>
      <Helmet>
        <title>Bookmark</title>
      </Helmet>
      <h1 className='text-center'>
        Danh sách phim đã bookmark
      </h1>
      <hr />
      {showBookmark}
    </Layout>

  )
}
export default Bookmark
