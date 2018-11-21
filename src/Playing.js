import React, { Component } from 'react';
import Slider from 'react-slick/lib/slider';
import { Link } from 'react-router-dom';


class Playing extends Component {

  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 2
    };

    let cards = this.props.nowPlaying.map(movie => (
      <Link to={'/detail/' + movie.id} key={movie.id}>
        <div className="now-playing-poster">
          <img src={movie.image} alt="movie poster" />
          
          <span className="poster-title">{movie.title}</span>
        </div>
      </Link>
    ));

    return (
      <div className="blog-post">
        <h2 className="blog-post-title">Now Playing</h2>
        <div className="carousel ">
          <Slider {...settings}>{cards}</Slider>
        </div>
      </div>
    );
  }
}

export default Playing;
