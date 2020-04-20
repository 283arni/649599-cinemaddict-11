import AbstractComponent from './abstract-component';

const START_ACTIVE_ELEMENT = 0;

const creatNavItemTemplate = (tab, check) => {
  const {id, text, count} = tab;

  const activeClass = check ? `main-navigation__item--active` : ``;
  const insertCount = !check ? `<span class="main-navigation__item-count">${count}</span>` : ``;

  return (
    `<a href="#${id}" class="main-navigation__item ${activeClass}">${text} ${insertCount}</a>`
  );
};

const createStatisticTamplate = (array) => {
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

export default class Navigation extends AbstractComponent {
  constructor(navItem) {
    super();
    this._nav = navItem;
  }

  getTemplate() {
    return createStatisticTamplate(this._nav);
  }
}
