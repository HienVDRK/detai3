import React, { Component } from 'react'
import Head from 'next/head'
import Cookies from 'universal-cookie'
import Layout from '../src/layouts/DefaultLayout'
const cookies = new Cookies()

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = { txtUsername: '', txtPassword: '', user: [] }
  }

  handleSubmitLogin = (event) => {
    event.preventDefault()
    const { txtUsername, txtPassword, user } = this.state
    const getAccount = cookies.get('accounts')
    if (txtUsername === '' || txtPassword === '') {
      window.alert('Nhập tên tài khoản và mật khẩu để đăng nhập!')
    } else if (getAccount && getAccount.some(account => account.username === txtUsername && account.password === txtPassword)) {
      user.push({
        username: this.state.txtUsername,
        password: this.state.txtPassword
      })
      cookies.set('user', JSON.stringify(user))
      window.alert('Đăng nhập thành công!')
      window.location.reload()
    } else {
      window.alert('Lỗi: Sai tên tài khoản hoặc mật khẩu!')
    }
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
          <div className='col-sm-3 col-md-3 col-lg-3' />
          <div className='col-sm-6 col-md-6 col-lg-6'>
            <h2>Đăng nhập</h2>
            <form onSubmit={this.handleSubmitLogin} className='form-horizontal'>
              <div className='form-group'>
                <div className='col-sm-12'>
                  <label>Username:</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Nhập username'
                    value={this.state.txtUsername}
                    name='txtUsername'
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
                    value={this.state.txtPassword}
                    name='txtPassword'
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
          <div className='col-sm-3 col-md-3 col-lg-3' />
        </div>
      </Layout>
    )
  }
}
export default Login
