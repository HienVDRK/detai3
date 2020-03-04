import Link from 'next/link'
import Layout from '../src/layouts/DefaultLayout'

function Index () {
  return (
    <Layout>
      <h1 className='text-center'>Danh sách bộ phim trên IMDB</h1>
      <hr />
      <Link href='/search'>
        <button type='button' className='btn btn-primary'>Tìm phim</button>
      </Link>
    </Layout>
  )
}

export default Index
