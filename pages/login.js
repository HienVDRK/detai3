import React, { Component } from 'react'
import Head from 'next/head'
import Layout from '../src/layouts/DefaultLayout'
import { getUser, setUser } from '../src/models/user'
const getUsers = getUser(0)

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = { username: '', password: '', users: [] }
  }

  checkLogin = () => {
    const { username, password, users } = this.state
    if (username === '' || password === '') {
      window.alert('Nhập tên tài khoản và mật khẩu để đăng nhập!')
    } else if (getUsers && getUsers.some(account => account.username === username && account.password === password)) {
      setUser(username, password, users, 1)
      window.location.reload()
      window.alert('Đăng nhập thành công!')
    } else {
      window.alert('Lỗi: Sai tên tài khoản hoặc mật khẩu!')
    }
  }

  handleOnLogin = (event) => {
    event.preventDefault()
    this.checkLogin()
  }

  handleOnChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  render () {
    return (
      <Layout>
        <Head>
          <title>Đăng nhập</title>
        </Head>
        <div className='row'>
          <div className='col-sm-6 col-sm-offset-3 col-md-6 col-lg-6 col-md-offset-3 col-lg-6 col-lg-offset-3'>
            <h2>Đăng nhập</h2>
            <form onSubmit={this.handleOnLogin} className='form-horizontal'>
              <div className='form-group'>
                <div className='col-sm-12'>
                  <label>Username:</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Nhập username'
                    value={this.state.username}
                    name='username'
                    onChange={this.handleOnChange}
                  />
                </div>
              </div>
              <div className='form-group'>
                <div className='col-sm-12'>
                  <label>Mật khẩu:</label>
                  <input
                    type='password'
                    className='form-control'
                    placeholder='Nhập mật khẩu'
                    value={this.state.password}
                    name='password'
                    onChange={this.handleOnChange}
                  />
                </div>
              </div>
              <div className='form-group'>
                <div className='col-sm-12'>
                  <button type='submit' className='btn btn-primary'>Đăng nhập</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    )
  }
}
export default Login
