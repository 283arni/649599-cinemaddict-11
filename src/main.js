import RankComponent from './components/rank';
import NavComponent from './components/nav';
import PageController from './controllers/page-controller';

import ContentComponent from './components/content';
import AmountMoviesComponent from './components/amount-all-movies';
import {generateCards} from './mock/card';
import {fillMenuItems} from './mock/nav';
import {PositionElement, render} from './utils/render';
import {comments} from './mock/comment';


const QUANTITY_MOVIES = 22;

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footerStatistics = document.querySelector(`.footer__statistics`);
const navItems = fillMenuItems();
const cards = generateCards(QUANTITY_MOVIES);

render(header, new RankComponent(), PositionElement.BEFOREEND);
render(main, new NavComponent(navItems), PositionElement.BEFOREEND);
render(footerStatistics, new AmountMoviesComponent(), PositionElement.BEFOREEND);


const contentComponent = new ContentComponent();
const contentController = new PageController(contentComponent);

contentController.render(cards, comments);


