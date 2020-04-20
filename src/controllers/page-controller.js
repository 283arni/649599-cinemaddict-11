import ButtonMoreComponent from '../components/button-more';
import ListTopComponent from '../components/list-top';
import ListMostComponent from '../components/list-most';
import ContainerComponent from '../components/container';
import CardComponent from '../components/card';
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

const renderCardsInContainer = (component, times, movies, reviews, start = Quantity.START_SLICE_MOVIES, clear = false) => {
  let container = null;
  let elem = null;

  // Проверка рендерит с нулегого объекта массива фильмов и не сортировка
  if (!start && !clear) {
    container = new ContainerComponent();
    elem = container.getElement();
    render(component, container, PositionElement.BEFOREEND);
  } else {
    container = component;
    elem = component.getElement().querySelector(`.films-list__container`);

    // При сортировки очистить контейнер
    if (clear) {
      elem.innerHTML = ``;
    }
  }

  let showingCardsCount = times;
  const cardComponent = new CardComponent();

  movies.slice(start, showingCardsCount)
    .forEach((movie) => render(elem, new CardComponent(movie), PositionElement.BEFOREEND));

  cardComponent.setClickElementCard(container, movies, reviews);
};

const getSortedCards = (tasks, sortType) => {
  let sortedCards = [];
  const showingTasks = tasks.slice();

  switch (sortType) {
    case SortType.RATING:
      sortedCards = showingTasks.sort((a, b) => a.rating - b.rating);
      break;
    case SortType.DATE:
      sortedCards = showingTasks.sort((a, b) => a.year - b.year);
      break;
    case SortType.DEFAULT:
      sortedCards = showingTasks;
      break;
  }

  return sortedCards;
};


export default class PageController {
  constructor(content) {
    this._content = content;

    this._buttonMoreComponent = new ButtonMoreComponent();
    this._listTopComponent = new ListTopComponent();
    this._listMostComponent = new ListMostComponent();
    this._noMoviesComponent = new NoMoviesComponent();
    this._sortComponent = new SortComponent();
  }

  render(cards, comments) {
    render(main, this._sortComponent, PositionElement.BEFOREEND);
    render(main, this._content, PositionElement.BEFOREEND);

    let showingCardsCount = Quantity.RENDER_MOVIES;

    const renderButtonMore = () => {
      render(moveisList, this._buttonMoreComponent, PositionElement.BEFOREEND);

      this._buttonMoreComponent.setClickHandler(() => {
        const prevCardsCount = showingCardsCount;
        showingCardsCount = showingCardsCount + Quantity.RENDER_MOVIES_IF_CLICK_BUTTON;

        const sortedCards = getSortedCards(cards, this._sortComponent.getSortType());

        renderCardsInContainer(this._content, showingCardsCount, sortedCards, comments, prevCardsCount);

        if (showingCardsCount >= cards.length) {
          remove(this._buttonMoreComponent);
        }
      });
    };

    const moveisList = this._content.getElement().querySelector(`.films-list`);

    if (!cards.length) {
      replaceTitle(this._noMoviesComponent, this._content);
      return;
    }

    renderCardsInContainer(moveisList, Quantity.RENDER_MOVIES, cards, comments);
    renderButtonMore();


    render(this._content.getElement(), this._listTopComponent, PositionElement.BEFOREEND);
    render(this._content.getElement(), this._listMostComponent, PositionElement.BEFOREEND);

    const listsExtra = this._content.getElement().querySelectorAll(`.films-list--extra`);

    listsExtra.forEach((elem) => {
      renderCardsInContainer(elem, Quantity.MOVIES_EXTRA, cards, comments);
    });


    this._sortComponent.setSortTypeChangeHandler((sortType) => {


      const sortedCards = getSortedCards(cards, sortType, 0, showingCardsCount);

      renderCardsInContainer(this._content, showingCardsCount, sortedCards, comments, 0, true);
    });
  }
}
