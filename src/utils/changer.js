import {Rank, RankNumber} from '../consts';

const TIME_FOR_CALCULATE = 60;

export const getTimeFromMins = (mins) => {
  return `${Math.trunc(mins / TIME_FOR_CALCULATE)}h ${mins % TIME_FOR_CALCULATE}m`;
};

export const getRankUser = (count) => {
  if (count >= RankNumber.NOVICE_MIN && count <= RankNumber.NOVICE_MAX) {
    return Rank.NOVICE;
  }

  if (count >= RankNumber.FAN_MIN && count <= RankNumber.FAN_MAX) {
    return Rank.FAN;
  }

  if (count >= RankNumber.BUFF) {
    return Rank.MOVIE_BUFF;
  }

  return Rank.NON;
};

export const watchedMovies = (cards) => {
  return cards.filter((card) => card.activedWatched);
};
