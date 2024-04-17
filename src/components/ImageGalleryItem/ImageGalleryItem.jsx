import React, { Component } from 'react';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  render() {
    const { showLargeImg, image } = this.props;
    
    return (
      <GalleryItem
        key={image.id}
        className="gallery-item"
        onClick={() => showLargeImg(image.largeImageURL)}
      >
        <GalleryItemImage src={image.webformatURL} alt="" />
      </GalleryItem>
    );
  }
}
