import React, { Component } from 'react'
import Head from 'next/head'
import Pagination from 'react-js-pagination'
import Layout from '../src/layouts/DefaultLayout'
import { getFilmsByTitleYearPage } from '../src/service/service'
import ListFilm from '../src/components/ListFilms'

class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      filmTitle: '',
      yearRelease: '',
      activePage: 1,
      totalResults: 0,
      filmFilters: []
    }
  }

  handleOnChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleOnSubmit = async (event) => {
    event.preventDefault()
    if (this.state.filmTitle) {
      await this.setState({
        activePage: 1
      })
      this.searchFilms()
    } else {
      window.alert('Phải nhập tiêu đề phim!')
    }
  }

  searchFilms = async () => {
    const { filmTitle, yearRelease, activePage } = this.state
    const films = await getFilmsByTitleYearPage(filmTitle, yearRelease, activePage)
    this.setState({
      totalResults: Number.parseInt(films.totalResults)
    })
    if (films.Response === 'False' && films.Error === 'Too many results.') {
      window.alert('Có quá nhiều kết quả để hiển thị!')
    } else if (films.Response === 'False' && films.Error === 'Movie not found!') {
      window.alert('Không tìm thấy bộ phim nào!')
    } else {
      this.setState({ filmFilters: films })
    }
  }

  handlePageChange = async (pageNumber) => {
    await this.setState({ activePage: pageNumber })
    this.searchFilms()
  }

  render () {
    const { filmTitle, yearRelease, activePage, filmFilters, totalResults } = this.state
    const data = filmFilters
    let showListFilm
    let pagination

    if (data === undefined || data.length === 0) {
      showListFilm = (
        <div>
          <h4>
            Không có kết quả nào được tìm thấy
          </h4>
        </div>
      )
    } else if (totalResults) {
      showListFilm = (
        <div>
          <div className='row'>
            <div className='col-sm-12 col-md-12 col-lg-12'>
              <h4>Số kết quả tìm được: {totalResults || 0}</h4>
            </div>
          </div>
          <div className='row'>
            {data.Search.map((value, index) => (
              <ListFilm value={value} key={index} />
            ))}
          </div>
        </div>
      )
      pagination = (
        <Pagination
          hideDisabled
          activePage={activePage}
          itemsCountPerPage={10}
          totalItemsCount={totalResults}
          pageRangeDisplayed={10}
          onChange={this.handlePageChange}
        />
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
                    value={filmTitle}
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
                    value={yearRelease}
                    className='form-control'
                    placeholder='Nhập năm phát hành'
                  />
                </div>
              </div>
            </div>
            <button type='submit' className='btn btn-primary'>Tìm kiếm</button>
          </form>
          <br />
          {pagination}
          {showListFilm}
        </Layout>
      </div>
    )
  }
}

export default Search
