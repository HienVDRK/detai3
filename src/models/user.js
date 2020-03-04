import Cookies from 'universal-cookie'
const cookies = new Cookies()

// flag == 0 la sign up, flag = 1 la login
export function getUser (flag) {
  if (flag === 1) { // getuser login
    return cookies.get('user')
  } else { // getuser sign up
    return cookies.get('accounts')
  }
}

export function setUser (username, password, user, flag) {
  user.push({
    username: username,
    password: password
  })
  if (flag === 1) { // setuser login
    cookies.set('user', JSON.stringify(user))
  } else { // setuser sign up
    cookies.set('accounts', JSON.stringify(user))
  }
}

export function removeUser () {
  cookies.remove('user')
}
