const Ranks = {
  NON: ``,
  NOVICE: `novice`,
  FAN: `fan`,
  MOVIE_BUFF: `movie buff`

};

export const getTimeFromMins = (mins) => {
  return `${Math.trunc(mins / 60)}h ${mins % 60}m`;
};

export const getRankUser = (count) => {
  let rank = ``;

  if (count >= 1 && count <= 10) {
    rank = Ranks.NOVICE;
  } else if (count >= 11 && count <= 20) {
    rank = Ranks.FAN;
  } else if (count >= 21) {
    rank = Ranks.MOVIE_BUFF;
  }

  return rank;
};

export const watchedMovies = (cards) => {
  return cards.filter((card) => card.activedWatched);
};
