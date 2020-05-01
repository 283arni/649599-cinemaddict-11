import RankComponent from './components/rank';
import FilterController from './controllers/filter-controller';
import PageController from './controllers/page-controller';
import MoviesModel from './models/movies';
import ContentComponent from './components/content';
import AmountMoviesComponent from './components/amount-all-movies';
import {generateCards} from './mock/card';
import {PositionElement, render} from './utils/render';


const QUANTITY_MOVIES = 22;

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footerStatistics = document.querySelector(`.footer__statistics`);
const cards = generateCards(QUANTITY_MOVIES);
const moviesModel = new MoviesModel();
moviesModel.setMovies(cards);

render(header, new RankComponent(), PositionElement.BEFOREEND);
render(footerStatistics, new AmountMoviesComponent(), PositionElement.BEFOREEND);

const filterController = new FilterController(main, moviesModel);
filterController.render();

const contentComponent = new ContentComponent();
const contentController = new PageController(contentComponent, moviesModel);

contentController.render(cards);


