import React, { Component } from 'react'
import Head from 'next/head'
import Layout from '../src/layouts/DefaultLayout'
import { getFilmsByTitleandYear } from '../src/service/service'
import ListFilm from '../src/components/ListFilms'

class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      filmTitle: '',
      yearRelease: '',
      filmFilters: []
    }
  }

  handleOnChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleOnSubmit = (event) => {
    event.preventDefault()
    if (this.state.filmTitle) {
      this.searchFilms()
    } else {
      window.alert('Phải nhập tiêu đề phim!')
    }
  }

  searchFilms = async () => {
    const { filmTitle, yearRelease } = this.state
    const films = await getFilmsByTitleandYear(filmTitle, yearRelease)
    if (films.Response === 'False' && films.Error === 'Too many results.') {
      window.alert('Có quá nhiều kết quả để hiển thị!')
    } else if (films.Response === 'False' && films.Error === 'Movie not found!') {
      window.alert('Không tìm thấy bộ phim nào!')
    } else {
      this.setState({ filmFilters: films })
    }
  }

  render () {
    const { filmFilters } = this.state
    const data = filmFilters
    let showListFilm

    if (data === undefined || data.length === 0) {
      showListFilm = (
        <div><h4>Không có kết quả nào được tìm thấy</h4></div>
      )
    } else {
      showListFilm = (
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
        <Layout>
          <Head>
            <title>Tìm kiếm</title>
          </Head>
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
                    name='filmTitle'
                    onChange={this.handleOnChange}
                    value={this.state.filmTitle}
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
                    name='yearRelease'
                    onChange={this.handleOnChange}
                    value={this.state.yearRelease}
                    className='form-control'
                    placeholder='Nhập năm phát hành'
                  />
                </div>
              </div>
            </div>
            <button type='submit' className='btn btn-primary'>Tìm kiếm</button>
          </form>
          <br />
          {showListFilm}
        </Layout>
      </div>
    )
  }
}

export default Search
