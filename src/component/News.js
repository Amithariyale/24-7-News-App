import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    category: "general",
    pageSize: "8",
    gerne: "primary",
  };

  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `24/7 news/ ${this.capatalizeFirstLatter(
      this.props.category
    )}`;
  }

  async updateNews() {
    this.props.setProgress(10);
    this.setState({ loading: true });

    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);
    let parseData = await data.json();

    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }
  capatalizeFirstLatter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };
  componentDidMount() {
    this.updateNews();
  }
  fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    
    this.setState({
      page: this.state.page + 1,
    });
    let data = await fetch(url);
    let parseData = await data.json();

    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
    });
  };

  render() {
    return (
      <>
        <div className="container my-5 bg-light">
          <h1 className="text-center text-dark " style={{ marginTop: "80px" }}>
            24/7 News-top {this.capatalizeFirstLatter(this.props.category)}{" "}
            headlines
          </h1>
          {this.state.loading && <Spinner />}
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner />}
          >
            <div className="container">
              <div className="row">
                {this.state.articles.map((element) => {
                  return (
                    <div className="col-md-4" key={element.url}>
                      <NewsItem
                        title={element.title?element.title.slice(0, 40):""}
                        description={
                          element.description
                            ? element.description.slice(0, 70)
                            : ""
                        }
                        imageUrl={
                          element.urlToImage
                            ? element.urlToImage
                            : "https://www.hindustantimes.com/ht-img/img/2023/05/10/1600x900/345782099_240146828667670_8598503895839092191_n_1683718452954_1683718470221.jpg"
                        }
                        newsUrl={element.url}
                        author={element.author}
                        date={element.publishedAt}
                        source={element.source.name}
                        gerne={this.props.gerne}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </InfiniteScroll>
        </div>
      </>
    );
  }
}
