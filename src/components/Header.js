import Head from 'next/head'
import Link from 'next/link'
import { getUser, removeUser } from '../models/user'

function Header () {
  let btnLogin
  let btnSignup
  let btnBookmark
  const getUserLogin = getUser(1)

  const handleOnLogout = (event) => {
    event.preventDefault()
    removeUser()
    window.alert('Đăng xuất thành công')
    window.location.reload()
  }

  if (getUserLogin) {
    const showUsername = getUserLogin[0].username
    btnBookmark = (
      <Link href='/bookmark'>
        <a href='#'>Bookmark</a>
      </Link>
    )
    btnLogin = (
      <a href='#' onClick={handleOnLogout}>
        <span className='glyphicon glyphicon-log-out' /> {showUsername}
      </a>
    )
  } else {
    btnLogin = (
      <Link href='/login'>
        <a href='#'><span className='glyphicon glyphicon-log-in' /> Login
        </a>
      </Link>
    )
    btnSignup = (
      <Link href='/signup'>
        <a href='#'><span className='glyphicon glyphicon-user' /> Sign Up
        </a>
      </Link>
    )
  }

  return (
    <div>
      <Head>
        <title>Trang chủ IMDB</title>
        <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css' />
        <script src='https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js' />
        <script src='https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js' />
      </Head>
      <nav className='navbar navbar-inverse'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='#myNavbar'>
              <span className='icon-bar' />
              <span className='icon-bar' />
              <span className='icon-bar' />
            </button>
            <Link href='/index'>
              <a className='navbar-brand' href='#'>Trang chủ</a>
            </Link>
          </div>
          <div className='collapse navbar-collapse' id='myNavbar'>
            <ul className='nav navbar-nav'>
              <li>
                {btnBookmark}
              </li>
              <li>
                <Link href='/about'>
                  <a href='#'>About</a>
                </Link>
              </li>
            </ul>
            <ul className='nav navbar-nav navbar-right'>
              <li>
                {btnSignup}
              </li>
              <li>
                {btnLogin}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
export default Header
