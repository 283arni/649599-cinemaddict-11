import AbstractComponent from './abstract-component';

const createMostCommentsListTemplate = () => {
  return (
    `<section class="films-list--extra films-list--extra-top">
      <h2 class="films-list__title">Top rated</h2>

    </section>`
  );
};

export default class ListTop extends AbstractComponent {
  getTemplate() {
    return createMostCommentsListTemplate();
  }
}
