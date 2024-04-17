import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import { Gallery } from './ImageGallery.styled';

export class ImageGallery extends Component {
  render() {
    const { images, showLargeImg } = this.props;

    return (
      <Gallery>
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            image={image}
            showLargeImg={showLargeImg}
          />
        ))}
      </Gallery>
    );
  }
}
