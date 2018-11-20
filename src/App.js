import React, { Component } from 'react';
import './App.css';
import Slider from 'react-slick';

let api_key = 'ea748c83b9eee174d5714961ec938fff';
let news_apikey = 'f6d2d6210efa415387ea117a6c090666';

let url =
  'https://newsapi.org/v2/everything?q=%22in%20theatres%22&apiKey=f6d2d6210efa415387ea117a6c090666&language=en&sortby=publishedAt';
class App extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1
    };
    return (
      <div className="App">
        <div className="container">
          <header className="blog-header py-3">
            <div className="row flex-nowrap justify-content-between align-items-center">
              <div className="col-auto">
                <a className="blog-header-logo text-dark" href="#">
                  RMDB
                </a>
              </div>
              <div className="col-10 d-flex justify-content-start align-items-left">
                <form className="form-inline mt-md-0 ">
                  <input
                    className="form-control "
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <a className="text-muted" href="#">
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
                  </a>
                </form>
              </div>
            </div>
          </header>

          {/* <div className="jumbotron p-3 p-md-5 text-white rounded bg-dark">
            <div className="col-md-6 px-0">
              <h1 className="display-4 font-italic">
                Title of a longer featured blog post
              </h1>
              <p className="lead my-3">
                Multiple lines of text that form the lede, informing new readers
                quickly and efficiently about what's most interesting in this
                post's contents.
              </p>
              <p className="lead mb-0">
                <a href="#" className="text-white font-weight-bold">
                  Continue reading...
                </a>
              </p>
            </div>
          </div> */}

          {/* <div className="row mb-2">
            <div className="col-md-6">
              <div className="card flex-md-row mb-4 shadow-sm h-md-250">
                <div className="card-body d-flex flex-column align-items-start">
                  <strong className="d-inline-block mb-2 text-primary">
                    WorldWorld
                  </strong>
                  <h3 className="mb-0">
                    <a className="text-dark" href="#">
                      Featured post
                    </a>
                  </h3>
                  <div className="mb-1 text-muted">Nov 12</div>
                  <p className="card-text mb-auto">
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content.
                  </p>
                  <a href="#">Continue reading</a>
                </div>
                <img
                  className="card-img-right flex-auto d-none d-lg-block"
                  data-src="holder.js/200x250?theme=thumb"
                  alt="Card image cap"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="card flex-md-row mb-4 shadow-sm h-md-250">
                <div className="card-body d-flex flex-column align-items-start">
                  <strong className="d-inline-block mb-2 text-success">
                    Design
                  </strong>
                  <h3 className="mb-0">
                    <a className="text-dark" href="#">
                      Post title
                    </a>
                  </h3>
                  <div className="mb-1 text-muted">Nov 11</div>
                  <p className="card-text mb-auto">
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content.
                  </p>
                  <a href="#">Continue reading</a>
                </div>
                <img
                  className="card-img-right flex-auto d-none d-lg-block"
                  data-src="holder.js/200x250?theme=thumb"
                  alt="Card image cap"
                />
              </div>
            </div>
          </div> */}
        </div>

        <main role="main" className="container py-3 py-md-5">
          <div className="row">
            <div className="col-md-8 blog-main">
              <div className="blog-post">
                <h2 className="blog-post-title">Now Playing</h2>
                <div className="carousel ">
                  <Slider {...settings}>
                    <div>
                      <img
                        data-src="holder.js/201x298?theme=thumb"
                        alt="Card image cap"
                      />
                    </div>
                    <div>
                      <img
                        data-src="holder.js/201x298?theme=thumb"
                        alt="Card image cap"
                      />
                    </div>
                    <div>
                      <img
                        data-src="holder.js/201x298?theme=thumb"
                        alt="Card image cap"
                      />
                    </div>
                    <div>
                      <img
                        data-src="holder.js/201x298?theme=thumb"
                        alt="Card image cap"
                      />
                    </div>
                    <div>
                      <img
                        data-src="holder.js/201x298?theme=thumb"
                        alt="Card image cap"
                      />
                    </div>
                    <div>
                      <img
                        data-src="holder.js/201x298?theme=thumb"
                        alt="Card image cap"
                      />
                    </div>
                  </Slider>
                </div>
              </div>

              <div className="blog-post">
                <h2 className="blog-post-title">Top News</h2>
                <p className="blog-post-meta">
                  December 14, 2013 by <a href="#">Chris</a>
                </p>

                <p>
                  Cum sociis natoque penatibus et magnis dis parturient montes,
                  nascetur ridiculus mus. Aenean lacinia bibendum nulla sed
                  consectetur. Etiam porta sem malesuada magna mollis euismod.
                  Fusce dapibus, tellus ac cursus commodo, tortor mauris
                  condimentum nibh, ut fermentum massa justo sit amet risus.
                </p>
                <ul>
                  <li>
                    Praesent commodo cursus magna, vel scelerisque nisl
                    consectetur et.
                  </li>
                  <li>Donec id elit non mi porta gravida at eget metus.</li>
                  <li>Nulla vitae elit libero, a pharetra augue.</li>
                </ul>
                <p>
                  Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras
                  mattis consectetur purus sit amet fermentum. Aenean lacinia
                  bibendum nulla sed consectetur.
                </p>
                <p>
                  Donec ullamcorper nulla non metus auctor fringilla. Nulla
                  vitae elit libero, a pharetra augue.
                </p>
              </div>

              <nav className="blog-pagination">
                <a className="btn btn-outline-primary" href="#">
                  Older
                </a>
                <a className="btn btn-outline-secondary disabled" href="#">
                  Newer
                </a>
              </nav>
            </div>

            <aside className="col-md-4 blog-sidebar">
              <div className="p-3 mb-3 bg-light rounded">
                <h4>Watchlist</h4>
                <ul className="mb-0 list-unstyled">
                  <li className=" p-0">
                    <i className="fas fa-heart pr-2" />
                    Harry Potter and the stone
                  </li>
                  <li className="p-0">
                    <i className="fas fa-heart pr-2" />
                    Harry Potter and the stone
                  </li>
                  <li className="p-0">
                    <i className="fas fa-heart pr-2" />
                    Harry Potter and the stone
                  </li>
                </ul>
              </div>

              <div className="p-3">
                <h4 className="">Opening this week</h4>
                <ol className="list-unstyled mb-0">
                  <li>
                    <a href="#">March 2014</a>
                  </li>
                  <li>
                    <a href="#">February 2014</a>
                  </li>
                  <li>
                    <a href="#">January 2014</a>
                  </li>
                  <li>
                    <a href="#">December 2013</a>
                  </li>
                </ol>
              </div>

              {/* <div className="p-3">
                <h4 className="font-italic">Elsewhere</h4>
                <ol className="list-unstyled">
                  <li>
                    <a href="#">GitHub</a>
                  </li>
                  <li>
                    <a href="#">Twitter</a>
                  </li>
                  <li>
                    <a href="#">Facebook</a>
                  </li>
                </ol>
              </div> */}
            </aside>
          </div>
        </main>

        <footer className="blog-footer">
          <p>
            Powered By
            <a href="https://themoviedb.org/"> themoviedb, </a>
            <a href="https://newsapi.org/"> newsapi </a>.
          </p>
          <p>
            <a href="#">Back to top</a>
          </p>
        </footer>
      </div>
    );
  }
}

export default App;
