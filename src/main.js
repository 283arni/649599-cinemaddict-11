import RankComponent from './components/rank';
import NavComponent from './components/nav';
import SortComponent from './components/sort';
import ContentComponent from './components/content';
import CardComponent from './components/card';
import ButtonMoreComponent from './components/button-more';
import ListTopComponent from './components/list-top';
import ListMostComponent from './components/list-most';
import PopupComponent from './components/popup';
import AmountMoviesComponent from './components/amount-all-movies';
import {generateCards} from './mock/card';
import {fillMenuItems} from './mock/nav';
import {PositionElement, render} from './utils';

const Quantity = {
  MOVIES: 22,
  RENDER_MOVIES: 5,
  RENDER_MOVIES_IF_CLICK_BUTTON: 5,
  MOVIES_EXTRA: 2
};

const ESC_KEY = `Escape`;


const body = document.querySelector(`body`);
const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footerStatistics = document.querySelector(`.footer__statistics`);


const openPopup = (card) => {
  if (!body.querySelector(`.film-details`)) {
    const popupComponent = new PopupComponent(card);

    render(body, popupComponent.getElement(), PositionElement.BEFOREEND);

    const closeBtn = popupComponent.getElement().querySelector(`.film-details__close-btn`);

    const closePopup = () => {
      popupComponent.getElement().remove();
      closeBtn.removeEventListener(`click`, onCloseBtnClick);
      document.removeEventListener(`keydown`, onCloseBtnKeydown);
    };

    const onCloseBtnClick = () => {
      closePopup();
    };

    const onCloseBtnKeydown = (e) => {
      if (e.key === ESC_KEY) {
        closePopup();
      }
    };

    closeBtn.addEventListener(`click`, onCloseBtnClick);
    document.addEventListener(`keydown`, onCloseBtnKeydown);
  }
};


const watchClickElementsCard = (elements, info) => {
  elements.forEach((element, i) => {
    element.addEventListener(`click`, () => {
      openPopup(info[i]);
    });
  });
};

const callClickOnNewElem = (container, arr) => {
  const titleMovie = container.querySelectorAll(`.film-card__title`);
  const posterMovie = container.querySelectorAll(`.film-card__poster`);
  const commentsMovie = container.querySelectorAll(`.film-card__comments`);

  watchClickElementsCard(titleMovie, arr);
  watchClickElementsCard(posterMovie, arr);
  watchClickElementsCard(commentsMovie, arr);
};

render(header, new RankComponent().getElement(), PositionElement.BEFOREEND);

const cards = generateCards(Quantity.MOVIES);
const navItems = fillMenuItems();

const contentComponent = new ContentComponent();

render(main, new NavComponent(navItems).getElement(), PositionElement.BEFOREEND);
render(main, new SortComponent().getElement(), PositionElement.BEFOREEND);
render(main, contentComponent.getElement(), PositionElement.BEFOREEND);

const moveisList = contentComponent.getElement().querySelector(`.films-list`);
const moveisContainer = contentComponent.getElement().querySelector(`.films-list__container`);
let showingCardsCount = Quantity.RENDER_MOVIES;


cards.slice(0, showingCardsCount)
  .forEach((card) => render(moveisContainer, new CardComponent(card).getElement(), PositionElement.BEFOREEND));

callClickOnNewElem(moveisContainer, cards);

const buttonMoreComponent = new ButtonMoreComponent();

render(moveisList, buttonMoreComponent.getElement(), PositionElement.BEFOREEND);
render(contentComponent.getElement(), new ListTopComponent().getElement(), PositionElement.BEFOREEND);
render(contentComponent.getElement(), new ListMostComponent().getElement(), PositionElement.BEFOREEND);
render(footerStatistics, new AmountMoviesComponent().getElement(), PositionElement.BEFOREEND);

const listsExtra = contentComponent.getElement().querySelectorAll(`.films-list--extra`);

listsExtra.forEach((elem) => {
  const elemContainer = elem.querySelector(`.films-list__container`);

  for (let i = 0; i < Quantity.MOVIES_EXTRA; i++) {
    render(elemContainer, new CardComponent(cards[i]).getElement(), PositionElement.BEFOREEND);
  }

  callClickOnNewElem(elemContainer, cards);
});

buttonMoreComponent.getElement().addEventListener(`click`, () => {
  const prevCardsCount = showingCardsCount;
  showingCardsCount = showingCardsCount + Quantity.RENDER_MOVIES_IF_CLICK_BUTTON;

  cards.slice(prevCardsCount, showingCardsCount)
    .forEach((card) => render(moveisContainer, new CardComponent(card).getElement(), PositionElement.BEFOREEND));

  callClickOnNewElem(moveisContainer, cards);

  if (showingCardsCount >= cards.length) {
    buttonMoreComponent.getElement().remove();
  }
});

