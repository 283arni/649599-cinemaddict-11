import AbstractComponent from './abstract-component';

const createLoadingMoviesTemplate = () => {
  return `<h2 class="films-list__title">Loading...</h2>`;
};

export default class LoadingMovies extends AbstractComponent {
  getTemplate() {
    return createLoadingMoviesTemplate();
  }
}
