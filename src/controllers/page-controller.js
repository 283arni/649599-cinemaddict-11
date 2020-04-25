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
  START_SLICE_MOVIES: 0
};

const main = document.querySelector(`.main`);

const renderCardsInContainer = (component, times, movies, onDataChange, start = Quantity.START_SLICE_MOVIES, clear = false) => {
  let container = null;
  let elementContainer = null;

  // Проверка рендерит с нулегого объекта массива фильмов и не сортировка
  if (!start && !clear) {
    container = new ContainerComponent();
    elementContainer = container.getElement();
    render(component, container, PositionElement.BEFOREEND);
  } else {
    container = component;
    elementContainer = component.getElement().querySelector(`.films-list__container`);

    // При сортировки очистить контейнер
    if (clear) {
      elementContainer.innerHTML = ``;
    }
  }

  let showingCardsCount = times;

  const moviesSliced = movies.slice(start, showingCardsCount);

  return moviesSliced.map((movie) => {
    const movieController = new MovieController(elementContainer, onDataChange);

    movieController.render(movie);

    return movieController;
  });
};

const getSortedCards = (tasks, sortType) => {
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

  return sortedCards;
};


export default class PageController {
  constructor(container) {
    this._container = container;

    this._cards = [];
    this.showedMoviesController = [];
    this.showingCardsCount = Quantity.RENDER_MOVIES;

    this._buttonMoreComponent = new ButtonMoreComponent();
    this._listTopComponent = new ListTopComponent();
    this._listMostComponent = new ListMostComponent();
    this._noMoviesComponent = new NoMoviesComponent();
    this._sortComponent = new SortComponent();

    this._onDataChange = this._onDataChange.bind(this);
  }

  render(cards) {

    this._cards = cards;

    render(main, this._sortComponent, PositionElement.BEFOREEND);
    render(main, this._container, PositionElement.BEFOREEND);

    const moveisList = this._container.getElement().querySelector(`.films-list`);

    if (!this._cards.length) {
      replaceTitle(this._noMoviesComponent, this._content);
      return;
    }

    renderCardsInContainer(moveisList, Quantity.RENDER_MOVIES, this._cards, this._onDataChange);
    this._renderButtonMore();


    render(this._container.getElement(), this._listTopComponent, PositionElement.BEFOREEND);
    render(this._container.getElement(), this._listMostComponent, PositionElement.BEFOREEND);

    const listsExtra = this._container.getElement().querySelectorAll(`.films-list--extra`);

    listsExtra.forEach((elem) => {
      const newCards = renderCardsInContainer(elem, Quantity.MOVIES_EXTRA, this._cards, this._onDataChange);
      this.showedMoviesController = newCards;
    });


    this._sortComponent.setSortTypeChangeHandler((sortType) => {


      const sortedCards = getSortedCards(this._cards, sortType, 0, this.showingCardsCount);

      const newCards = renderCardsInContainer(this._container, this.showingCardsCount, sortedCards, this._onDataChange, 0, true);
      this.showedMoviesController = newCards;
    });
  }

  _renderButtonMore() {

    const moveisList = this._container.getElement().querySelector(`.films-list`);

    render(moveisList, this._buttonMoreComponent, PositionElement.BEFOREEND);

    this._buttonMoreComponent.setClickHandler(() => {
      const prevCardsCount = this.showingCardsCount;
      this.showingCardsCount = this.showingCardsCount + Quantity.RENDER_MOVIES_IF_CLICK_BUTTON;

      const sortedCards = getSortedCards(this._cards, this._sortComponent.getSortType());

      const newCards = renderCardsInContainer(this._container, this.showingCardsCount, sortedCards, this._onDataChange, prevCardsCount);
      this.showedMoviesController = this.showedMoviesController.concat(newCards);

      if (this.showingCardsCount >= this._cards.length) {
        remove(this._buttonMoreComponent);
      }
    });
  }

  _onDataChange(movieController, oldData, newData) {
    const index = this._cards.findIndex((it) => it === oldData);
    if (index === -1) {
      return;
    }

    this._cards = [].concat(this._cards.slice(0, index), newData, this._cards.slice(index + 1));

    movieController.render(this._cards[index]);
  }
}
