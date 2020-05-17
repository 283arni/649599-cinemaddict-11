import API from './api/index';
import RankComponent from './components/rank';
import FilterController from './controllers/filter-controller';
import SortComponent from './components/sort';
import PageController from './controllers/page-controller';
import MoviesModel from './models/movies';
import ContentComponent from './components/content';
import StatisticsComponent from './components/statistic';
import AmountMoviesComponent from './components/amount-all-movies';
import Provider from './api/provider';
import Store from "./api/store";

import {PositionElement, render} from './utils/render';

const AUTHORIZATION = `Basic dXNlckBwYXssdd29yZAo=`;
const URL = `https://11.ecmascript.pages.academy/cinemaddict`;
const STORE_PREFIX = `cinemaddict-localstorage`;
const STORE_VER = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footerStatistics = document.querySelector(`.footer__statistics`);
const api = new API(URL, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);


const moviesModel = new MoviesModel();
const contentComponent = new ContentComponent();
const sortComponent = new SortComponent();
const statisticsComponent = new StatisticsComponent({movies: moviesModel});
const filterController = new FilterController(main, moviesModel, sortComponent, statisticsComponent, contentComponent);
const contentController = new PageController(contentComponent, sortComponent, moviesModel, apiWithProvider);

apiWithProvider.getMovies()
  .then((cards) => {
    render(footerStatistics, new AmountMoviesComponent(cards), PositionElement.BEFOREEND);
    moviesModel.setMovies(cards);
    contentController.render();
  });

render(header, new RankComponent({movies: moviesModel}), PositionElement.BEFOREEND);
filterController.render();
render(main, statisticsComponent, PositionElement.BEFOREEND);
statisticsComponent.hide();

