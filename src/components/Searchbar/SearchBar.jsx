import { Component } from 'react';
import Notiflix from 'notiflix';
import { BsSearch} from 'react-icons/bs';
import { ButtonLabel, Input, SearchForm, SearchFormButton, SearchbarForm } from './Searchbar.styled';

export class Searchbar extends Component {
  state = { qwery: '' };

  handleChangeInput = evt => {
    this.setState({ qwery: evt.target.value.toLowerCase() });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    if (this.state.qwery.trim() === '') {
      Notiflix.Notify.failure('Enter your query');
      return;
    }
    this.props.submit({ qwery: this.state.qwery });
    this.resetForm();
  };

  resetForm() {
    this.setState({ qwery: '' });
  }

  render() {
    return (
      <>
        <SearchbarForm className="searchbar">
          <SearchForm
            className="form"
            onSubmit={this.handleSubmit}
            onChange={this.handleChangeInput}
          >
            <SearchFormButton type="submit" className="button"> <BsSearch size="2rem" color="black"/>
              <ButtonLabel className="button-label">Search</ButtonLabel>
            </SearchFormButton>

            <Input
              className="input"
              type="text"
              value={this.state.qwery}
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </SearchForm>
        </SearchbarForm>
      </>
    );
  }
}
