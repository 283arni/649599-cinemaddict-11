import AbstractComponent from './abstract-component';

export const SortType = {
  RATING: `rating`,
  DATE: `date`,
  DEFAULT: `default`,
};

const createSortTamplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active" data-sort="${SortType.DEFAULT}">Sort by default</a></li>
      <li><a href="#" class="sort__button" data-sort="${SortType.DATE}">Sort by date</a></li>
      <li><a href="#" class="sort__button" data-sort="${SortType.RATING}">Sort by rating</a></li>
    </ul>`
  );
};

const removeClassSort = (elem) => {
  const sorts = elem.querySelectorAll(`.sort__button`);
  sorts.forEach((sort) => sort.classList.remove(`sort__button--active`));
};

export default class Sort extends AbstractComponent {
  constructor() {
    super();

    this._currenSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return createSortTamplate();
  }

  getSortType() {
    return this._currenSortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      removeClassSort(this.getElement());

      const sortType = evt.target.dataset.sort;

      evt.target.classList.add(`sort__button--active`);
      this._currenSortType = sortType;

      handler(this._currenSortType);
    });
  }

  setActiveSort(type) {
    removeClassSort(this.getElement());
    const defaultButton = this.getElement().querySelector(`[data-sort="${type}"]`);
    defaultButton.classList.add(`sort__button--active`);
  }
}
