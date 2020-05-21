import AbstractComponent from './abstract-component';

const craeteAmountMoviesTemplate = (cards) => {
  return `<p>${cards.length} movies inside</p>`;
};

export default class AmountMovies extends AbstractComponent {
  constructor(movies) {
    super();

    this._cards = movies;
  }
  getTemplate() {
    return craeteAmountMoviesTemplate(this._cards);
  }
}

