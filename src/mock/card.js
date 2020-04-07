
const posters = {
  'Made for each other': `./public/images/posters/made-for-each-other.png`,
  'Popeye meets sinbad': `./public/images/posters/popeye-meets-sinbad.png`,
  'Sagebrush trail': `./public/images/posters/sagebrush-trail.png`,
  'Santa claus conquers the martians': `./public/images/posters/psanta-claus-conquers-the-martians.png`,
  'The dance of life': `./public/images/posters/the-dance-of-life.png`,
  'The great flamarion': `./public/images/posters/the-great-flamarion.png`,
  'The man with the golden arm': `./public/images/posters/the-man-with-the-golden-arm.png`,
};

const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`;

const countComments = () => {
  return Math.floor(Math.random() * 6);
};

const randomPosters = (arr) => {
  const postersArray = Object.entries(arr);

  return postersArray[Math.floor(Math.random() * postersArray.length)];
};

const sliceDescription = (str) => {

  const newStr = str.split(`.`);
  const indexBegin = Math.ceil(Math.random() * newStr.length);
  const indexFinal = Math.floor(Math.random() * 5);

  return `${newStr.filter((it, i) => i >= indexBegin && i <= indexBegin + indexFinal).join(`.`)}.`;
};

const generateCard = () => {
  const movie = randomPosters(posters);

  return {
    title: movie[0],
    poster: movie[1],
    description: sliceDescription(description),
    comment: countComments(),
  };
};

const generateCards = (num) => {
  return new Array(num)
    .fill(``)
    .map(generateCard);
};

console.log(generateCards(5));


