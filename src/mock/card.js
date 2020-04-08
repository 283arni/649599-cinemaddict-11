const jenres = [`comedy`, `mystery`, `drama`, `cartoon`, `western`, `musical`];

const Posters = {
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
  return Math.floor(Math.random() * 6);
};

const randomPosters = (arr) => {
  const postersArray = Object.entries(arr);

  return postersArray[Math.floor(Math.random() * postersArray.length)];
};

const randomJenre = (jenresArray) => {
  return jenresArray[Math.floor(Math.random() * jenresArray.length)];
};

const getTimeMovie = (hour, minute) => {
  return `${Math.floor(Math.random() * hour)}h ${Math.floor(Math.random() * minute)}m`;
};

const getRating = () => {
  return Math.floor(Math.random() * 100) / 10;
};

const sliceDescription = (str) => {

  const newStr = str.split(`.`);
  const indexBegin = Math.ceil(Math.random() * newStr.length - 1);
  const indexFinal = Math.floor(Math.random() * 5);

  return `${newStr.filter((it, i) => i >= indexBegin && i <= indexBegin + indexFinal).join(`.`)}.`;
};

const generateCard = () => {
  const movie = randomPosters(Posters);

  return {
    title: movie[0],
    poster: movie[1],
    jenre: randomJenre(jenres),
    rating: getRating(),
    time: getTimeMovie(3, 60),
    description: sliceDescription(description),
    countComments: randomCountComments(),
  };
};

const generateCards = (num) => {
  return new Array(num)
    .fill(``)
    .map(generateCard);
};

export {generateCards};


