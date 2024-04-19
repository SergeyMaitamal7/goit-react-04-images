import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ showLargeImg, image }) => {
  return (
    <GalleryItem
      key={image.id}
      className="gallery-item"
      onClick={() => showLargeImg(image.largeImageURL)}
    >
      <GalleryItemImage src={image.webformatURL} alt="" />
    </GalleryItem>
  );
};
