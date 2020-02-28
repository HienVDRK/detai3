import Header from 'next/head'
import Link from 'next/link'

function Head () {
  return (
    <div>
      <Header>
        <title>Trang chủ IMDB</title>
        <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css' />
      </Header>
      <nav className='navbar navbar-inverse'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <Link href='/index'>
              <a className='navbar-brand' href='#'>Trang chủ</a>
            </Link>
          </div>
          <ul className='nav navbar-nav'>
            <li>
              <Link href='/bookmark'>
                <a href='#'>Bookmark</a>
              </Link>
            </li>
            <li>
              <Link href='/about'>
                <a href='#'>About</a>
              </Link>
            </li>
          </ul>
          <ul className='nav navbar-nav navbar-right'>
            <li>
              <Link href='/signup'>
                <a href='#'><span className='glyphicon glyphicon-user' /> Sign Up</a>
              </Link>
            </li>
            <li>
              <Link href='/login'>
                <a href='#'><span className='glyphicon glyphicon-log-in' /> Login</a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}
export default Head
