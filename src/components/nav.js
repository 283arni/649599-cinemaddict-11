

const creatNavItemTemplate = (item, check) => {
  const {id, text, count} = item;

  return (
    `<a href="#${id}" class="main-navigation__item ${!check ? `main-navigation__item--active` : ``}">${text} ${check ? `<span class="main-navigation__item-count">${count}</span>` : ``}</a>`
  );
};

export const createStatisticTamplate = (arr) => {
  const items = arr.map((it, i) => creatNavItemTemplate(it, i !== 0)).join(`\n`);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${items}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};
