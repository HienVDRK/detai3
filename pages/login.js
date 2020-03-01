import Layout from '../src/layouts/DefaultLayout'
import Helmet from 'react-helmet'
import React, { Component } from 'react'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = { txtUsername: '', txtPassword: '' }
  }

  handleSubmitDangNhap = (event) => {
    event.preventDefault()
  }

  handleOnChange = (event) => {
    const target = event.target
    const name = target.name
    const value = target.value
    this.setState({
      [name]: value
    })
  }

  render () {
    return (
      <Layout>
        <Helmet>
          <title>Đăng nhập</title>
        </Helmet>
        <h2>Đăng nhập</h2>
        <form onSubmit={this.handleSubmitDangNhap} className='form-horizontal'>
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
      </Layout>
    )
  }
}
export default Login
