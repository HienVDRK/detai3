import Helmet from 'react-helmet'
import Layout from '../src/layouts/DefaultLayout'

function About () {
  return (
    <Layout>
      <Helmet>
        <title>Thông tin</title>
      </Helmet>
      <h1 className='text-center'>
        Tìm kiếm phim trên trang IMDB - Rikkeisoft 2020
      </h1>
    </Layout>
  )
}
export default About
