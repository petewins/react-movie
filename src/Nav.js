import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { AsyncTypeahead } from 'react-bootstrap-typeahead'; // ES2015
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      allowNew: false,
      isLoading: false,
      multiple: false,
      options: []
    };
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleChange = event => {
      let movie = event[0];
      if (movie) {
        this.props.history.push('/detail/' + movie.id);
      }
    };

  handleInputChange = event => {
    console.log(event);
    let searchInput = event;
    this.setState({ searchInput });
  };

  _handleSearch = query => {
    this.setState({ isLoading: true });
    this.makeAndHandleRequest(query).then(({ options }) => {
      this.setState({
        isLoading: false,
        options
      });
    });
  };

  makeAndHandleRequest(query) {
    return fetch(`
      https://api.themoviedb.org/3/search/movie?api_key=ea748c83b9eee174d5714961ec938fff&language=en-US&query=${query}&page=1&include_adult=false`)
      .then(resp => resp.json())
      .then(({ results, total_results }) => {
        let options = [];
        results.forEach(i => {
          let movie = {};
          if (i.poster_path) {
            movie.id = i.id;
            movie.title = i.title;
            movie.image = 'https://image.tmdb.org/t/p/w200' + i.poster_path;
            movie.year = i.release_date.slice(0, 4);
            options.push(movie);
          }
        });
        return { options, total_results };
      });
  }

  render() {
    return (
      // your return
      <header className="blog-header py-3">
        <div className="row flex-nowrap justify-content-between align-items-center">
          <div className="col-auto ">
            <Link className="blog-header-logo text-dark" to="/">
              Film Search
            </Link>
          </div>
          <div className="col-10 d-flex justify-content-start align-items-left">
            <form
              onSubmit={this.handleSubmit}
              className="form-inline mt-md-0 w-100"
            >
              <Fragment>
                <AsyncTypeahead
                  {...this.state}
                  labelKey="title"
                  minLength={3}
                  onSearch={this._handleSearch}
                  onChange={this.handleChange}
                  onInputChange={this.handleInputChange}
                  placeholder="Search for a movie ..."
                  inputProps={{
                    className: 'form-control search-inputbox',
                  }}
                  value={this.state.searchInput}
                  renderMenuItemChildren={(option, props) => (
                    <MovieMenuItem key={option.id} movie={option} />
                  )}
                />
              </Fragment>
              {/* <input
                className="form-control w-75 "
                type="text"
                placeholder="Search"
                aria-label="Search"
                onChange={this.handleChange}
                value={this.state.searchInput}
              /> */}
              <Link
                className="text-muted"
                to={'/search/' + this.state.searchInput}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mx-3"
                >
                  <circle cx="10.5" cy="10.5" r="7.5" />
                  <line x1="21" y1="21" x2="15.8" y2="15.8" />
                </svg>
              </Link>
            </form>
          </div>
        </div>
      </header>
    );
  }
}

const MovieMenuItem = ({ movie }) => {
  return (
    <div>
      <img
        alt={movie.title + 'poster'}
        src={movie.image}
        style={{
          marginRight: '10px',
          width: '65px'
        }}
      />
      <small>
        <b> {movie.title} </b> ({movie.year})
      </small>
    </div>
  );
};

export default withRouter(Nav);
