
import AbstractSmartComponent from "./abstract-smart-component.js";
import {encode} from "he";
import moment from 'moment';

const CAPITAL_LITTER = 0;
const FROM_SLICE_STRING = 1;
const KEY_ENTER = `Enter`;
const KEY_CONTROL = `Control`;

const newComment = {
  emotion: `sleeping`,
  author: `Tim Macoveev`,
  text: `Booooooooooring`,
  date: moment(`20100214`).format(`YYYY/MM/DD hh:mm`)
};

const createCommentTemplate = (review) => {
  const {emotion, author, comment, date} = review;
  const filtredText = encode(comment);
  return (
    `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
    </span>
    <div>
      <p class="film-details__comment-text">${filtredText}</p>
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

const createPopupDetailsTemplate = (card, reviews, options = {}) => {

console.log(reviews)
  const {title, poster, rating, description, countComments, comments} = card;

  const discussion = comments.map((comment) => {
    return createCommentTemplate(comment);
  }).join(`\n`);

  const cloneCard = Object.assign({}, card);
  delete cloneCard.id;
  delete cloneCard.title;
  delete cloneCard.poster;
  delete cloneCard.rating;
  delete cloneCard.rating;
  delete cloneCard.comments;
  delete cloneCard.description;
  delete cloneCard.activedWatchlist;
  delete cloneCard.activedWatched;
  delete cloneCard.activedFavorite;
  delete cloneCard.emoji;

  const arrCard = Object.entries(cloneCard);
  const info = arrCard.map((item) => createItemInfo(item)).join(`\n`);

  const {activedWatchlist, activedWatched, activedFavorite, emotion} = options;

  const chooseEmoji = emotion ? `<img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">` : ``;
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
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

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

    this._newComment = null;
    this._card = card;
    this._comments = card.comments;
    this._closeHandler = null;
    this.watchedHandler = null;

    this._copyComments = this._comments.map((comment) => ({...comment}));
  }

  getTemplate() {
    return createPopupDetailsTemplate(this._card, this._copyComments, {
      activedWatchlist: this.activedWatchlist,
      activedWatched: this.activedWatched,
      activedFavorite: this.activedFavorite,
      emotion: this.emotion
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

        emojiDiv.append(emoji.firstElementChild.cloneNode());

        newComment.emotion = emoji.previousElementSibling.value;
      });
    });
    // добавление нового коммента при нажатии Ctrl + Enter
    this.runOnKeys(element.querySelector(`textarea`), () => {
      this.emoji = null;

      this._copyComments.push(Object.assign({}, newComment));

      this.rerender();
    }, KEY_CONTROL, KEY_ENTER);

    element.querySelector(`textarea`).addEventListener(`input`, (evt) => {
      newComment.text = evt.target.value;
    });

    const deleteBtns = element.querySelectorAll(`.film-details__comment-delete`);

    deleteBtns.forEach((button, i) => {
      button.addEventListener(`click`, (e) => {
        e.preventDefault();
        this._copyComments = this._copyComments.filter((review, j) => i !== j);

        this.rerender();
      });
    });
  }

  closePopup(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);

    this._closeHandler = handler;
  }

  runOnKeys(elem, func, ...codes) {
    let pressed = new Set();

    elem.addEventListener(`keydown`, (event) => {
      pressed.add(event.key);

      for (let code of codes) {
        if (!pressed.has(code)) {
          return;
        }
      }

      pressed.clear();

      func();
    });

    elem.addEventListener(`keyup`, (event) => {
      pressed.delete(event.key);
    });
  }
}
