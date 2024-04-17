import { Component } from 'react';
import { LoadMore } from './Button.styled';

export class Button extends Component {
  render() {
    const { onLoadMore, text } = this.props;
    return <LoadMore onClick={onLoadMore}>{text}</LoadMore>;
  }
}
