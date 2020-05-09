export default class Movie {
  constructor(data) {
    this.id = data.id;
    this.title = data.film_info.alternative_title;
    this.poster = data.film_info.poster;
    this.director = data.film_info.director;
    this.writers = data.film_info.writers.slice(`,`).join(`, `);
    this.actors = data.film_info.actors.slice(`,`).join(`, `);
    this.rating = data.film_info.total_rating;
    this.releaseDate = data.film_info.release.date;
    this.time = data.film_info.runtime;
    this.country = data.film_info.release.release_country;
    this.description = data.film_info.description;
    this.genre = data.film_info.genre.slice(`,`).join(`, `);
    this.activedWatchlist = data.user_details.watchlist;
    this.activedWatched = data.user_details.already_watched;
    this.activedFavorite = data.user_details.favorite;
    this.comments = data.comments;
  }

  toRAW() {
    return {
      "id": this.id,
      "comments": this.comments.slice().map((comment) => `${comment.id}`),
      "film_info": {
        "title": this.title,
        "alternative_title": this.title,
        "total_rating": this.rating,
        "poster": this.poster,
        "age_rating": 0,
        "director": this.director,
        "writers": [...this.writers],
        "actors": [...this.actors],
        "release": {
          "date": this.releaseDate,
          "release_country": this.country
        },
        "runtime": this.time,
        "genre": [...this.genre],
        "description": this.description
      },
      "user_details": {
        "watchlist": this.activedWatchlist,
        "already_watched": this.activedWatched,
        "watching_date": `2019-04-12T16:12:32.554Z`,
        "favorite": this.activedFavorite,
      }
    };
  }

  static parseMovie(data) {
    return new Movie(data);
  }

  static parseMovies(data) {
    return data.map(Movie.parseMovie);
  }

  static clone(data) {
    return new Movie(data.toRAW());
  }
}
