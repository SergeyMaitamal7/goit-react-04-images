import React, { Component } from 'react';
import { Imglarge, ModalDiv, Overlay } from './Modal.styled';

export class Modal extends Component {
 
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.toggleModal();
    }
  };

  handleCloseBackdrope = e => {
    if (e.currentTarget === e.target) {
      this.props.toggleModal();
    }
  };

  render() {
    const { largeUrl } = this.props;

    return (
      <Overlay onClick={this.handleCloseBackdrope}>
        <ModalDiv>
          <Imglarge src={largeUrl} alt="LargeImage" />
        </ModalDiv>
      </Overlay>
    );
  }
}
