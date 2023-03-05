import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Modal } from 'components/Modal/Modal';
import css from './ImageGallery.module.css';

export class ImageGallery extends React.Component {
  state = {
    isModalOpen: false,
    selectedImage: '',
    selectedTags: '',
  };

  handleModalOpen = (largeImageURL, tags) => {
    this.setState({
      isModalOpen: true,
      selectedImage: largeImageURL,
      selectedTags: tags,
    });
  };

  handleModalClose = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  render() {
    const { images } = this.props;
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
              onClick={this.handleModalOpen}
            />
          ))}
          {this.state.isModalOpen && (
            <Modal
              src={this.state.selectedImage}
              tags={this.state.selectedTags}
              onClick={this.handleModalClose}
            />
          )}
        </ul>
      </>
    );
  }
}

ImageGallery.propTypes = {
  onClick: PropTypes.func,
};
