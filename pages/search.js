import React, { Component } from 'react'
import Layout from '../src/layouts/DefaultLayout'
import { getFilmsByTitleandYear } from '../src/service/service'
import ListFilm from '../src/components/ListFilms'
import { Helmet } from 'react-helmet'

class Search extends Component {
  constructor (props) {
    super(props)
    this.state = { txtTitleFilm: '', txtYearRelease: '', fetchData: '' }
  }

  handleOnChange = (event) => {
    const target = event.target
    const name = target.name
    const value = target.value
    this.setState({
      [name]: value
    })
  }

  handleOnSubmit = (event) => {
    event.preventDefault()
    if (this.state.txtTitleFilm) {
      this.searchFilms()
    } else {
      window.alert('Phải nhập tiêu đề phim!')
    }
  }

  searchFilms = async () => {
    const title = this.state.txtTitleFilm
    const year = this.state.txtYearRelease
    const films = await getFilmsByTitleandYear(title, year)
    if (films.Response === 'False' && films.Error === 'Too many results.') {
      window.alert('Có quá nhiều kết quả để hiển thị!')
    } else {
      this.setState({ fetchData: films })
    }
  }

  render () {
    const data = this.state.fetchData ? this.state.fetchData : this.props.data
    let showFilm
    if (data === undefined || data.Response === 'False') {
      showFilm = (
        <div><h4>Không có kết quả nào được tìm thấy</h4></div>
      )
    } else {
      showFilm = (
        <div>
          <div className='row'>
            <div className='col-sm-12 col-md-12 col-lg-12'>
              <h4>Số kết quả tìm được: {data.Search.length}</h4>
            </div>
          </div>
          <div className='row'>
            {data.Search.map((value, index) => (
              <ListFilm value={value} key={index} />
            ))}
          </div>
        </div>
      )
    }

    return (
      <div>
        <Helmet>
          <title>Tìm kiếm</title>
        </Helmet>
        <Layout>
          <h1 className='text-center'>
            Trang tìm kiếm phim
          </h1>
          <hr />
          <form onSubmit={this.handleOnSubmit}>
            <div className='row'>
              <div className='col-xs-6 col-sm-6 col-md-6 col-lg-6'>
                <div className='form-group'>
                  <label>Tiêu đề phim</label>
                  <input
                    type='text'
                    name='txtTitleFilm'
                    onChange={this.handleOnChange}
                    value={this.state.txtTitleFilm}
                    className='form-control'
                    placeholder='Nhập tiêu đề phim'
                  />
                </div>
              </div>
              <div className='col-xs-6 col-sm-6 col-md-6 col-lg-6'>
                <div className='form-group'>
                  <label>Năm phát hành </label>
                  <input
                    type='number'
                    min='0'
                    name='txtYearRelease'
                    onChange={this.handleOnChange}
                    value={this.state.txtYearRelease}
                    className='form-control'
                    placeholder='Nhập năm phát hành'
                  />
                </div>
              </div>
            </div>
            <button type='submit' className='btn btn-primary'>Tìm kiếm</button>
          </form>
          <br />
          {showFilm}
        </Layout>
      </div>
    )
  }
}

export default Search
