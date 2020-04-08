const NavigationItems = {
  all: `All moveisList`,
  watchlist: `Watchlist`,
  history: `History`,
  favorites: `Favorites`
};

const fillMenuItems = () => {
  const arr = Object.entries(NavigationItems);

  return arr.map((it) => {
    return {
      id: it[0],
      text: it[1],
      count: Math.floor(Math.random() * 10)
    };
  });
};

export {fillMenuItems};
