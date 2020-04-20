import AbstractComponent from './abstract-component';

const createContainerTamplate = () => {
  return `<div class="films-list__container"></div>`;
};


export default class Container extends AbstractComponent {
  getTemplate() {
    return createContainerTamplate();
  }
}
