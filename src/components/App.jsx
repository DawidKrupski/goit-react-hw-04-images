import React, { useState } from 'react';
import axios from 'axios';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';

const API_key = '13558836-548568db06f41293b437b04a2';

export const App = () => {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const getURL = async () => {
    const url = `https://pixabay.com/api/?q=${search}&page=${page}&key=${API_key}&image_type=photo&orientation=horizontal&per_page=${perPage}`;
    try {
      const response = await axios.get(url);
      const newImages = response.data.hits;
      setImages([...images, ...newImages]);
    } catch (error) {
      const errorMessage = error.message;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async evt => {
    setLoading(true);
    evt.preventDefault();
    setPage(1);
    await setImages([]);
    getURL();
  };

  const handleLoadMore = async evt => {
    setLoading(true);
    await setPage(prevPage => prevPage + 1);
    getURL();
  };

  const handleInput = evt => {
    const searchValue = evt.target.value;
    setSearch(searchValue);
  };

  return (
    <>
      <Searchbar handleInput={handleInput} handleSubmit={handleSubmit} />
      <ImageGallery images={images} />
      {isLoading ? <Loader /> : null}
      {!isLoading ? (
        <Button handleLoadMore={handleLoadMore} images={images} />
      ) : null}
    </>
  );
};
