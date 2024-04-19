import { useEffect } from 'react';
import { Imglarge, ModalDiv, Overlay } from './Modal.styled';

export const Modal = ({ largeUrl, toggleModal }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      toggleModal();
    }
  };

  const handleCloseBackdrope = e => {
    if (e.currentTarget === e.target) {
      toggleModal();
    }
  };

  return (
    <Overlay onClick={handleCloseBackdrope}>
      <ModalDiv>
        <Imglarge src={largeUrl} alt="LargeImage" />
      </ModalDiv>
    </Overlay>
  );
};
