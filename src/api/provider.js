import Movie from '../models/movie';

const isOnline = () => {
  return window.navigator.onLine;
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getMovies() {
    if (isOnline()) {
      return this._api.getMovies()
      .then((movies) => {
        movies.forEach((movie) => {
          this._store.setItem(movie.id, movie.toRAW());
        });

        return movies;
      });
    }

    const storeMovies = Object.values(this._store.getItems());

    return Promise.resolve(Movie.parseMovies(storeMovies));
  }

  createComment(id, comment) {
    if (isOnline()) {
      return this._api.createComment(id, comment);
    }

    return Promise.reject(`offline logic is not implemented`);
  }

  updateMovie(id, data) {
    if (isOnline()) {
      data.comments = data.comments.map((comm) => comm.id);

      return this._api.updateMovie(id, data)
        .then((movie) => {
          this._store.setItem(movie.id, movie.toRAW());


          return movie;
        });
    }

    const localMovie = Movie.clone(Object.assign(data, {id}));

    this._store.setItem(id, localMovie.toRAW());

    return Promise.resolve(localMovie);
  }

  deleteComment(id) {
    if (isOnline()) {
      return this._api.deleteComment(id);
    }

    return Promise.reject(`offline logic is not implemented`);
  }
}
