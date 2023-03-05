import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends React.Component {
  handleImageClick = () => {
    const { largeImageURL, tags } = this.props;
    this.props.onClick(largeImageURL, tags);
  };
  render() {
    const { id, webformatURL } = this.props;
    return (
      <li key={id} className={css.galleryItem}>
        <img
          className={css['galleryItem-image']}
          src={webformatURL}
          alt=""
          loading="lazy"
          onClick={this.handleImageClick}
        />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func,
  webformatURL: PropTypes.string,
  id: PropTypes.number,
  largeImageURL: PropTypes.string,
};
