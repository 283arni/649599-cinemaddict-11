import Movie from './models/movie';

const API = class {

  constructor(authorization) {
    this._authorization = authorization;
  }

  getMovies() {
    const headers = new Headers();
    const newHeaders = new Headers();
    headers.append(`Authorization`, this._authorization);

    newHeaders.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/movies`, {headers})
      .then((response) => response.json())
      .then(Movie.parseMovies)
      .then((movies) => {
        return movies.map((movie) => {
          fetch(`https://11.ecmascript.pages.academy/cinemaddict/comments/${movie.id}`, {headers})
            .then((response) => response.json())
            .then((response) => {
              movie.comments = response;
            });
          return movie;
        });
      });
  }
};

export default API;
