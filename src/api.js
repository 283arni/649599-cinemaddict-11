import Movie from './models/movie';

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

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
      .then(checkStatus)
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

  updateMovie(id, data) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);
    headers.append(`Content-Type`, `application/json`);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/movies/${id}`, {
      method: `PUT`,
      body: JSON.stringify(data.toRAW()),
      headers,
    })
      .then(checkStatus)
      .then((response) => response.json())
      .then(Movie.parseMovie)
      .then((movie) => fetch(`https://11.ecmascript.pages.academy/cinemaddict/comments/${movie.id}`, {headers})
      .then((response) => response.json())
      .then((response) => {
        movie.comments = response;

        return movie;
      }));
  }
};

export default API;
