import {createElement} from '../utils';

const createMoreMoviesButtonTamplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class ButtonMore {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMoreMoviesButtonTamplate();
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
