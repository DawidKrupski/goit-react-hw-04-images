import React, { useEffect, useState, useCallback } from 'react';
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
  const [isError, setIsError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const perPage = 12;

  const handleGetImages = useCallback(async () => {
    setLoading(true);
    const url = `https://pixabay.com/api/?q=${search}&page=${page}&key=${API_key}&image_type=photo&orientation=horizontal&per_page=${perPage}`;
    try {
      const response = await axios.get(url);
      const newImages = response.data.hits;
      setImages(prevImages => [...prevImages, ...newImages]);
    } catch (error) {
      const errorMessage = error.message;
      setIsError(errorMessage);
      console.log(isError);
    } finally {
      setLoading(false);
    }
  }, [search, page]);

  const handleSubmit = evt => {
    evt.preventDefault();
    const query = evt.target['query'].value;
    if (query === search) return;
    setPage(1);
    setImages([]);
    setSearch(query);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    handleGetImages();
  }, [handleGetImages]);

  return (
    <>
      <Searchbar handleSubmit={handleSubmit} />
      <ImageGallery images={images} />
      {isLoading ? <Loader /> : null}
      {!isLoading ? (
        <Button handleLoadMore={handleLoadMore} images={images} />
      ) : null}
    </>
  );
};
