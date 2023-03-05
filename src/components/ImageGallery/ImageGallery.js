import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Modal } from 'components/Modal/Modal';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedTags, setSelectedTags] = useState('');

  const handleModalOpen = (largeImageURL, tags) => {
    setIsModalOpen(true);
    setSelectedImage(largeImageURL);
    setSelectedTags(tags);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleKeyDown = event => {
    if (event.key === 'Escape' && isModalOpen) {
      setIsModalOpen(false);
      console.log('click');
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <>
      <ul className={css.gallery}>
        {images.map(Image => (
          <ImageGalleryItem
            key={Image.id}
            id={Image.id}
            webformatURL={Image.webformatURL}
            largeImageURL={Image.largeImageURL}
            tags={Image.tags}
            onClick={handleModalOpen}
          />
        ))}
        {isModalOpen && (
          <Modal
            src={selectedImage}
            tags={selectedTags}
            onClick={handleModalClose}
          />
        )}
      </ul>
    </>
  );
};

ImageGallery.propTypes = {
  onClick: PropTypes.func,
};
