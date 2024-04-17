import React, { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { apiImages } from 'api/apiImages';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    qwery: '',
    images: [],
    perPage: 12,
    page: 1,
    largeUrl: null,
    loading: false,
    showBtn: false,
    showModal: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { qwery, images, page, perPage } = this.state;

    if (prevState.qwery !== qwery || prevState.page !== page) {
      this.setState({ loading: true });

      try {
        const { hits, totalHits } = await apiImages(qwery, page, perPage);
        this.setState({ images: hits });

        if (totalHits === 0) {
          Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }
        this.setState(prevState => ({
          images: [...images, ...prevState.images],
          showBtn: page < totalHits / 12,
        }));
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  handleSubmitForm = ({ qwery }) => {
    this.setState({ qwery: qwery, page: 1, images: [], showBtn: false });
  };

  handleClickLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  showLargeImg = largeUrl => {
    this.setState({ largeUrl: largeUrl, showModal: true });
  };

  render() {
    const { images, loading, largeUrl, showBtn, showModal } = this.state;
    return (
      <>
        <Searchbar submit={this.handleSubmitForm} />
        {images && (
          <ImageGallery showLargeImg={this.showLargeImg} images={images} />
        )}
        {showModal && (
          <Modal largeUrl={largeUrl} toggleModal={this.toggleModal} />
        )}
        {showBtn && (
          <Button onLoadMore={this.handleClickLoadMore} text={'Load more'} />
        )}
        {loading && <Loader />}
      </>
    );
  }
}
