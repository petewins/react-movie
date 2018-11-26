import React, { Component } from 'react';
import './App.css';
import Nav from './Nav';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Playing from './Playing';
import Detail from './Detail';
import Sidebar from './Sidebar';
import News from './News';
class App extends Component {
  state = {
    nowPlaying: [],
    upcoming: [],
    watchlist: [],
    articles: []
  };

  componentWillMount() {
    if (typeof Storage !== 'undefined') {
      if (localStorage.getItem('watchlist')) {
        let watchlist = JSON.parse(localStorage.getItem('watchlist'));
        this.setState({ watchlist });
      }
    } else {
      // Sorry! No Web Storage support..
    }
  }

  componentDidMount() {
    this.getNews('%22in%20theatres%22').then(({ articles }) =>
      this.setState({ articles })
    );
    this.getUpcoming();
    if (!(this.state.nowPlaying.length > 0)) {
      this.getNowPlaying();
    }
  }

  render() {
    return (
      <HashRouter>
        <div className="App">
          <div className="container">
            <Nav />
          </div>

          <main role="main" className="container py-3 py-md-4">
            <div className="row">
              <div className="col-md-8 blog-main">
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={props => (
                      <Home
                        articles={this.state.articles}
                        nowPlaying={this.state.nowPlaying}
                      />
                    )}
                  />
                  <Route
                    path="/detail"
                    render={props => (
                      <Detail
                        watchlist={this.state.watchlist}
                        updateState={this.updateState}
                        getNews={this.getNews}
                      />
                    )}
                  />
                </Switch>
              </div>
              <Sidebar
                watchlist={this.state.watchlist}
                upcoming={this.state.upcoming}
                updateState={this.updateState}
              />
            </div>
          </main>

          <footer className="blog-footer">
            <p>
              Powered By
              <a href="https://themoviedb.org/"> themoviedb, </a>
              <a href="https://newsapi.org/"> newsapi </a>.
            </p>
            <p>{/* <a href="#">Back to top</a> */}</p>
          </footer>
        </div>
      </HashRouter>
    );
  }

  getUpcoming() {
    let getUpcoming =
      'https://api.themoviedb.org/3/movie/upcoming?api_key=ea748c83b9eee174d5714961ec938fff&language=en-US&page=1&region=us&sortBy=relevancy';
    fetch(getUpcoming)
      .then(resp => resp.json())
      .then(movies => {
        let upcoming = [];
        movies.results.forEach(mov => {
          let movie = {};
          movie.id = mov.id;
          movie.title = mov.title;
          movie.iconClass = 'far fa-star';
          upcoming.push(movie);
        });
        this.setState({ upcoming });
        console.log(this.state);
      });
  }

  getNews = query => {
    let news = `https://newsapi.org/v2/everything?q=${query}&apiKey=f6d2d6210efa415387ea117a6c090666&language=en&sortby=publishedAt`;
    return fetch(news)
      .then(resp => resp.json())
      .then(data => {
        let articles = data.articles.map(article => {
          return {
            title: article.title,
            url: article.url,
            image: article.urlToImage,
            description: article.description,
            date: article.publishedAt.slice(0, 9)
          };
        });
        return { articles };
      });
  };
  getNowPlaying() {
    let getNowPlaying =
      'https://api.themoviedb.org/3/movie/now_playing?api_key=ea748c83b9eee174d5714961ec938fff&language=en-US&page=1';
    fetch(getNowPlaying)
      .then(resp => resp.json())
      .then(movies => {
        let nowPlaying = [];
        movies.results.forEach(mov => {
          if (mov.poster_path) {
            let movie = {};
            movie.id = mov.id;
            movie.title = mov.title;
            movie.image = 'https://image.tmdb.org/t/p/w200' + mov.poster_path;
            nowPlaying.push(movie);
          }
        });
        this.setState({ nowPlaying });
      });
  }

  updateState = state => {
    this.setState(state);
  };
}

const Home = props => (
  <div>
    <Playing nowPlaying={props.nowPlaying} />
    <div className="blog-post">
      <h2 className="blog-post-title">Top News</h2>
      <hr />
      <News articles={props.articles} />
      <hr />
    </div>
  </div>
);

export default App;
