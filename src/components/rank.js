import AbstractSmartComponent from './abstract-smart-component';
import {getRankUser, watchedMovies} from '../utils/changer';

const createRankTemplate = (cards) => {

  const watched = watchedMovies(cards);
  const userRank = getRankUser(watched.length);

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${userRank}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class Rank extends AbstractSmartComponent {
  constructor({movies}) {
    super();

    this._cards = movies;
  }

  recoveryListeners() {}

  getTemplate() {
    return createRankTemplate(this._cards.getMoviesAll());
  }

  rerender() {
    super.rerender();
  }
}
