import React, { Component } from 'react'
import Layout from '../src/layouts/DefaultLayout'
import Helmet from 'react-helmet'

class SignUp extends Component {
  constructor (props) {
    super(props)
    this.state = { txtUsername: '', txtPassword: '', txtRePassword: '', account: '' }
  }

  componentDidMount () {
    if (typeof window !== 'undefined') {
      const account = JSON.parse(window.localStorage.getItem('account'))
      if (account) {
        this.setState({
          account
        })
      }
    }
  }

  handleOnChange = (event) => {
    const target = event.target
    const name = target.name
    const value = target.value
    this.setState({
      [name]: value
    })
  }

  handleSubmitDangKy = (event) => {
    event.preventDefault()
    const userName = this.state.txtUsername
    const passWord = this.state.txtPassword
    const rePassword = this.state.txtRePassword
    if (userName && passWord && rePassword) {
      if (passWord !== rePassword) {
        window.alert('Nhập lại mật khẩu không khớp')
      } else {
        this.state.account.push({
          username: this.state.txtUsername,
          password: this.state.txtPassword
        })
        console.log('objAccount', this.state.account)
        window.localStorage.setItem('account', JSON.stringify(this.state.account))
        window.alert('Đăng kí thành công')
      }
    } else {
      window.alert('Nhập đầy đủ thông tin đăng kí!')
    }
  }

  render () {
    console.log('123', this.state.account)
    return (
      <Layout>
        <Helmet>
          <title>Đăng kí</title>
        </Helmet>
        <h2>Đăng kí</h2>
        <form onSubmit={this.handleSubmitDangKy} className='form-horizontal'>
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
              <button type='submit' className='btn btn-primary'>Đăng kí</button>
            </div>
          </div>
        </form>
      </Layout>
    )
  }
}
export default SignUp
