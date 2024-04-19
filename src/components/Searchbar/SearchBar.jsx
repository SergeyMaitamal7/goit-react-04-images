import { useState } from 'react';
import Notiflix from 'notiflix';
import { BsSearch } from 'react-icons/bs';
import {
  ButtonLabel,
  Input,
  SearchForm,
  SearchFormButton,
  SearchbarForm,
} from './Searchbar.styled';

export const Searchbar = ({ submit }) => {
  const [qwery, setQwery] = useState('');

  const handleChangeInput = evt => {
    setQwery(evt.target.value.toLowerCase());
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (qwery.trim() === '') {
      Notiflix.Notify.failure('Enter your query');
      return;
    }
    submit(qwery);
    onReset();
  };
  const onReset = () => {
    setQwery('');
  };

  return (
    <>
      <SearchbarForm className="searchbar">
        <SearchForm
          className="form"
          onSubmit={handleSubmit}
          onChange={handleChangeInput}
        >
          <SearchFormButton type="submit" className="button">
            <BsSearch size="2rem" color="black" />
            <ButtonLabel className="button-label">Search</ButtonLabel>
          </SearchFormButton>

          <Input
            className="input"
            type="text"
            value={qwery}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchbarForm>
    </>
  );
};
