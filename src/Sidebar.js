import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends Component {

  componentDidUpdate() {

    // add stars from cache to opening week, needs optimization for the loops
    if (this.props.upcoming.length > 0) {
      console.log('cachehceck')
      let upcoming = this.props.upcoming;
      upcoming.forEach((movie, index) => {
        this.props.watchlist.find(movie2 => {
          if (movie.id === movie2.id) {
            upcoming[index].iconClass = 'fas fa-star';
          } else {
            // upcoming[index].iconClass = 'far fa-star';
          }
          return false;
        })
      });
    }
  }


  updateWatchlist = (movie, upcomingListIndex) => {
    let watchlist = this.props.watchlist;
    let upcoming = this.props.upcoming;
    if (!upcomingListIndex) {
      upcoming.forEach((mov, i) => {
        if (mov.id === movie.id) {
          upcomingListIndex = i;
          console.log(upcomingListIndex);
        }
      });
    }
    let index;
    watchlist.forEach((mov, i) => {
      if (mov.id === movie.id) {
        index = i;
      }
    }
    );
    if (index !== undefined) {
      watchlist.splice(index, 1);
      if (upcomingListIndex !== undefined) {
        upcoming[upcomingListIndex].iconClass = 'far fa-star';
      }
    } else {
      if (upcomingListIndex !== undefined) {
        upcoming[upcomingListIndex].iconClass = 'fas fa-star';
      }
      watchlist.push(movie);
    }
    this.props.updateState({ watchlist, upcoming });
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  };
  render() {
    return (
      <aside className="col-md-4 mt-5 blog-sidebar">
        <div className="p-3 mb-3 bg-light rounded">
          <h4>Watchlist</h4>
          <ul className="mb-0 list-unstyled">
            <Watchlist
              watchlist={this.props.watchlist}
              updateWatchlist={this.updateWatchlist}
            />
          </ul>
        </div>

        <div className="p-3">
          <h4 className="">Upcoming</h4>
          <ol className="list-unstyled mb-0">
            <Upcoming
              upcoming={this.props.upcoming}
              updateWatchlist={this.updateWatchlist}
            />
          </ol>
        </div>
      </aside>
    );
  }
}

const Watchlist = props =>
  props.watchlist.map(movie => (
    <li className="p-1" key={movie.id}>
      <i
        className="fas fa-star text-warning pr-2 cursor-pointer "
        onClick={e => {
          props.updateWatchlist(movie);
        }}
        title="remove from watchlist"
      />
      <Link to={'/detail/' + movie.id}>{movie.title}</Link>
    </li>
  ));

const Upcoming = props => {
  return props.upcoming.map((movie, index) => (
    <li className="p-1" key={movie.id}>
      <i
        className={movie.iconClass + ' text-warning pr-2 cursor-pointer '}
        onClick={e => {
          props.updateWatchlist(movie, index);
        }}
        title="add to watchlist"
      />
      <Link to={'/detail/' + movie.id}>{movie.title}</Link>
    </li>
  ));
};
export default Sidebar;
