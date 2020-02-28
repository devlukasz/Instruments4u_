import searchClient from './searchClient';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  InstantSearch,
  Hits,
  SearchBox,
  Highlight,
  Pagination,
  Configure,
  Stats,
  SortBy,
} from 'react-instantsearch-dom';
import { Fade, Flip, Bounce } from 'react-reveal';
import StarRatings from 'react-star-ratings';
import PropTypes from 'prop-types';
import './App.css';
import Header from './Header';

class App extends Component {
  render() {
    return (
      <div className="ais-InstantSearch">
        <Fade down>
          <Header />
        </Fade>
        <div className="container">
          <InstantSearch searchClient={searchClient} indexName="guitar">
            <div className="right-panel">
              <SortBy
                defaultRefinement="guitar"
                items={[
                  { value: 'guitar', label: 'Featured' },
                  { value: 'guitar_price_asc', label: 'Price asc.' },
                  { value: 'guitar_price_desc', label: 'Price desc.' },
                ]}
              />
              <Stats />
            </div>
            <div className="search-panel">
              <div className="search-panel__filters">
                <Configure hitsPerPage={12} />
              </div>
              <div className="search-panel__results">
                <SearchBox
                  className="searchbox"
                  translations={{
                    placeholder: 'Search for your Guitar!',
                  }}
                />
                <Fade up>
                  <Hits hitComponent={Hit} />
                  <div className="pagination">
                    <Pagination />
                  </div>
                </Fade>
              </div>
            </div>
          </InstantSearch>
        </div>
      </div>
    );
  }
}

function Hit(props) {
  const { objectID, rating } = props.hit;
  return (
    <Fade>
      <Link to={`/details/${objectID}`}>
        <article className="hit">
          <div className="product-picture-wrapper">
            <div className="product-picture">
              <Flip left>
                <img alt={props.hit.name} src={props.hit.image} />
              </Flip>
            </div>
          </div>
          <Fade>
            <div>
              <h1>
                <Highlight attribute="title" hit={props.hit} />
              </h1>
              <p>
                £
                <Highlight attribute="price" hit={props.hit} />
              </p>
              <p>
                <Highlight attribute="discount" hit={props.hit} />
              </p>
              <h5>
                <Highlight attribute="website" hit={props.hit} />
              </h5>
              <Bounce up delay={200}>
                <h5>
                  Rating:{' '}
                  <StarRatings
                    rating={isNaN(parseFloat(rating)) ? 0 : parseFloat(rating)}
                    starRatedColor="#ffc100"
                    starDimension="15px"
                    starSpacing="0px"
                    // changeRating={this.changeRating}
                    numberOfStars={5}
                    name="rating"
                  />
                </h5>
              </Bounce>
            </div>
          </Fade>
        </article>
      </Link>
    </Fade>
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};
export default App;
