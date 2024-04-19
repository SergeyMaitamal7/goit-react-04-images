import { useState, useEffect } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { apiImages } from 'api/apiImages';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [qwery, setQwery] = useState('');
  const [images, setImages] = useState([]);
  const [perPage, setPerPage] = useState(12);
  const [page, setPage] = useState(1);
  const [largeUrl, setLargeUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (qwery === '') {
      return;
    }
    setLoading(true);
    const fetch = async () => {
      try {
        const { hits, totalHits } = await apiImages(qwery, page, perPage);
        setImages(hits);
        if (totalHits === 0) {
          Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }
        setImages(prevState => [...prevState, ...hits]);
        setShowBtn(page < totalHits / 12);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [qwery, page, perPage]);

  const handleSubmitForm = newQwery => {
    if (qwery === newQwery) {
      Notify.failure('We find it already, change search query');
      return;
    }
    setQwery(newQwery);
    setPage(1);
    setImages([]);
    setShowBtn(false);
  };

  const handleClickLoadMore = () => {
    setPage(page => page + 1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const showLargeImg = largeUrl => {
    setLargeUrl(largeUrl);
    setShowModal(true);
  };

  return (
    <>
      <Searchbar submit={handleSubmitForm} />
      {images && <ImageGallery showLargeImg={showLargeImg} images={images} />}
      {showModal && <Modal largeUrl={largeUrl} toggleModal={toggleModal} />}
      {showBtn && (
        <Button onLoadMore={handleClickLoadMore} text={'Load more'} />
      )}
      {loading && <Loader />}
    </>
  );
};

// import React, { Component } from 'react';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { Modal } from './Modal/Modal';
// import { Searchbar } from './Searchbar/SearchBar';
// import { ImageGallery } from './ImageGallery/ImageGallery';
// import { apiImages } from 'api/apiImages';
// import { Button } from './Button/Button';
// import { Loader } from './Loader/Loader';

// export class App extends Component {
//   state = {
//     qwery: '',
//     images: [],
//     perPage: 12,
//     page: 1,
//     largeUrl: null,
//     loading: false,
//     showBtn: false,
//     showModal: false,
//   };

//   async componentDidUpdate(prevProps, prevState) {
//     const { qwery, images, page, perPage } = this.state;

//     if (prevState.qwery !== qwery || prevState.page !== page) {
//       this.setState({ loading: true });

//       try {
//         const { hits, totalHits } = await apiImages(qwery, page, perPage);
//         this.setState({ images: hits });

//         if (totalHits === 0) {
//           Notify.failure(
//             'Sorry, there are no images matching your search query. Please try again.'
//           );
//           return;
//         }
//         this.setState(prevState => ({
//           images: [...images, ...prevState.images],
//           showBtn: page < totalHits / 12,
//         }));
//       } catch (error) {
//         console.log(error);
//       } finally {
//         this.setState({ loading: false });
//       }
//     }
//   }

//   handleSubmitForm = ({ qwery }) => {
//     this.setState({ qwery: qwery, page: 1, images: [], showBtn: false });
//   };

//   handleClickLoadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   toggleModal = () => {
//     this.setState({ showModal: !this.state.showModal });
//   };

//   showLargeImg = largeUrl => {
//     this.setState({ largeUrl: largeUrl, showModal: true });
//   };

//   render() {
//     const { images, loading, largeUrl, showBtn, showModal } = this.state;
//     return (
//       <>
//         <Searchbar submit={this.handleSubmitForm} />
//         {images && (
//           <ImageGallery showLargeImg={this.showLargeImg} images={images} />
//         )}
//         {showModal && (
//           <Modal largeUrl={largeUrl} toggleModal={this.toggleModal} />
//         )}
//         {showBtn && (
//           <Button onLoadMore={this.handleClickLoadMore} text={'Load more'} />
//         )}
//         {loading && <Loader />}
//       </>
//     );
//   }
// }
