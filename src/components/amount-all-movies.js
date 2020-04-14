import {createElement} from '../utils';

const craeteAmountMoviesTemplate = () => {
  return `<p>130 291 movies inside</p>`;
};

export default class AmountMovies {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return craeteAmountMoviesTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

