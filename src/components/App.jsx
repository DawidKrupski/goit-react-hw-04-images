import React from 'react';
import axios from 'axios';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';

const API_key = '13558836-548568db06f41293b437b04a2';

export class App extends React.Component {
  state = {
    search: '',
    images: [],
    page: 0,
    perPage: 12,
    error: null,
    isLoading: false,
  };

  async getURL() {
    const url = `https://pixabay.com/api/?q=${this.state.search}&page=${this.state.page}&key=${API_key}&image_type=photo&orientation=horizontal&per_page=${this.state.perPage}`;
    try {
      const response = await axios.get(url);
      this.setState({
        images: [...this.state.images, ...response.data.hits],
      });
    } catch (error) {
      this.setState({
        error: error.message,
      });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  }

  handleSubmit = async evt => {
    this.setState({ isLoading: true });
    evt.preventDefault();
    await this.setState({
      page: 1,
      images: [],
    });
    this.getURL();
  };

  handleLoadMore = async evt => {
    this.setState({ isLoading: true });

    await this.setState({
      page: this.state.page + 1,
    });
    this.getURL();
  };

  handleInput = evt => {
    this.setState({
      search: evt.target.value,
    });
  };

  render() {
    return (
      <>
        <Searchbar
          handleInput={this.handleInput}
          handleSubmit={this.handleSubmit}
        />
        <ImageGallery images={this.state.images} />
        {this.state.isLoading ? <Loader /> : null}
        {!this.state.isLoading ? (
          <Button
            handleLoadMore={this.handleLoadMore}
            images={this.state.images}
          />
        ) : null}
      </>
    );
  }
}
