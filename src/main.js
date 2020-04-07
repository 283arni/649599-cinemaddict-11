import {createRankTemplate} from './commponents/rank';
import {createStatisticTamplate} from './commponents/statistic';
import {createSortTamplate} from './commponents/sort';
import {createContentTamplate} from './commponents/content';
import {createMovieTamplate} from './commponents/card';
import {createMoreMoviesButtonTamplate} from './commponents/button-more';
import {createTopListTemplate} from './commponents/list-top';
import {createMostCommentsListTemplate} from './commponents/list-most';
import {createPopupDetailsTemplate} from './commponents/popup';
import './mock/card';


const QUANTITY_MOVIES = 5;
const QUANTITY_MOVIES_EXTRA = 2;
const ESC_KEY = `Escape`;


const body = document.querySelector(`body`);
const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(header, createRankTemplate(), `beforeend`);

render(main, createStatisticTamplate(), `beforeend`);
render(main, createSortTamplate(), `beforeend`);
render(main, createContentTamplate(), `beforeend`);

const movies = main.querySelector(`.films`);
const moveisList = movies.querySelector(`.films-list`);
const moveisContainer = moveisList.querySelector(`.films-list__container`);

for (let i = 0; i < QUANTITY_MOVIES; i++) {
  render(moveisContainer, createMovieTamplate(), `beforeend`);
}

render(moveisList, createMoreMoviesButtonTamplate(), `beforeend`);
render(movies, createTopListTemplate(), `beforeend`);
render(movies, createMostCommentsListTemplate(), `beforeend`);

const listsExtra = movies.querySelectorAll(`.films-list--extra`);

listsExtra.forEach((elem) => {
  const elemContainer = elem.querySelector(`.films-list__container`);
  for (let i = 0; i < QUANTITY_MOVIES_EXTRA; i++) {
    render(elemContainer, createMovieTamplate(), `beforeend`);
  }
});


const titleMovie = movies.querySelectorAll(`.film-card__title`);
const posterMovie = movies.querySelectorAll(`.film-card__poster`);
const commentsMovie = movies.querySelectorAll(`.film-card__comments`);


const openPopup = () => {

  if (!body.querySelector(`.film-details`)) {

    render(body, createPopupDetailsTemplate(), `beforeend`);

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


const watchClickElementsCard = (elements) => {
  elements.forEach((item) => {
    item.addEventListener(`click`, () => {
      openPopup();
    });
  });
};

watchClickElementsCard(titleMovie);
watchClickElementsCard(posterMovie);
watchClickElementsCard(commentsMovie);
