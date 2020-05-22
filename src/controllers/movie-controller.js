import {remove, replace, PositionElement, render} from '../utils/render';
import CardComponent from '../components/card';
import PopupComponent from '../components/popup';
import MovieModel from '../models/movie';
import {Key} from '../consts';

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

    this._cardComponent.setClickPoster(this.openPopup(card));
    this._cardComponent.setClickTitle(this.openPopup(card));
    this._cardComponent.setClickComments(this.openPopup(card));
  }


  openPopup(card) {
    this._popupComponent = new PopupComponent(card, this._api);

    const newMovie = MovieModel.clone(card);

    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === Key.ESCAPE || evt.key === Key.ESC;

      if (isEscKey) {
        this._onDataChange(this, card, newMovie);
        remove(this._popupComponent);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    return () => {
      document.addEventListener(`keydown`, onEscKeyDown);

      this._onViewChange();

      render(body, this._popupComponent, PositionElement.BEFOREEND);

      this._popupComponent.deleteCommentFromDetails(newMovie);
      this._popupComponent.sendFormComment();
      this._popupComponent.closeDetails(() => {
        this._onDataChange(this, card, newMovie);
        remove(this._popupComponent);
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

      this._popupComponent.setClickButtonWatchlist(() => {
        newMovie.activedWatchlist = !newMovie.activedWatchlist;
      });

      this._popupComponent.setClickButtonWatched(() => {
        newMovie.activedWatched = !newMovie.activedWatched;
      });

      this._popupComponent.setClickButtonFavorite(() => {
        newMovie.activedFavorite = !newMovie.activedFavorite;
      });
    };
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
