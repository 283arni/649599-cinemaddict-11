import {remove, replace, PositionElement, render} from '../utils/render';
import CardComponent from '../components/card';
import PopupComponent from '../components/popup';
import MovieModel from '../models/movie';

const body = document.querySelector(`body`);


export default class MovieController {
  constructor(container, onDataChange, onViewChange, api) {

    this._container = container;

    this._card = null;
    this._api = api;
    this._cardComponent = null;
    this._popupComponent = null;
    this._onViewChange = onViewChange;
    this._onDataChange = onDataChange;
  }

  render(card) {
    const oldCardComponent = this._cardComponent;

    this._cardComponent = new CardComponent(card);
    this._popupComponent = new PopupComponent(card, this._api, this._onViewChange, this);

    this._cardComponent.setClickElementCard(this._popupComponent, this._onViewChange);

    this._cardComponent.setWatchlistClickHandler((e) => {
      e.preventDefault();
      const newMovie = MovieModel.clone(card);

      newMovie.activedWatchlist = !newMovie.activedWatchlist;

      this._onDataChange(this, card, newMovie);
    });

    this._cardComponent.setWatchedClickHandler((e) => {
      e.preventDefault();

      const newMovie = MovieModel.clone(card);

      newMovie.activedWatched = !newMovie.activedWatched;

      this._onDataChange(this, card, newMovie);
    });

    this._cardComponent.setFavoriteClickHandler((e) => {
      e.preventDefault();
      const newMovie = MovieModel.clone(card);

      newMovie.activedFavorite = !newMovie.activedFavorite;

      this._onDataChange(this, card, newMovie);
    });

    if (oldCardComponent) {
      replace(this._cardComponent, oldCardComponent);
    } else {
      render(this._container, this._cardComponent, PositionElement.BEFOREEND);
    }

  }

  openPopup(popup, onViewChange) {
    onViewChange();

    this._popupComponent = popup;

    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        remove(this._popupComponent);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    render(body, this._popupComponent, PositionElement.BEFOREEND);

    document.addEventListener(`keydown`, onEscKeyDown);

    this._popupComponent.closePopup(() => {
      remove(this._popupComponent);
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    this._popupComponent.subscribeOnEvents();
  }

  setDefaultView() {
    if (this._popupComponent) {
      remove(this._popupComponent);
    }
  }

  destroy() {
    remove(this._popupComponent);
    remove(this._cardComponent);
    document.removeEventListener(`keydown`, this._popupComponent.onEscKeyDown);
  }
}
