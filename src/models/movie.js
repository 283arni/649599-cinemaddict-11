export default class Movie {
  constructor(data) {
    this.id = data.id;
    this.title = data.film_info.alternative_title;
    this.poster = data.film_info.poster;
    this.director = [data.film_info.director];
    this.writers = [...data.film_info.writers];
    this.actors = [...data.film_info.actors];
    this.rating = data.film_info.total_rating;
    this.releaseDate = data.film_info.release.date;
    this.year = `${1950 + (Math.floor(Math.random() * 10))}`;
    this.time = data.film_info.runtime;
    this.country = data.film_info.release.release_country;
    this.description = data.film_info.description;
    this.genre = [...data.film_info.genre];
    this.activedWatchlist = data.user_details.watchlist;
    this.activedWatched = data.user_details.already_watched;
    this.activedFavorite = data.user_details.favorite;
    this.comments = [];
  }

  static parseMovie(data) {
    return new Movie(data);
  }

  static parseMovies(data) {
    return data.map(Movie.parseMovie);

  }
}
