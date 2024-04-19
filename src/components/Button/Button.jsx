import { LoadMore } from './Button.styled';

export const Button = ({ onLoadMore, text }) => {
  return <LoadMore onClick={onLoadMore}>{text}</LoadMore>;
};
