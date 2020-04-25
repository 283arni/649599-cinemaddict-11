import {remove, PositionElement, render} from '../utils/render';
import CardComponent from '../components/card';
import PopupComponent from '../components/popup';

const ESC_KEY = `Escape`;

const body = document.querySelector(`body`);

export default class MovieController {
  constructor(container, onDataChange) {

    this._container = container;
    this._onDataChange = onDataChange;

    this._card = null;
    this._cardComponent = null;
    this._popupComponent = null;
  }

  render(card) {
    this._cardComponent = new CardComponent(card);
    this._popupComponent = new PopupComponent(card);

    this._cardComponent.setClickElementCard(this._popupComponent);

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

    render(this._container, this._cardComponent, PositionElement.BEFOREEND);
  }

  openPopup(popup) {
    if (!body.querySelector(`.film-details`)) {
      render(body, popup, PositionElement.BEFOREEND);

      const closeBtn = popup.getElement().querySelector(`.film-details__close-btn`);

      const closePopup = () => {
        remove(popup);
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
  }

}
