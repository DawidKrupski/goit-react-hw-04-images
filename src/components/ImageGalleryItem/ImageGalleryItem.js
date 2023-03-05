import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  largeImageURL,
  tags,
  id,
  webformatURL,
  onClick,
}) => {
  const handleImageClick = () => {
    onClick(largeImageURL, tags);
  };

  return (
    <li key={id} className={css.galleryItem}>
      <img
        className={css['galleryItem-image']}
        src={webformatURL}
        alt=""
        loading="lazy"
        onClick={handleImageClick}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func,
  webformatURL: PropTypes.string,
  id: PropTypes.number,
  largeImageURL: PropTypes.string,
};
