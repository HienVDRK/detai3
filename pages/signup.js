import React, { Component } from 'react'
import Head from 'next/head'
import Cookies from 'universal-cookie'
import Layout from '../src/layouts/DefaultLayout'
const cookies = new Cookies()

class SignUp extends Component {
  constructor (props) {
    super(props)
    this.state = { txtUsername: '', txtPassword: '', txtRePassword: '', account: [] }
  }

  componentDidMount () {
    const account = cookies.get('accounts')
    if (account) {
      this.setState({
        account
      })
    }
  }

  handleOnChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmitSignUp = (event) => {
    event.preventDefault()
    const userName = this.state.txtUsername
    const passWord = this.state.txtPassword
    const rePassword = this.state.txtRePassword
    if (userName && passWord && rePassword) {
      const accounts = cookies.get('accounts')
      const checkExistUsername = (accounts && accounts.some(account => account.username === userName))
      if (checkExistUsername) {
        window.alert('Tên tài khoản đã tồn tại!')
      } else if (passWord !== rePassword) {
        window.alert('Nhập lại mật khẩu không khớp!')
      } else {
        this.state.account.push({
          username: this.state.txtUsername,
          password: this.state.txtPassword
        })
        cookies.set('accounts', JSON.stringify(this.state.account))
        window.alert('Đăng ký thành công!')
      }
    } else {
      window.alert('Nhập đầy đủ thông tin đăng ký!')
    }
  }

  render () {
    return (
      <Layout>
        <Head>
          <title>Đăng ký</title>
        </Head>
        <div className='row'>
          <div className='col-sm-3 col-md-3 col-lg-3' />
          <div className='col-sm-6 col-md-6 col-lg-6'>
            <form onSubmit={this.handleSubmitSignUp} className='form-horizontal'>
              <h2>Đăng ký</h2>
              <div className='form-group'>
                <div className='col-sm-12'>
                  <label>Username:</label>
                  <input
                    type='text'
                    onChange={this.handleOnChange}
                    value={this.state.txtUsername}
                    className='form-control'
                    placeholder='Nhập username'
                    name='txtUsername'
                  />
                </div>
              </div>
              <div className='form-group'>
                <div className='col-sm-12'>
                  <label>Mật khẩu:</label>
                  <input
                    type='password'
                    onChange={this.handleOnChange}
                    value={this.state.txtPassword}
                    className='form-control'
                    placeholder='Nhập mật khẩu'
                    name='txtPassword'
                  />
                </div>
              </div>
              <div className='form-group'>
                <div className='col-sm-12'>
                  <label>Nhập lại mật khẩu:</label>
                  <input
                    type='password'
                    onChange={this.handleOnChange}
                    value={this.state.txtRePassword}
                    className='form-control'
                    placeholder='Nhập lại mật khẩu'
                    name='txtRePassword'
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
          <div className='col-sm-3 col-md-3 col-lg-3' />
        </div>
      </Layout>
    )
  }
}
export default SignUp
