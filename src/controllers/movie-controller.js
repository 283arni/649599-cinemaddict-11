import {remove, replace, PositionElement, render} from '../utils/render';
import CardComponent from '../components/card';
import PopupComponent from '../components/popup';

const body = document.querySelector(`body`);

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {

    this._container = container;
    this._onDataChange = onDataChange;

    this._card = null;
    this._cardComponent = null;
    this._popupComponent = null;
    this._onViewChange = onViewChange;
  }

  render(card) {
    const oldCardComponent = this._cardComponent;

    this._cardComponent = new CardComponent(card);
    this._popupComponent = new PopupComponent(card);

    this._cardComponent.setClickElementCard(this._popupComponent, this._onViewChange);

    this._cardComponent.setWatchlistClickHandler((e) => {
      e.preventDefault();
      this._onDataChange(this, card, Object.assign({}, card, {
        activedWatchlist: !card.activedWatchlist
      }));
    });

    this._cardComponent.setWatchedClickHandler((e) => {
      e.preventDefault();
      this._onDataChange(this, card, Object.assign({}, card, {
        activedWatched: !card.activedWatched
      }));


    });

    this._cardComponent.setFavoriteClickHandler((e) => {
      e.preventDefault();

      this._onDataChange(this, card, Object.assign({}, card, {
        activedFavorite: !card.activedFavorite
      }));
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


    this._popupComponent._subscribeOnEvents();
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
