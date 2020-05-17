import AbstractComponent from './abstract-component';

const createMostCommentsListTemplate = () => {
  return (
    `<section class="films-list--extra films-list--extra-most">
      <h2 class="films-list__title">Most commented</h2>

    </section>`
  );
};

export default class ListMost extends AbstractComponent {
  getTemplate() {
    return createMostCommentsListTemplate();
  }
}
