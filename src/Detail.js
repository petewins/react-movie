import React, { Component } from 'react';

class Detail extends Component {
  state = {
    detail: {
      id: null,
      title: null
    }
  };

  componentDidUpdate() {
    // console.log('updated');
    // let id = this.props.location.pathname.slice(7).replace(/\//g, '');
    // if (this.state.detail.id !== id) {
    //   this.getMovieDetail(id);
    // }
  }
  
  componentDidMount() {
    
    let id = this.props.location.pathname.slice(7).replace(/\//g, '');
    if (this.state.detail.id !== id) {
      this.getMovieDetail(id);
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
          cast: cast.join(', ')
        };
        this.setState({ detail });
        console.log(movie, this.state);
        // return details;
      });
  };

  render() {
    return (
      <div className="row mb-2">
        <div>
          <div className="youtube-embed">
            <iframe
              allowFullScreen="allowFullScreen"
              src={`https://www.youtube.com/embed/${
                this.state.detail.video
              }?ecver=1&amp;iv_load_policy=1&amp;rel=0&amp;showinfo=0&amp;yt:stretch=16:9&amp;autohide=1&amp;color=black&amp;width=560&amp;width=560`}
              width="560"
              height="315"
              allowtransparency="true"
              frameBorder="0"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Detail;
