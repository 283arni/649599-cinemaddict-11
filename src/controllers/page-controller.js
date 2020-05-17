import ButtonMoreComponent from '../components/button-more';
import ListTopComponent from '../components/list-top';
import ListMostComponent from '../components/list-most';
import ContainerComponent from '../components/container';
import MovieController from '../controllers/movie-controller';
import {SortType} from '../components/sort';
import NoMoviesComponent from '../components/no-movies';
import LoadingMovies from '../components/loading-movie';
import {remove, replaceTitle, PositionElement, render} from '../utils/render';

const Quantity = {
  RENDER_MOVIES: 5,
  RENDER_MOVIES_IF_CLICK_BUTTON: 5,
  MOVIES_EXTRA: 2,
};

const main = document.querySelector(`.main`);

const renderCardsInContainer = (component, movies, onDataChange, onViewChange, api, inContainer = false) => {

  let container = null;
  let elementContainer = null;
  // Проверка куда рендерить
  if (!inContainer) {
    container = new ContainerComponent();
    elementContainer = container.getElement();
    render(component, container, PositionElement.BEFOREEND);
  } else {
    container = component;
    elementContainer = component.getElement().querySelector(`.films-list__container`);
  }

  return movies.map((movie) => {
    const movieController = new MovieController(elementContainer, onDataChange, onViewChange, api);
    movieController.render(movie);

    return movieController;
  });
};

const getSortedCards = (tasks, sortType, from, to) => {
  let sortedCards = [];
  const showingTasks = tasks.slice();

  switch (sortType) {
    case SortType.RATING:
      sortedCards = showingTasks.sort((a, b) => b.rating - a.rating);
      break;
    case SortType.DATE:
      sortedCards = showingTasks.sort((a, b) => b.releaseDate.substring(0, 4) - a.releaseDate.substring(0, 4));
      break;
    case SortType.COMMENTS:
      sortedCards = showingTasks.sort((a, b) => b.comments.length - a.comments.length);
      break;
    case SortType.DEFAULT:
      sortedCards = showingTasks;
      break;
  }

  return sortedCards.slice(from, to);
};


export default class PageController {
  constructor(container, sortComponent, moviesModel, api) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._api = api;

    this._showedMoviesControllers = [];
    this._showedMoviesExtraControllers = [];
    this.showingCardsCount = Quantity.RENDER_MOVIES;

    this._buttonMoreComponent = new ButtonMoreComponent();
    this._listTopComponent = new ListTopComponent(this._moviesModel.getMoviesAll());
    this._listMostComponent = new ListMostComponent(this._moviesModel.getMoviesAll());
    this._noMoviesComponent = new NoMoviesComponent();
    this._sortComponent = sortComponent;
    this._loadingMovies = new LoadingMovies();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._sortMoviesRender = this._sortMoviesRender.bind(this);
    this._buttonMoreComponentClick = this._buttonMoreComponentClick.bind(this);


    this._sortComponent.setSortTypeChangeHandler(this._sortMoviesRender);
    this._moviesModel.setFilterChangeHandler(this._onFilterChange);

  }

  hide() {
    this._container.hide();
  }

  show() {
    this._container.show();
  }

  render() {
    const movies = this._moviesModel.getMovies();

    render(main, this._sortComponent, PositionElement.BEFOREEND);
    render(main, this._container, PositionElement.BEFOREEND);

    const moveisList = this._container.getElement().querySelector(`.films-list`);

    if (!movies.length) {
      replaceTitle(this._noMoviesComponent, this._container);
      return;
    }

    const newCards = renderCardsInContainer(moveisList, movies.slice(0, Quantity.RENDER_MOVIES), this._onDataChange, this._onViewChange, this._api);
    this._showedMoviesControllers = this._showedMoviesControllers.concat(newCards);

    this._renderButtonMore();

    render(this._container.getElement(), this._listTopComponent, PositionElement.BEFOREEND);
    render(this._container.getElement(), this._listMostComponent, PositionElement.BEFOREEND);

    const listsExtra = this._container.getElement().querySelectorAll(`.films-list--extra`);

    listsExtra.forEach((elem) => {
      let sortedCards = getSortedCards(this._moviesModel.getMovies(), SortType.COMMENTS, 0, this.showingCardsCount);

      if (elem.classList.contains(`films-list--extra-top`)) {
        sortedCards = getSortedCards(this._moviesModel.getMovies(), SortType.RATING, 0, this.showingCardsCount);
      }
      renderCardsInContainer(elem, sortedCards.slice(0, Quantity.MOVIES_EXTRA), this._onDataChange, this._onViewChange, this._api);
    });
  }

  _sortMoviesRender(sortType) {
    const sortedCards = getSortedCards(this._moviesModel.getMovies(), sortType, 0, this.showingCardsCount);

    this._removeMovies();
    this._renderMovies(sortedCards);
  }

  _renderButtonMore() {
    const moveisList = this._container.getElement().querySelector(`.films-list`);

    render(moveisList, this._buttonMoreComponent, PositionElement.BEFOREEND);

    this._buttonMoreComponent.setClickHandler(this._buttonMoreComponentClick);
  }

  _buttonMoreComponentClick() {
    const movies = this._moviesModel.getMovies();
    const prevCardsCount = this.showingCardsCount;

    this.showingCardsCount = this.showingCardsCount + Quantity.RENDER_MOVIES_IF_CLICK_BUTTON;

    const sortedCards = getSortedCards(movies, this._sortComponent.getSortType());

    const newCards = renderCardsInContainer(this._container, sortedCards.slice(prevCardsCount, this.showingCardsCount), this._onDataChange, this._onViewChange, this._api, true);
    this._showedMoviesControllers = this._showedMoviesControllers.concat(newCards);

    if (this.showingCardsCount >= movies.length) {
      remove(this._buttonMoreComponent);
    }
  }

  _updateMovies(count) {
    const movies = this._moviesModel.getMovies();

    this._removeMovies();
    this._renderMovies(movies.slice(0, count));

    if (movies.length <= this.showingCardsCount) {
      remove(this._buttonMoreComponent);
    } else {
      this._renderButtonMore();
    }
  }

  _onDataChange(movieController, oldData, newData) {

    this._api.updateMovie(oldData.id, newData)
    .then((movieModel) => {
      const isSuccess = this._moviesModel.updateMovie(oldData.id, movieModel);

      if (isSuccess) {
        movieController.render(movieModel);
        this._updateMovies(this.showingCardsCount);
      }
    });
  }

  _removeMovies() {
    this._showedMoviesControllers.forEach((movieController) => movieController.destroy());
    this._showedMoviesControllers = [];
  }

  _renderMovies(movies) {
    const newMovies = renderCardsInContainer(this._container, movies, this._onDataChange, this._onViewChange, this._api, true);

    this._showedMoviesControllers = this._showedMoviesControllers.concat(newMovies);
    this._showedMoviesCount = this._showedMoviesControllers.length;
  }

  _onViewChange() {
    this._showedMoviesControllers.forEach((item) => item.setDefaultView());
    this._showedMoviesExtraControllers.forEach((item) => item.setDefaultView());
  }

  _onFilterChange() {
    this.showingCardsCount = Quantity.RENDER_MOVIES;

    this._updateMovies(this.showingCardsCount);
    this._sortComponent.setActiveSort(SortType.DEFAULT);
  }
}
