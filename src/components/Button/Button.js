import React from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';

export class Button extends React.Component {
  render() {
    const { handleLoadMore, images } = this.props;
    return (
      <div className={css.btn}>
        {images.length > 0 ? (
          <button onClick={handleLoadMore} className={css.button}>
            Load More
          </button>
        ) : null}
      </div>
    );
  }
}
Button.propTypes = {
  onClick: PropTypes.func,
};
