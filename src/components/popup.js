import AbstractSmartComponent from "./abstract-smart-component.js";
import {encode} from "he";
import {getTimeFromMins} from '../utils/changer';
import {Key, StyleBorder} from '../consts';
import moment from 'moment';

const CAPITAL_LITTER = 0;
const FROM_SLICE_STRING = 1;
const PRESS_KEYS = 2;
const TIME_ANIMATION = 600;
const MILLISECONDS = 1000;

const newComment = {
  emotion: ``,
  comment: ``,
  date: `${new Date()}`
};

const filterComments = (comments, id) => {
  return comments.filter((comment) => comment.id !== id);
};

const createCommentTemplate = (review) => {
  const {id, emotion, author, comment, date} = review;

  const filtredText = encode(comment);

  return (
    `<li class="film-details__comment" id="${id}">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${filtredText}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${moment(new Date(date)).format(`YYYY/MM/DD HH:MM`)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

const createItemInfo = (informations) => {
  let [first, second] = informations;

  if (first === `releaseDate`) {
    first = `release date`;
    second = moment(second).format(`DD MMMM YYYY`);
  }

  const firstUpper = first[CAPITAL_LITTER].toUpperCase() + first.substring(FROM_SLICE_STRING);

  return (
    `${firstUpper !== `Genre` ?
      `<tr class="film-details__row">
        <td class="film-details__term">${firstUpper}</td>
        <td class="film-details__cell">${typeof second === `number` ? getTimeFromMins(second) : second}</td>
      </tr>`
      :
      `<tr class="film-details__row">
        <td class="film-details__term">${second.length > 1 ? `Genres` : `Genre`}</td>
        <td class="film-details__cell">
          <span class="film-details__genre">${second}</span>
        </td>
      </tr>`}`
  );
};

const createPopupDetailsTemplate = (card, options = {}) => {
  const {title, poster, rating, description, comments, age, altTitle} = card;

  const discussion = comments.map((comment) => {
    return createCommentTemplate(comment);
  }).join(`\n`);

  const cloneCard = Object.assign({}, card);
  delete cloneCard.id;
  delete cloneCard.title;
  delete cloneCard.poster;
  delete cloneCard.rating;
  delete cloneCard.comments;
  delete cloneCard.description;
  delete cloneCard.activedWatchlist;
  delete cloneCard.activedWatched;
  delete cloneCard.activedFavorite;
  delete cloneCard.emoji;
  delete cloneCard.age;
  delete cloneCard.watching;
  delete cloneCard.altTitle;

  const arrCard = Object.entries(cloneCard);
  const info = arrCard.map((item) => createItemInfo(item)).join(`\n`);

  const {activedWatchlist, activedWatched, activedFavorite, emotion} = options;

  const chooseEmoji = emotion ? `<img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">` : ``;
  const choosedWatchlist = activedWatchlist ? `checked` : ``;
  const choosedWatched = activedWatched ? `checked` : ``;
  const choosedFavorite = activedFavorite ? `checked` : ``;
  const setAge = age ? `${age}+` : age;

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="${altTitle}">

              <p class="film-details__age">${setAge}</p>
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
  constructor(card, api) {
    super();

    this._card = card;
    this._api = api;

    this._closeHandler = null;
    this._watchlistHandler = null;
    this._watchedHandler = null;
    this._favoriteHandler = null;
  }

  getTemplate() {
    return createPopupDetailsTemplate(this._card, {
      activedWatchlist: this._card.activedWatchlist,
      activedWatched: this._card.activedWatched,
      activedFavorite: this._card.activedFavorite,
      emotion: this.emotion
    });
  }

  recoveryListeners() {}

  rerender() {
    super.rerender();
    this.sendFormComment();
    this.closeDetails(this._closeHandler);
    this.deleteCommentFromDetails(this._card);
    this.setClickButtonWatchlist(this._watchlistHandler);
    this.setClickButtonWatched(this._watchedHandler);
    this.setClickButtonFavorite(this._favoriteHandler);
  }

  setClickButtonWatchlist(handler) {
    this.getElement().querySelector(`.film-details__control-label--watchlist`)
    .addEventListener(`click`, handler);

    this._watchlistHandler = handler;
  }

  setClickButtonWatched(handler) {
    this.getElement().querySelector(`.film-details__control-label--watched`)
    .addEventListener(`click`, handler);

    this._watchedHandler = handler;
  }

  setClickButtonFavorite(handler) {
    this.getElement().querySelector(`.film-details__control-label--favorite`)
    .addEventListener(`click`, handler);

    this._favoriteHandler = handler;
  }

  closeDetails(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);

    this._closeHandler = handler;
  }

  shake(container, area) {
    if (area) {
      area.style.border = StyleBorder.ERROR;
    }

    container.style.animation = `shake ${TIME_ANIMATION / MILLISECONDS}s`;

    setTimeout(() => {
      container.style.animation = ``;
    }, TIME_ANIMATION);
  }

  deleteCommentFromDetails(newMovie) {
    const reviews = this.getElement().querySelectorAll(`.film-details__comment`);
    const countComments = this.getElement().querySelector(`.film-details__comments-count`);

    reviews.forEach((review) => {
      const btnDelete = review.querySelector(`.film-details__comment-delete`);
      btnDelete.addEventListener(`click`, (e) => {
        e.preventDefault();

        btnDelete.setAttribute(`disabled`, true);
        btnDelete.textContent = `Deleting...`;

        this._api.deleteComment(review.id)
          .then(() => {
            newMovie.comments = filterComments(newMovie.comments, review.id);
            review.remove();
            countComments.textContent = newMovie.comments.length;
          })
          .catch(() => {
            btnDelete.disabled = false;
            btnDelete.textContent = `Delete`;

            this.shake(review);
          });
      });
    });
  }

  sendFormComment() {
    const element = this.getElement();
    const emojies = element.querySelectorAll(`.film-details__emoji-label`);
    const emojiDiv = element.querySelector(`.film-details__add-emoji-label`);
    const elemNewComment = element.querySelector(`.film-details__new-comment`);
    const textarea = element.querySelector(`textarea`);


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
    this.runOnKeys(textarea, () => {
      this.emoji = null;

      textarea.style.border = StyleBorder.DEFAULT;
      textarea.setAttribute(`disabled`, true);

      this._api.createComment(this._card.id, newComment)
        .then((movie) => {
          this._card = movie;

          this.rerender();
        })
        .catch(() => {
          textarea.disabled = false;
          this.shake(elemNewComment, textarea);
        });
    });


    textarea.addEventListener(`input`, (evt) => {
      newComment.comment = evt.target.value;
    });
  }

  runOnKeys(elem, addComment) {
    const keysPressed = new Set();

    elem.addEventListener(`keydown`, (event) => {
      keysPressed.delete(event.key);
      if (event.key === Key.CONTROL || event.key === Key.CMD) {
        keysPressed.add(event.key);
      }
    });

    elem.addEventListener(`keyup`, (event) => {
      keysPressed.delete(event.key);
      if (event.key === Key.ENTER) {
        keysPressed.add(event.key);

        if (keysPressed.size < PRESS_KEYS) {
          return;
        }

        addComment();
      }
    });
  }
}
