import AbstractComponent from './abstract-component';

const setActiveClass = function (evt, element) {
  const filtersList = element.querySelectorAll(`a`);

  filtersList.forEach((filter) => {
    filter.classList.remove(`main-navigation__item--active`);
  });

  evt.target.classList.add(`main-navigation__item--active`);
};

const creatNavItemTemplate = (tab) => {

  const {name, count} = tab;
  const updateName = name.split(` `)[0];

  const activeClass = updateName === `All` ? `main-navigation__item--active` : ``;
  const insertCount = updateName !== `All` ? `<span class="main-navigation__item-count">${count}</span>` : ``;

  return (
    `<a href="#${updateName}" data-name="${updateName}" class="main-navigation__item  ${activeClass}">${name} ${insertCount}</a>`
  );
};

const createStatisticTamplate = (array) => {

  const menuItems = array.map((item) => creatNavItemTemplate(item)).join(`\n`);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${menuItems}
      </div>
      <a href="#Stats" data-name="Stats" class="main-navigation__additional">Stats</a>
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

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {

      if (evt.target.tagName !== `A`) {
        return;
      }

      const filterName = evt.target.dataset.name;

      setActiveClass(evt, this.getElement());
      handler(filterName);
    });
  }
}
