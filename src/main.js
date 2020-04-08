import {createRankTemplate} from './components/rank';
import {createStatisticTamplate} from './components/nav';
import {createSortTamplate} from './components/sort';
import {createContentTamplate} from './components/content';
import {createMovieTamplate} from './components/card';
import {createMoreMoviesButtonTamplate} from './components/button-more';
import {createTopListTemplate} from './components/list-top';
import {createMostCommentsListTemplate} from './components/list-most';
import {createPopupDetailsTemplate} from './components/popup';
import {generateCards} from './mock/card';
import {fillMenuItems} from './mock/nav';


const QUANTITY_MOVIES = 5;
const QUANTITY_MOVIES_EXTRA = 2;
const ESC_KEY = `Escape`;


const body = document.querySelector(`body`);
const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const openPopup = (card) => {
  if (!body.querySelector(`.film-details`)) {

    render(body, createPopupDetailsTemplate(card), `beforeend`);

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
  elements.forEach((item, i) => {
    item.addEventListener(`click`, () => {
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

const cards = generateCards(QUANTITY_MOVIES);
const navItems = fillMenuItems();

render(main, createStatisticTamplate(navItems), `beforeend`);
render(main, createSortTamplate(), `beforeend`);
render(main, createContentTamplate(), `beforeend`);

const movies = main.querySelector(`.films`);
const moveisList = movies.querySelector(`.films-list`);
const moveisContainer = moveisList.querySelector(`.films-list__container`);

cards.forEach((card) => {
  render(moveisContainer, createMovieTamplate(card), `beforeend`);
});

render(moveisList, createMoreMoviesButtonTamplate(), `beforeend`);
render(movies, createTopListTemplate(), `beforeend`);
render(movies, createMostCommentsListTemplate(), `beforeend`);

const listsExtra = movies.querySelectorAll(`.films-list--extra`);

listsExtra.forEach((elem) => {
  const elemContainer = elem.querySelector(`.films-list__container`);

  for (let i = 0; i < QUANTITY_MOVIES_EXTRA; i++) {
    render(elemContainer, createMovieTamplate(cards[i]), `beforeend`);
  }

  callClickOnNewElem(elemContainer, cards);

});


callClickOnNewElem(moveisContainer, cards);

