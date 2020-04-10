const START_ACTIVE_ELEMENT = 0;

const creatNavItemTemplate = (tab, check) => {
  const {id, text, count} = tab;

  return (
    `<a href="#${id}" class="main-navigation__item ${check ? `main-navigation__item--active` : ``}">${text} ${!check ? `<span class="main-navigation__item-count">${count}</span>` : ``}</a>`
  );
};

export const createStatisticTamplate = (array) => {
  const menuItems = array.map((item, i) => creatNavItemTemplate(item, i === START_ACTIVE_ELEMENT)).join(`\n`);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${menuItems}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};
