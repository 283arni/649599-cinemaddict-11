const MAX_AMOUNT_MOVIES = 10;

const navList = {
  all: `All moveis`,
  watchlist: `Watchlist`,
  history: `History`,
  favorites: `Favorites`
};

const fillMenuItems = () => {
  const arr = Object.entries(navList);

  return arr.map((navItem) => {
    const [id, text] = navItem;
    return {
      id,
      text,
      count: Math.floor(Math.random() * MAX_AMOUNT_MOVIES)
    };
  });
};

export {fillMenuItems};
