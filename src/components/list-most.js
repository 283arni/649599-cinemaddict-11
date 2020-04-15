import {createElement} from '../utils';

const createMostCommentsListTemplate = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>

    </section>`
  );
};

export default class ListMost {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMostCommentsListTemplate();
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
