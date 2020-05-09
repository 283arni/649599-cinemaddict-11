import API from './api';
import RankComponent from './components/rank';
import FilterController from './controllers/filter-controller';
import PageController from './controllers/page-controller';
import MoviesModel from './models/movies';
import ContentComponent from './components/content';
import AmountMoviesComponent from './components/amount-all-movies';

import {PositionElement, render} from './utils/render';

const AUTHORIZATION = `Basic dXNlckBwYXssdd29yZAo=`;
const URL = `https://11.ecmascript.pages.academy/cinemaddict`;

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footerStatistics = document.querySelector(`.footer__statistics`);
const api = new API(URL, AUTHORIZATION);


const moviesModel = new MoviesModel();
const filterController = new FilterController(main, moviesModel);
const contentComponent = new ContentComponent();
const contentController = new PageController(contentComponent, moviesModel, api);


render(header, new RankComponent(), PositionElement.BEFOREEND);
render(footerStatistics, new AmountMoviesComponent(), PositionElement.BEFOREEND);

filterController.render();

api.getMovies()
  .then((cards) => {
    cards.map((card) => api.getComments(card));
    moviesModel.setMovies(cards);
    contentController.render();
  });
