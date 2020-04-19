import AbstractComponent from './abstract-component';
import PopupComponent from './popup';

const createMovieTamplate = (card) => {
  const {title, poster, genre, rating, time, description, countComments, year} = card;

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
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class Card extends AbstractComponent {
  constructor(card) {
    super();

    this._card = card;
    this._popupComponent = new PopupComponent();
  }

  getTemplate() {
    return createMovieTamplate(this._card);
  }

  setClickElementCard(element, cards, comments) {
    const titleMovies = element.getElement().querySelectorAll(`.film-card__title`);
    const posterMovies = element.getElement().querySelectorAll(`.film-card__poster`);
    const commentMovies = element.getElement().querySelectorAll(`.film-card__comments`);

    this.getOpenPopup(titleMovies, cards, comments);
    this.getOpenPopup(posterMovies, cards, comments);
    this.getOpenPopup(commentMovies, cards, comments);
  }

  getOpenPopup(list, info, comments) {
    list.forEach((elem, i) => {
      elem.addEventListener(`click`, () => {
        this._popupComponent.openPopup(info[i], comments);
      });
    });
  }
}
