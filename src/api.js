import Movie from './models/movie';

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const API = class {
  constructor(url, authorization) {
    this._authorization = authorization;
    this._url = url;
  }

  getMovies() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return this._load({tag: `movies`})
      .then((response) => response.json())
      .then(Movie.parseMovies);
  }

  getComments(movie) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return this._load({tag: `comments/${movie.id}`})
      .then((response) => response.json())
      .then((response) => {
        movie.comments = response;

        return movie;
      });
  }

  updateMovie(id, data) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);
    headers.append(`Content-Type`, `application/json`);

    return this._load({
      tag: `movies/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data.toRAW()),
      headers: new Headers({"Content-Type": `application/json`}),
    })
      .then((response) => response.json())
      .then(Movie.parseMovie)
      .then((movie) => this.getComments(movie));
  }

  _load({tag, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._url}/${tag}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
};

export default API;
