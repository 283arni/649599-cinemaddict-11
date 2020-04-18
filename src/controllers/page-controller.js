import ButtonMoreComponent from '../components/button-more';
import ListTopComponent from '../components/list-top';
import ListMostComponent from '../components/list-most';
import ContainerComponent from '../components/container';
import CardComponent from '../components/card';
import NoMoviesComponent from '../components/no-movies';
import {remove, replaceTitle, PositionElement, render} from '../utils/render';

const Quantity = {
  RENDER_MOVIES: 5,
  RENDER_MOVIES_IF_CLICK_BUTTON: 5,
  MOVIES_EXTRA: 2,
  START_SLICE_MOVIES: 0
};

const main = document.querySelector(`.main`);

const renderCardsInContainer = (component, times, movies, reviews, start = Quantity.START_SLICE_MOVIES) => {
  let container = null;
  let elem = null;

  if (!start) {
    container = new ContainerComponent();
    elem = container.getElement();
    render(component, container, PositionElement.BEFOREEND);
  } else {
    container = component;
    elem = component.getElement().querySelector(`.films-list__container`);
  }

  let showingCardsCount = times;
  const cardComponent = new CardComponent();


  movies.slice(start, showingCardsCount)
    .forEach((movie) => render(elem, new CardComponent(movie), PositionElement.BEFOREEND));

  cardComponent.setClickElementCard(container, movies, reviews);
};


export default class PageController {
  constructor(content) {
    this._content = content;

    this._buttonMoreComponent = new ButtonMoreComponent();
    this._listTopComponent = new ListTopComponent();
    this._listMostComponent = new ListMostComponent();
    this._noMoviesComponent = new NoMoviesComponent();
  }

  render(cards, comments) {
    render(main, this._content, PositionElement.BEFOREEND);
    const moveisList = this._content.getElement().querySelector(`.films-list`);

    if (!cards.length) {
      replaceTitle(this._noMoviesComponent, this._content);
      return;
    }

    renderCardsInContainer(moveisList, Quantity.RENDER_MOVIES, cards, comments);

    render(moveisList, this._buttonMoreComponent, PositionElement.BEFOREEND);
    render(this._content.getElement(), this._listTopComponent, PositionElement.BEFOREEND);
    render(this._content.getElement(), this._listMostComponent, PositionElement.BEFOREEND);

    const listsExtra = this._content.getElement().querySelectorAll(`.films-list--extra`);

    listsExtra.forEach((elem) => {
      renderCardsInContainer(elem, Quantity.MOVIES_EXTRA, cards, comments);
    });

    let showingCardsCount = Quantity.RENDER_MOVIES;

    this._buttonMoreComponent.setClickHandler(() => {

      const prevCardsCount = showingCardsCount;
      showingCardsCount = showingCardsCount + Quantity.RENDER_MOVIES_IF_CLICK_BUTTON;

      renderCardsInContainer(this._content, showingCardsCount, cards, comments, prevCardsCount);

      if (showingCardsCount >= cards.length) {
        remove(this._buttonMoreComponent);
      }
    });
  }
}
