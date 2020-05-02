import ButtonMoreComponent from '../components/button-more';
import ListTopComponent from '../components/list-top';
import ListMostComponent from '../components/list-most';
import ContainerComponent from '../components/container';
import MovieController from '../controllers/movie-controller';
import SortComponent, {SortType} from '../components/sort';
import NoMoviesComponent from '../components/no-movies';
import {remove, replaceTitle, PositionElement, render} from '../utils/render';

const Quantity = {
  RENDER_MOVIES: 5,
  RENDER_MOVIES_IF_CLICK_BUTTON: 5,
  MOVIES_EXTRA: 2,
};

const main = document.querySelector(`.main`);

const renderCardsInContainer = (component, movies, onDataChange, onViewChange, inContainer = false) => {

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
    const movieController = new MovieController(elementContainer, onDataChange, onViewChange);
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
      sortedCards = showingTasks.sort((a, b) => b.year - a.year);
      break;
    case SortType.DEFAULT:
      sortedCards = showingTasks;
      break;
  }

  return sortedCards.slice(from, to);
};


export default class PageController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._showedMoviesControllers = [];
    this._showedMoviesExtraControllers = [];
    this.showingCardsCount = Quantity.RENDER_MOVIES;

    this._buttonMoreComponent = new ButtonMoreComponent();
    this._listTopComponent = new ListTopComponent();
    this._listMostComponent = new ListMostComponent();
    this._noMoviesComponent = new NoMoviesComponent();
    this._sortComponent = new SortComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._sortMoviesRender = this._sortMoviesRender.bind(this);
    this._buttonMoreComponentClick = this._buttonMoreComponentClick.bind(this);


    this._sortComponent.setSortTypeChangeHandler(this._sortMoviesRender);
    this._moviesModel.setFilterChangeHandler(this._onFilterChange);

  }

  render() {
    const movies = this._moviesModel.getMovies();


    render(main, this._sortComponent, PositionElement.BEFOREEND);
    render(main, this._container, PositionElement.BEFOREEND);

    const moveisList = this._container.getElement().querySelector(`.films-list`);

    if (!movies.length) {
      replaceTitle(this._noMoviesComponent, this._content);
      return;
    }

    const newCards = renderCardsInContainer(moveisList, movies.slice(0, Quantity.RENDER_MOVIES), this._onDataChange, this._onViewChange);
    this._showedMoviesControllers = this._showedMoviesControllers.concat(newCards);

    this._renderButtonMore();


    render(this._container.getElement(), this._listTopComponent, PositionElement.BEFOREEND);
    render(this._container.getElement(), this._listMostComponent, PositionElement.BEFOREEND);

    const listsExtra = this._container.getElement().querySelectorAll(`.films-list--extra`);

    listsExtra.forEach((elem) => {
      const newCardsExtra = renderCardsInContainer(elem, movies.slice(0, Quantity.MOVIES_EXTRA), this._onDataChange, this._onViewChange);
      this._showedMoviesExtraControllers = this._showedMoviesExtraControllers.concat(newCardsExtra);
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

    const newCards = renderCardsInContainer(this._container, sortedCards.slice(prevCardsCount, this.showingCardsCount), this._onDataChange, this._onViewChange, true);
    this._showedMoviesControllers = this._showedMoviesControllers.concat(newCards);

    if (this.showingCardsCount >= movies.length) {
      remove(this._buttonMoreComponent);
    }
  }

  _updateMovies(count) {
    this._removeMovies();
    this._renderMovies(this._moviesModel.getMovies().slice(0, count));
  }

  _onDataChange(movieController, oldData, newData) {
    const isSuccess = this._moviesModel.updateMovie(oldData.id, newData);

    if (isSuccess) {
      movieController.render(newData);
    }
  }

  _removeMovies() {
    this._showedMoviesControllers.forEach((movieController) => movieController.destroy());
    this._showedMoviesControllers = [];
  }

  _renderMovies(movies) {
    const newMovies = renderCardsInContainer(this._container, movies, this._onDataChange, this._onViewChange, true);

    this._showedMoviesControllers = this._showedMoviesControllers.concat(newMovies);
    this._showedMoviesCount = this._showedMoviesControllers.length;
  }

  _onViewChange() {
    this._showedMoviesControllers.forEach((item) => item.setDefaultView());
    this._showedMoviesExtraControllers.forEach((item) => item.setDefaultView());
  }

  _onFilterChange() {
    this._updateMovies(Quantity.RENDER_MOVIES);
    this._sortComponent.setActiveSort(SortType.DEFAULT);
  }
}
