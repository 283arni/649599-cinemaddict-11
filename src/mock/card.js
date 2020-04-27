import moment from 'moment';

const Amount = {
  DAYS: 30,
  MONTHS: 12,
  MIN_YEARS: 10,
  MAX_YEARS: 99,
  RATING: 100,
  DIVISOR_RATING: 10,
  MAX_COMENTS: 6,
  HOURS: 3,
  MINUTES: 60,
  MAX_SENTENCES: 5
};

const genres = [`comedy`, `mystery`, `drama`, `cartoon`, `western`, `musical`];

const sourcePosterMovies = {
  'Made for each other': `./images/posters/made-for-each-other.png`,
  'Popeye the Sailor Meets Sindbad the Sailor': `./images/posters/popeye-meets-sinbad.png`,
  'Sagebrush Trail': `./images/posters/sagebrush-trail.jpg`,
  'Santa Claus Conquers the Martians': `./images/posters/santa-claus-conquers-the-martians.jpg`,
  'The Dance of Life': `./images/posters/the-dance-of-life.jpg`,
  'The Great Flamarion': `./images/posters/the-great-flamarion.jpg`,
  'The Man with the Golden Arm': `./images/posters/the-man-with-the-golden-arm.jpg`,
};

const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`;

const randomCountComments = () => {
  return Math.floor(Math.random() * Amount.MAX_COMENTS);
};

const generateDate = () => {
  return Date.now() * Math.random() * Amount.MONTHS;
};

const getRandomYear = (min, max) => {
  return `19${Math.floor(Math.random() * (max - min) + min)}`;
};

const randomValue = (arrayValues) => {
  return arrayValues[Math.floor(Math.random() * arrayValues.length)];
};

// const getTimeMovie = (hour, minute) => {
//   return `${Math.floor(Math.random() * hour)} ${Math.floor(Math.random() * minute)}`;
// };

const getRating = () => {
  return Math.floor(Math.random() * Amount.RATING) / Amount.DIVISOR_RATING;
};

const sliceDescription = (str) => {

  const newStr = str.split(`. `);
  const indexBegin = Math.ceil(Math.random() * newStr.length - 1);
  const indexFinal = Math.floor(Math.random() * Amount.MAX_SENTENCES);

  return `${newStr.filter((string, i) => i >= indexBegin && i <= indexBegin + indexFinal).join(`. `)}.`;
};

const posters = Object.entries(sourcePosterMovies);

const generateCard = () => {
  const [title, poster] = randomValue(posters);

  return {
    'title': title,
    'poster': poster,
    'director': `Anthony Mann`,
    'writers': `Anne Wigton, Heinz Herald, Richard Weil`,
    'actors': `Erich von Stroheim, Mary Beth Hughes, Dan Duryea`,
    'rating': getRating(),
    'release date': moment(generateDate()).format(`DD MMMM`),
    'year': moment([getRandomYear(Amount.MIN_YEARS, Amount.MAX_YEARS)]).format(`YYYY`),
    'time': `${moment(Date.now()).format(`hh`)}h ${moment(Date.now()).format(`mm`)}m`,
    'country': `USA`,
    'description': sliceDescription(description),
    'countComments': randomCountComments(),
    'genre': randomValue(genres),
    'activedWatchlist': false,
    'activedWatched': false,
    'activedFavorite': false,
    'emoji': ``
  };
};

const generateCards = (num) => {
  return new Array(num)
    .fill(``)
    .map(generateCard);
};

export {generateCards};


