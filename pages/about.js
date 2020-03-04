import Head from 'next/head'
import Layout from '../src/layouts/DefaultLayout'

function About () {
  return (
    <Layout>
      <Head>
        <title>Thông tin</title>
      </Head>
      <h1 className='text-center'>
        Tìm kiếm phim trên trang IMDB - Rikkeisoft 2020
      </h1>
    </Layout>
  )
}
export default About
