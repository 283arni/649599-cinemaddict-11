import {createRankTemplate} from './components/rank';
import {createStatisticTamplate} from './components/nav';
import {createSortTamplate} from './components/sort';
import {createContentTamplate} from './components/content';
import {createMovieTamplate} from './components/card';
import {createMoreMoviesButtonTamplate} from './components/button-more';
import {createTopListTemplate} from './components/list-top';
import {createMostCommentsListTemplate} from './components/list-most';
import {createPopupDetailsTemplate} from './components/popup';
import {craeteAmountMoviesTemplate} from './components/amount-all-movies';
import {generateCards} from './mock/card';
import {fillMenuItems} from './mock/nav';

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

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const openPopup = (card, commentaries) => {
  if (!body.querySelector(`.film-details`)) {

    render(body, createPopupDetailsTemplate(card, commentaries), `beforeend`);

    const popup = body.querySelector(`.film-details`);
    const closeBtn = popup.querySelector(`.film-details__close-btn`);

    const closePopup = () => {
      popup.remove();
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

render(header, createRankTemplate(), `beforeend`);

const cards = generateCards(Quantity.MOVIES);
const navItems = fillMenuItems();

render(main, createStatisticTamplate(navItems), `beforeend`);
render(main, createSortTamplate(), `beforeend`);
render(main, createContentTamplate(), `beforeend`);

const movies = main.querySelector(`.films`);
const moveisList = movies.querySelector(`.films-list`);
const moveisContainer = moveisList.querySelector(`.films-list__container`);
let showingCardsCount = Quantity.RENDER_MOVIES;


cards.slice(0, showingCardsCount)
  .forEach((card) => render(moveisContainer, createMovieTamplate(card), `beforeend`));

callClickOnNewElem(moveisContainer, cards);

// Отображает попап первого фильма
const titleMovie = moveisContainer.querySelector(`.film-card__title`);
titleMovie.click();

render(moveisList, createMoreMoviesButtonTamplate(), `beforeend`);
render(movies, createTopListTemplate(), `beforeend`);
render(movies, createMostCommentsListTemplate(), `beforeend`);
render(footerStatistics, craeteAmountMoviesTemplate(), `beforeend`);

const listsExtra = movies.querySelectorAll(`.films-list--extra`);

listsExtra.forEach((elem) => {
  const elemContainer = elem.querySelector(`.films-list__container`);

  for (let i = 0; i < Quantity.MOVIES_EXTRA; i++) {
    render(elemContainer, createMovieTamplate(cards[i]), `beforeend`);
  }

  callClickOnNewElem(elemContainer, cards);
});

const btnMore = moveisList.querySelector(`.films-list__show-more`);

btnMore.addEventListener(`click`, () => {
  const prevCardsCount = showingCardsCount;
  showingCardsCount = showingCardsCount + Quantity.RENDER_MOVIES_IF_CLICK_BUTTON;

  cards.slice(prevCardsCount, showingCardsCount)
    .forEach((card) => render(moveisContainer, createMovieTamplate(card), `beforeend`));

  callClickOnNewElem(moveisContainer, cards);

  if (showingCardsCount >= cards.length) {
    btnMore.remove();
  }
});

