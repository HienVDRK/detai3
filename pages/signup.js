import React, { Component } from 'react'
import Head from 'next/head'
import Layout from '../src/layouts/DefaultLayout'
import { getUser, setUser } from '../src/models/user'
const getUsers = getUser(0)

class SignUp extends Component {
  constructor (props) {
    super(props)
    this.state = { username: '', password: '', passwordConfirmation: '', accounts: [] }
  }

  componentDidMount () {
    if (getUsers) {
      this.setState({
        accounts: getUsers
      })
    }
  }

  handleOnChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  checkSignUp = () => {
    const { username, password, passwordConfirmation, accounts } = this.state
    if (username && password && passwordConfirmation) {
      const checkExist = (getUsers && getUsers.some(user => user.username === username))
      if (checkExist) {
        window.alert('Tên tài khoản đã tồn tại!')
      } else if (password !== passwordConfirmation) {
        window.alert('Nhập lại mật khẩu không khớp!')
      } else {
        setUser(username, password, accounts, 0)
        window.location.reload()
        window.alert('Đăng ký thành công!')
      }
    } else {
      window.alert('Nhập đầy đủ thông tin đăng ký!')
    }
  }

  handleOnSignUp = (event) => {
    event.preventDefault()
    this.checkSignUp()
  }

  render () {
    return (
      <Layout>
        <Head>
          <title>Đăng ký</title>
        </Head>
        <div className='row'>
          <div className='col-sm-6 col-sm-offset-3 col-md-6 col-lg-6 col-md-offset-3 col-lg-6 col-lg-offset-3'>
            <form onSubmit={this.handleOnSignUp} className='form-horizontal'>
              <h2>Đăng ký</h2>
              <div className='form-group'>
                <div className='col-sm-12'>
                  <label>Username:</label>
                  <input
                    type='text'
                    onChange={this.handleOnChange}
                    value={this.state.username}
                    className='form-control'
                    placeholder='Nhập username'
                    name='username'
                  />
                </div>
              </div>
              <div className='form-group'>
                <div className='col-sm-12'>
                  <label>Mật khẩu:</label>
                  <input
                    type='password'
                    onChange={this.handleOnChange}
                    value={this.state.password}
                    className='form-control'
                    placeholder='Nhập mật khẩu'
                    name='password'
                  />
                </div>
              </div>
              <div className='form-group'>
                <div className='col-sm-12'>
                  <label>Nhập lại mật khẩu:</label>
                  <input
                    type='password'
                    onChange={this.handleOnChange}
                    value={this.state.passwordConfirmation}
                    className='form-control'
                    placeholder='Nhập lại mật khẩu'
                    name='passwordConfirmation'
                  />
                </div>
              </div>
              <div className='form-group'>
                <div className='col-sm-12'>
                  <button type='submit' className='btn btn-primary'>Đăng ký</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    )
  }
}
export default SignUp
