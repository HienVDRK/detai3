import Layout from '../src/layouts/DefaultLayout'
import Helmet from 'react-helmet'

function About () {
  return (
    <Layout>
      <Helmet>
        <title>Thông tin</title>
      </Helmet>
      <h1 className='text-center'>
        Trang tìm kiếm phim trên IBDB - Rikkeisoft 2020
      </h1>
    </Layout>
  )
}
export default About
