import {createElement} from '../utils';

const createContainerTamplate = () => {
  return `<div class="films-list__container"></div>`;
};


export default class Container {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createContainerTamplate();
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
