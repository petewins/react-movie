import React, { Component } from 'react';

class News extends Component {

  addDefaultSrc(ev) {
    console.log(ev);
    ev.target.src = 'https://i.imgur.com/NjkZ4eT.png'
  }


  render() {
    console.log(this.props);
    let articles = this.props.articles.map((article, index) => {
      if (index < 5)
        return (
          <div key={index} className="row">
            <div className="col-lg-4 pt-2">
              <img width={'200px'} src={article.image} onError={this.addDefaultSrc} />
              <p className="blog-post-meta">{article.date}</p>
            </div>
            <div className="col-lg-8">
              <a href={article.url} target="_blank">
                <h5>{article.title}</h5>
              </a>
              <p>{article.description}</p>
            </div>
          </div>
        );
    });
    return (articles);
  }
}

export default News;
