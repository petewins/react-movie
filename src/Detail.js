import React, { Component } from 'react';
import withRouter from 'react-router-dom/withRouter';

class Detail extends Component {
  state = {
    detail: {
      id: null,
      title: null
    },
    saved: false
  };


  componentDidUpdate(prevProps) {
    let oldId = prevProps.location.pathname;
    let newId = this.props.location.pathname;
    let id = newId.slice(7).replace(/\//g, '');
    if (newId !== oldId) {
      this.getMovieDetail(id);
      this.checkForWatchList(id);
    }

    if ((newId == oldId) && !this.props.watchlist.some(movie => movie.id == id)) {
      if (this.state.saved) {
        this.checkForWatchList(id);
      }
    }

    if (this.props.watchlist.some(movie => movie.id == id)) {
      if (!this.state.saved) {
        this.checkForWatchList(id);
      }
    }
  }

  checkForWatchList = (id) => {
    let saved = this.props.watchlist.some(movie => movie.id == id);
    this.setState({ saved });
  }

  componentDidMount() {
    console.log(this.props);
    let id = this.props.location.pathname.slice(7).replace(/\//g, '');
    this.getMovieDetail(id);
    this.checkForWatchList(id);
  }

  handleStarClick = () => {
    let watchlist = this.props.watchlist;
    let detail = this.state.detail;
    console.log(watchlist)
    if (watchlist.some((movie) => movie.id === detail.id)) {
      watchlist = watchlist.filter((movie) => movie.id !== detail.id);
      this.props.updateState({ watchlist });
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
      this.setState({ saved: false })
    } else {
      watchlist.push({ id: detail.id, title: detail.title, iconClass: "fas fa-star" });
      this.props.updateState({ watchlist });
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
      this.setState({ saved: true })
    }

  }

  getMovieDetail = id => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=ea748c83b9eee174d5714961ec938fff&language=en-US&append_to_response=videos%2Ccredits`
    )
      .then(resp => resp.json())
      .then(movie => {
        let cast = [];
        let length =
          movie.credits.cast.length < 4 ? movie.credits.cast.length : 4;
        for (let i = 0; i < length; i++) {
          cast.push(movie.credits.cast[i].name);
        }
        console.log(movie);
        let detail = {
          id: movie.id,
          title: movie.title,
          runtime: movie.runtime,
          rating: movie.vote_average,
          genre: movie.genres.map(genre => genre.name).join(', '),
          video:
            movie.videos.results.length > 0
              ? movie.videos.results[0].key
              : null,
          image: 'https://image.tmdb.org/t/p/w200' + movie.poster_path,
          overview: movie.overview,
          cast: cast.join(', '),
          date: movie.release_date
        };
        this.setState({ detail });
        console.log(movie, this.state);
        // return details;
      });
  };

  render() {
    let starred = this.state.saved ? 'fas fa-star' : 'far fa-star';
    let movie = this.state.detail;
    let youtube;
    let overview = (
      <p>{movie.overview}</p>
    )
    if (movie.video) {
      youtube = (
        <div className="embed-container">
          <iframe title="youtube" width="560" height="315" src={`https://www.youtube-nocookie.com/embed/${this.state.detail.video}?rel=0&amp;`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
      )
    } else {
      youtube = movie.overview
      overview = "";
    }

    return (
      // <div className="row mb-2">
      <div>
        <div className="title-area d-flex bg-dark text-light p-3">
          <i onClick={this.handleStarClick} title="add to watchlist" className={starred + ' text-warning pr-3 align-self-center cursor-pointer'} style={{ fontSize: "2rem" }}></i>
          <div className="d-flex flex-column">
            <h2 className="m-0">{movie.title}
            </h2>
            <span>{movie.genre}</span>
            <span className="text-white"> {movie.date} </span>

          </div>
          <div className="ml-auto pr-3 d-flex flex-column ">
            <span className="detail-rating "> {movie.rating}/<small>10</small> </span>
          </div>
        </div>
        <div className="d-flex bg-dark">
          <img alt="poster" src={movie.image} className="mr-2 detail-poster" />
          <div className="text-light" style={{ width: "100%", height: "100%" }}>
            {youtube}
          </div>
        </div>
        <div className="bg-grey my-3">
          {overview}
          <p><b>Starring:</b> {movie.cast}</p>
          <p><b>Runtime:</b> {movie.runtime} mins</p>
        </div>
      </div>
      // </div>
    );
  }
}

export default withRouter(Detail);
