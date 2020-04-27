import {comments} from '../mock/comment';
// import {remove, PositionElement, render} from '../utils/render';
import AbstractSmartComponent from "./abstract-smart-component.js";

const CAPITAL_LITTER = 0;
const FROM_SLICE_STRING = 1;


const createCommentTemplate = (comment) => {
  const {name, emoji, author, text, date} = comment;

  return (
    `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="${emoji}" width="55" height="55" alt="emoji-${name}">
    </span>
    <div>
      <p class="film-details__comment-text">${text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${date}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`
  );
};

const createItemInfo = (informations) => {
  const [first, second] = informations;
  const firstUpper = first[CAPITAL_LITTER].toUpperCase() + first.substring(FROM_SLICE_STRING);

  return (
    `${firstUpper !== `Genre` ?
      `<tr class="film-details__row">
        <td class="film-details__term">${firstUpper}</td>
        <td class="film-details__cell">${second}</td>
      </tr>`
      :
      `<tr class="film-details__row">
        <td class="film-details__term">${firstUpper}</td>
        <td class="film-details__cell">
          <span class="film-details__genre">${second}</span>
        </td>
      </tr>`}`
  );
};

const createPopupDetailsTemplate = (card, options = {}) => {

  const {title, poster, rating, description, countComments} = card;
  const discussion = comments.map((comment, i) => {
    return i < countComments ? createCommentTemplate(comment) : null;
  }).join(`\n`);

  const cloneCard = Object.assign({}, card);
  delete cloneCard.title;
  delete cloneCard.poster;
  delete cloneCard.rating;
  delete cloneCard.countComments;
  delete cloneCard.description;
  delete cloneCard.activedWatchlist;
  delete cloneCard.activedWatched;
  delete cloneCard.activedFavorite;
  delete cloneCard.emoji;

  const arrCard = Object.entries(cloneCard);
  const info = arrCard.map((item) => createItemInfo(item)).join(`\n`);

  const {activedWatchlist, activedWatched, activedFavorite, emoji} = options;

  const chooseEmoji = emoji ? `<img src="${emoji.src}" width="30" height="30" alt="emoji">` : ``;
  const choosedWatchlist = activedWatchlist ? `checked` : ``;
  const choosedWatched = activedWatched ? `checked` : ``;
  const choosedFavorite = activedFavorite ? `checked` : ``;

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="">

              <p class="film-details__age">18+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${title}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                ${info}
              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${choosedWatchlist}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist ">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${choosedWatched}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched ">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${choosedFavorite}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite ">Add to favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${countComments}</span></h3>

            <ul class="film-details__comments-list">
              ${discussion}
            </ul>

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label">${chooseEmoji}</div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class Popup extends AbstractSmartComponent {
  constructor(card) {
    super();

    this._card = card;
    this._closeHandler = null;
    this.watchedHandler = null;

  }

  getTemplate() {
    return createPopupDetailsTemplate(this._card, {
      activedWatchlist: this.activedWatchlist,
      activedWatched: this.activedWatched,
      activedFavorite: this.activedFavorite,
      emoji: this.emoji
    });
  }

  recoveryListeners() {
    this._subscribeOnEvents();
    this.closePopup(this._closeHandler);
  }

  rerender() {
    super.rerender();
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, () => {

        this.activedWatchlist = !this.activedWatchlist;
        this.rerender();
      });

    element.querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, () => {
        this.activedWatched = !this.activedWatched;

        this.rerender();
      });

    element.querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, () => {
        this.activedFavorite = !this.activedFavorite;

        this.rerender();
      });

    const emojies = element.querySelectorAll(`.film-details__emoji-label`);
    const emojiDiv = element.querySelector(`.film-details__add-emoji-label`);

    emojies.forEach((emoji) => {
      emoji.addEventListener(`click`, () => {
        this.emoji = emoji.firstElementChild;

        if (emojiDiv.firstElementChild) {
          emojiDiv.firstElementChild.remove();
        }

        emojiDiv.append(this.emoji.cloneNode());

        this.rerender();
      });
    });
  }

  closePopup(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);

    this._closeHandler = handler;
  }
}
