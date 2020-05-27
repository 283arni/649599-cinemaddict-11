import AbstractComponent from './abstract-component';

const setActiveClass = (evt, element) => {
  const filtersList = element.querySelectorAll(`a`);

  filtersList.forEach((filter) => {
    filter.classList.remove(`main-navigation__item--active`);
  });

  evt.target.classList.add(`main-navigation__item--active`);
};

const creatNavItemTemplate = (tab, filter) => {
  const {name, count} = tab;

  const insertCount = name !== `All movies` ? `<span class="main-navigation__item-count">${count}</span>` : ``;
  const activeFilter = filter === name ? `main-navigation__item--active` : ``;

  return (
    `<a href="#${name}" data-name="${name}" class="main-navigation__item ${activeFilter}">${name} ${insertCount}</a>`
  );
};

const createFilterTamplate = (list, filter) => {
  const menuItems = list.map((item) => creatNavItemTemplate(item, filter)).join(`\n`);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${menuItems}
      </div>
      <a href="#Stats" data-name="Stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class Filter extends AbstractComponent {
  constructor(navItems, activeFilter) {
    super();

    this._navs = navItems;
    this._activeFilter = activeFilter;
  }

  getTemplate() {
    return createFilterTamplate(this._navs, this._activeFilter);
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
