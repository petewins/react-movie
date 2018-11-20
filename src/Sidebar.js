import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends Component {
  updateWatchlist = (movie, upcomingIndex) => {
    let watchlist = this.props.watchlist;
    let upcoming = this.props.upcoming;

    if (!upcomingIndex) {
      upcoming.some((mov, i) => {
        if (mov.id === movie.id) {
          upcomingIndex = i;
        }
      });
    }
    let index;
    if (
      watchlist.some((mov, i) => {
        if (mov.id === movie.id) {
          index = i;
          return true;
        }
      })
    ) {
      upcoming[upcomingIndex].iconClass = 'far fa-star';
      watchlist.splice(index, 1);
    } else {
      upcoming[upcomingIndex].iconClass = 'fas fa-star';
      watchlist.push(movie);
    }
    this.props.updateState({ watchlist, upcoming });
  };
  render() {
    return (
      <aside className="col-md-4 blog-sidebar">
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
          <h4 className="">Opening this week</h4>
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
