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
    this._popupComponent = new PopupComponent(card, this._api);

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

    this._cardComponent.setClickPoster(this.openPopup(this._popupComponent, card));
    this._cardComponent.setClickTitle(this.openPopup(this._popupComponent, card));
    this._cardComponent.setClickComments(this.openPopup(this._popupComponent, card));
  }


  openPopup(popup, card) {
    let newMovie = MovieModel.clone(card);

    const changeMovieClickButtonDetails = (film) => {
      this._api.getComments(film)
        .then((movie) => this._onDataChange(this, card, movie));
    };

    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === Key.ESCAPE || evt.key === Key.ESC;

      if (isEscKey) {
        changeMovieClickButtonDetails(newMovie);
        remove(popup);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    return () => {
      this._onViewChange();
      const opnedDetailsMove = document.querySelector(`.film-details`);

      if (opnedDetailsMove) {
        return;
      }

      render(body, popup, PositionElement.BEFOREEND);

      document.addEventListener(`keydown`, onEscKeyDown);

      this._popupComponent.deleteCommentFromDetails(card);
      this._popupComponent.sendFormComment();
      this._popupComponent.closeDetails(() => {
        changeMovieClickButtonDetails(newMovie);
      }, onEscKeyDown);


      this._popupComponent.setClickButtonWatchlist(() => {
        newMovie.activedWatchlist = !newMovie.activedWatchlist;
        changeMovieClickButtonDetails(newMovie);
      });

      this._popupComponent.setClickButtonWatched(() => {
        newMovie.activedWatched = !newMovie.activedWatched;
        changeMovieClickButtonDetails(newMovie);
      });

      this._popupComponent.setClickButtonFavorite(() => {
        newMovie.activedFavorite = !newMovie.activedFavorite;
        changeMovieClickButtonDetails(newMovie);
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
