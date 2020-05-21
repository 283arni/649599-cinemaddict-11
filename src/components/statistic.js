import AbstractSmartComponent from './abstract-smart-component';
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {getTimeFromMins, getRankUser, watchedMovies} from '../utils/changer';
import moment from 'moment';
import {intervalsWatching} from '../consts';

const BAR_HEIGHT = 50;
const ADD_REPEAT_GENRE = 1;

const searchTopGenre = (object) => {
  let topGenre = ``;
  let num = 0;

  for (const [key, value] of object.entries()) {

    if (value > num) {
      topGenre = key;
      num = value;
    }
  }

  return topGenre;
};

const getAllGenres = (movies) => {
  const allGenres = new Map();

  movies.map((movie) => movie.genre.map((type) => allGenres.has(type) ? allGenres.set(type, allGenres.get(type) + ADD_REPEAT_GENRE) : allGenres.set(type, ADD_REPEAT_GENRE)));

  return allGenres;
};


const myChart = (statisticCtx, cards) => {
  const watched = watchedMovies(cards);
  const genres = getAllGenres(watched);

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: [...genres.keys()],
      datasets: [{
        data: [...genres.values()],
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};


const createStatisticsTamplate = (cards) => {

  const userRank = getRankUser(watchedMovies(cards).length);

  return (
    `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${userRank}</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
      <label for="statistic-all-time" class="statistic__filters-label" data-name="all">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
      <label for="statistic-today" class="statistic__filters-label" data-name="today">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
      <label for="statistic-week" class="statistic__filters-label" data-name="week">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
      <label for="statistic-month" class="statistic__filters-label" data-name="month">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
      <label for="statistic-year" class="statistic__filters-label" data-name="year">Year</label>
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text" data-name="watched"></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text" data-name="time"></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text" data-name="top"></p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`
  );
};


export default class Statistic extends AbstractSmartComponent {
  constructor({movies}) {
    super();
    this._moviesChart = null;
    this._cards = movies;


    this._renderChart();
    this._renderForTime();
  }

  getTemplate() {
    return createStatisticsTamplate(this._cards.getMoviesAll());
  }

  recoveryListeners() {}

  rerender(cards) {
    this._cards = cards;

    super.rerender();


    this._renderChart();
    this._renderForTime();

  }

  show() {
    super.show();

    this.rerender(this._cards);
  }

  _renderChart(cards = this._cards.getMoviesAll()) {
    let newCards = watchedMovies(cards);
    const height = getAllGenres(newCards).size;

    const element = this.getElement();
    const statisticCtx = this.getElement().querySelector(`.statistic__chart`);
    const watched = element.querySelector(`[data-name="watched"]`);
    const time = element.querySelector(`[data-name="time"]`);
    const top = element.querySelector(`[data-name="top"]`);

    const totalTime = newCards.reduce((accum, card) => {
      return accum + card.time;
    }, 0);

    const hours = parseInt(getTimeFromMins(totalTime).split(` `)[0], 10);
    const minutes = parseInt(getTimeFromMins(totalTime).split(` `)[1], 10);

    const genres = getAllGenres(newCards);
    const topGenre = searchTopGenre(genres);

    watched.innerHTML = `${newCards.length}<span class="statistic__item-description">movies</span>`;
    time.innerHTML = `${hours} <span class="statistic__item-description">h</span> ${minutes} <span class="statistic__item-description">m</span>`;
    top.textContent = `${topGenre}`;

    this._resetChart();
    // Обязательно рассчитайте высоту canvas, она зависит от количества элементов диаграммы
    statisticCtx.height = BAR_HEIGHT * height;
    this._moviesChart = myChart(statisticCtx, newCards);
  }

  _resetChart() {
    if (this._moviesChart) {
      this._moviesChart.destroy();
      this._moviesChart = null;
    }
  }

  _renderForTime() {

    const labels = this.getElement().querySelectorAll(`label`);

    labels.forEach((label) => {
      label.addEventListener(`click`, (e) => {
        let newCards = null;
        const intervalTime = e.target.dataset.name;
        switch (intervalTime) {
          case intervalsWatching.all:
            newCards = this._cards.getMoviesAll();
            this._renderChart(newCards);
            break;
          case intervalsWatching.today:
            newCards = this._cards.getMoviesAll().filter((card) => moment(new Date(card.watching)).format(`DD MM YYYY`) === moment(new Date()).format(`DD MM YYYY`));
            this._renderChart(newCards);
            break;
          case intervalTime:
            newCards = this._cards.getMoviesAll().filter((card) => moment(new Date(card.watching)) >= moment(new Date()).subtract(1, intervalsWatching[intervalTime]));
            this._renderChart(newCards);
            break;
        }
      });
    });
  }
}
