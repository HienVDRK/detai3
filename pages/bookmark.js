import Head from 'next/head'
import Layout from '../src/layouts/DefaultLayout'
import ListFilm from '../src/components/ListFilms'
import { getBookmark } from '../src/models/bookmarks'

function Bookmark () {
  const getBookmarks = getBookmark()
  let showBookmark
  if (getBookmarks && getBookmarks.length) {
    showBookmark = (
      <div>
        <div className='row'>
          <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
            <h4>Các bộ phim đã bookmark: {getBookmarks.length}</h4>
          </div>
        </div>
        <div className='row'>
          {getBookmarks.map((value, index) => (
            <ListFilm value={value} key={index} />
          ))}
        </div>
      </div>
    )
  } else {
    showBookmark = (
      <div>
        <div className='row'>
          <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
            <h4>Chưa có bộ phim nào được bookmark</h4>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Layout>
      <Head>
        <title>Bookmark</title>
      </Head>
      <h1 className='text-center'>
        Danh sách phim đã bookmark
      </h1>
      <hr />
      {showBookmark}
    </Layout>

  )
}
export default Bookmark
