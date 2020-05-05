import AbstractComponent from './abstract-component';
import MovieController from '../controllers/movie-controller';


const createMovieTamplate = (card) => {

  const {title, poster, genre, rating, time, description, countComments, year, activedWatchlist, activedWatched, activedFavorite} = card;

  const choosedWatchlist = activedWatchlist ? `film-card__controls-item--active` : ``;
  const choosedWatched = activedWatched ? `film-card__controls-item--active` : ``;
  const choosedFavorite = activedFavorite ? `film-card__controls-item--active` : ``;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${time}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${countComments} comments</a>
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
    this._movieController = new MovieController();
    this._submitHandler = null;
  }

  getTemplate() {
    return createMovieTamplate(this._card);
  }

  setClickElementCard(popup, onViewChange) {
    this.getElement().addEventListener(`click`, (e) => {
      const titleMovies = this.getElement().querySelector(`.film-card__title`);
      const posterMovies = this.getElement().querySelector(`.film-card__poster`);
      const commentMovies = this.getElement().querySelector(`.film-card__comments`);

      if (e.target === titleMovies || e.target === posterMovies || e.target === commentMovies) {
        this._movieController.openPopup(popup, onViewChange);
      }
    });
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
