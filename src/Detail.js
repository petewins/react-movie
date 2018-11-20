import React, { Component } from 'react';

class Detail extends Component {
  render() {
    return (
      <div className="row mb-2">
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
      </div>
    );
  }
}

export default Detail;
