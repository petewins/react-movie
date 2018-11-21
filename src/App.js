import React, { Component } from 'react';
import './App.css';
import Nav from './Nav';
import { BrowserRouter as BrowserRouter, Route, Switch } from 'react-router-dom';

import Playing from './Playing';
import Detail from './Detail';
import Sidebar from './Sidebar';

// let url =
//   'https://newsapi.org/v2/everything?q=%22in%20theatres%22&apiKey=f6d2d6210efa415387ea117a6c090666&language=en&sortby=publishedAt';

class App extends Component {
  state = {
    nowPlaying: [],
    upcoming: [],
    watchlist: []
  };

  componentWillMount() {
    if (typeof (Storage) !== "undefined") {
      if (localStorage.getItem("watchlist")) {
        let watchlist = JSON.parse(localStorage.getItem("watchlist"));
        this.setState({ watchlist })
      }
    } else {
      // Sorry! No Web Storage support..
    }
  }

  componentDidMount() {
    this.getUpcoming();
    if (!(this.state.nowPlaying.length > 0)) {
      this.getNowPlaying();
    }
  }

  render() {
    return (
      <BrowserRouter basename="/petewins/react-final/">
        <div className="App">
          <div className="container">
            <Nav />
          </div>

          <main role="main" className="container py-3 py-md-5">
            <div className="row">
              <div className="col-md-8 blog-main">
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={props => (
                      <Playing nowPlaying={this.state.nowPlaying} />
                    )}
                  />
                  <Route path="/detail" render={props => (
                    <Detail watchlist={this.state.watchlist} updateState={this.updateState} />
                  )} />
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
            <p>
              {/* <a href="#">Back to top</a> */}
            </p>
          </footer>
        </div>
      </BrowserRouter>
    );
  }

  getUpcoming() {
    let getUpcoming =
      'https://api.themoviedb.org/3/movie/upcoming?api_key=ea748c83b9eee174d5714961ec938fff&language=en-US&page=1&region=us';
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

export default App;
