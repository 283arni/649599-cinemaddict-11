import {NavItem} from '../mock/nav';

const getWatchlistMovies = (movies) => {
  return movies.filter((movie) => movie.activedWatchlist);
};

const getWatchedMovies = (movies) => {
  return movies.filter((movie) => movie.activedWatched);
};

const getFavoriteMovies = (movies) => {
  return movies.filter((movie) => movie.activedFavorite);
};

export const getMoviesByFilter = (movies, filterType) => {

  switch (filterType) {
    case NavItem.ALL:
      return movies;
    case NavItem.WATCHLIST:
      return getWatchlistMovies(movies);
    case NavItem.HISTORY:
      return getWatchedMovies(movies);
    case NavItem.FAVORITES:
      return getFavoriteMovies(movies);
  }

  return movies;
};
