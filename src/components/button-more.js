import AbstractComponent from './abstract-component';

const createMoreMoviesButtonTamplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class ButtonMore extends AbstractComponent {
  getTemplate() {
    return createMoreMoviesButtonTamplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
