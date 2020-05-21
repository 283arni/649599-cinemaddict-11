import AbstractSmartComponent from './abstract-smart-component';

const createMostCommentsListTemplate = () => {
  return (
    `<section class="films-list--extra films-list--extra-most">
      <h2 class="films-list__title">Most commented</h2>

    </section>`
  );
};

export default class ListMost extends AbstractSmartComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return createMostCommentsListTemplate();
  }

  recoveryListeners() {}

  rerender() {
    super.rerender();
  }
}
