import AbstractComponent from './abstract-component';
import {getTimeFromMins} from '../utils/changer';
import moment from 'moment';

const MAX_SIMBOLS = 140;

const createMovieTamplate = (card) => {
  const {title, poster, genre, rating, time, description, comments, releaseDate, activedWatchlist, activedWatched, activedFavorite, altTitle} = card;

  const choosedWatchlist = activedWatchlist ? `film-card__controls-item--active` : ``;
  const choosedWatched = activedWatched ? `film-card__controls-item--active` : ``;
  const choosedFavorite = activedFavorite ? `film-card__controls-item--active` : ``;
  const slicedDescription = description.length >= MAX_SIMBOLS ? `${description.substring(0, MAX_SIMBOLS)}...` : description;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${moment(releaseDate).format(`YYYY`)}</span>
        <span class="film-card__duration">${getTimeFromMins(time)}</span>
        <span class="film-card__genre">${genre.join(`, `)}</span>
      </p>
      <img src="${poster}" alt="${altTitle}" class="film-card__poster">
      <p class="film-card__description">${slicedDescription}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${choosedWatchlist}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${choosedWatched}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${choosedFavorite}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class Card extends AbstractComponent {
  constructor(card) {
    super();

    this._card = card;
  }

  getTemplate() {
    return createMovieTamplate(this._card);
  }

  setClickPoster(handler) {
    this.getElement().querySelector(`.film-card__poster`)
    .addEventListener(`click`, handler);
  }

  setClickTitle(handler) {
    this.getElement().querySelector(`.film-card__title`)
    .addEventListener(`click`, handler);
  }

  setClickComments(handler) {
    this.getElement().querySelector(`.film-card__comments`)
    .addEventListener(`click`, handler);
  }

  setWatchlistClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
  }

  setWatchedClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
    .addEventListener(`click`, handler);
  }

  setFavoriteClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
    .addEventListener(`click`, handler);
  }
}
