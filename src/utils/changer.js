import {Rank} from '../consts';

export const getTimeFromMins = (mins) => {
  return `${Math.trunc(mins / 60)}h ${mins % 60}m`;
};

export const getRankUser = (count) => {
  let rank = ``;

  if (count >= 1 && count <= 10) {
    rank = Rank.NOVICE;
  } else if (count >= 11 && count <= 20) {
    rank = Rank.FAN;
  } else if (count >= 21) {
    rank = Rank.MOVIE_BUFF;
  }

  return rank;
};

export const watchedMovies = (cards) => {
  return cards.filter((card) => card.activedWatched);
};
