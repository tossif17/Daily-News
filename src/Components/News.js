import React, { Component } from 'react'

import Newsiteam from './Newsiteam'
import PropTypes from 'prop-types'


export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  }

  static psropTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }




  constructor() {
    super();
    this.state = {
      articles: [],
      loding: false,
      page: 1
    }
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b030ae325ec24db39b565f5e1f534d7a&pageSize=${this.props.pageSize}`
    let data = await fetch(url)
    let parseData = await data.json()
    this.setState({ articles: parseData.articles, totalResults: parseData.totalResults })

  }

  handelPrevClick = async () => {



    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b030ae325ec24db39b565f5e1f534d7a&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url)
    let parseData = await data.json()
    this.setState({ articles: parseData.articles })
    this.setState({
      page: this.state.page - 1,
      articles: parseData.articles
    })


  }

  handelNextClick = async () => {
    if (this.state.page + 1 > (Math.ceil(this.state.totalResults / this.props.pageSize))) {


    }
    else {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b030ae325ec24db39b565f5e1f534d7a&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
      let data = await fetch(url)
      let parseData = await data.json()
      this.setState({ articles: parseData.articles })
      this.setState({
        page: this.state.page + 1,
        articles: parseData.articles
      })
    }

  }

  render() {
    console.log("render")
    return (

      <div className="container my-3">

        <h1 className="text-center" style={{ margin: '30px' }}>Daily News - Top Headlines</h1>
        {/* <Spinner/> */}

        <div className="row">
          {this.state.articles.map((element) => {

            return <div className="col-md-4" key={element.url}>
              <Newsiteam title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage ? element.urlToImage : ""} newsurl={element.url} 
              author={element.author} date={element.publishedAt}/>
            </div>

          })}

        </div>
        <div className="container d-flex justify-content-between">
          <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handelPrevClick}> &larr; Previous</button>
          <button type="button" disabled={this.state.page + 1 > (Math.ceil(this.state.totalResults / this.props.pageSize))} className="btn btn-dark" onClick={this.handelNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
