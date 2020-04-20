import AbstractComponent from './abstract-component';

const createContentTamplate = () => {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All moveisList. Upcoming</h2>

      </section>
    </section>`
  );
};


export default class Content extends AbstractComponent {
  getTemplate() {
    return createContentTamplate();
  }
}
