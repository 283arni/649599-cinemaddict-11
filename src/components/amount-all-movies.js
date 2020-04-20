import AbstractComponent from './abstract-component';

const craeteAmountMoviesTemplate = () => {
  return `<p>130 291 movies inside</p>`;
};

export default class AmountMovies extends AbstractComponent {
  getTemplate() {
    return craeteAmountMoviesTemplate();
  }
}

