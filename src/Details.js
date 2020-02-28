import searchClient from './searchClient';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { Fade, Flip, Bounce } from 'react-reveal';
import ReactImageMagnify from 'react-image-magnify';
import './App.css';
import './Details.css';
import Header from './Header';
const index = searchClient.initIndex('guitar');

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  componentWillMount() {
    const { objectID } = this.props.match.params;
    index.getObject(objectID).then(content =>
      this.setState(prevState => ({
        ...prevState,
        ...content,
        loaded: true,
      }))
    );
  }
  render() {
    const {
      price,
      title,
      type,
      website,
      description,
      discount,
      image,
      link,
      rating,
    } = this.state;

    return (
      <div className="ais-InstantSearch">
        <Header />
        <div className="container">
          <Fade when={this.state.loaded}>
            <div className="product-details">
              <Fade when={this.state.loaded} left big>
                <div className="product-preview">
                  <Flip left delay={400}>
                    <ReactImageMagnify
                      {...{
                        smallImage: {
                          alt: title,
                          isFluidWidth: true,
                          src: image,
                        },
                        largeImage: {
                          src: image,
                          width: 500,
                          height: 1100,
                        },
                        enlargedImageContainerStyle: {},
                      }}
                    />
                  </Flip>
                </div>
              </Fade>
              <Fade when={this.state.loaded} right big>
                <div className="product-info">
                  <h1>{title}</h1>
                  <h3>
                    Price: £{price}{' '}
                    {discount && (
                      <React.Fragment>| Save: £{discount}</React.Fragment>
                    )}
                  </h3>
                  <h4>Type: {type}</h4>
                  <h4>Short info about product:</h4>
                  <p>{description}</p>
                  <Bounce down when={this.state.loaded} delay={300}>
                    <h4>
                      Rating:{' '}
                      <StarRatings
                        rating={
                          isNaN(parseFloat(rating)) ? 0 : parseFloat(rating)
                        }
                        starRatedColor="#ffc100"
                        starDimension="25px"
                        starSpacing="2px"
                        // changeRating={this.changeRating}
                        numberOfStars={5}
                        name="rating"
                      />
                    </h4>
                  </Bounce>
                  <h4>From: {`${website}.co.uk`}</h4>
                  <div className="buttons">
                    <Link className="back" to="/">
                      Back To Products
                    </Link>
                    <a className="purchase" href={link}>
                      Purchase
                    </a>
                  </div>
                </div>
              </Fade>
            </div>
          </Fade>
        </div>
      </div>
    );
  }
}

export default Details;
