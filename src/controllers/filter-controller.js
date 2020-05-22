import FilterComponent from "../components/filter";
import {NavItem, STATS} from "../consts";
import {render, replace, PositionElement} from "../utils/render.js";
import {getMoviesByFilter} from "../utils/filter.js";

export default class FilterController {
  constructor(container, moviesModel, sortComponent, statisticComponent, contentComponent) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._statisticComponent = statisticComponent;
    this._contentComponent = contentComponent;
    this._sortComponent = sortComponent;

    this._activeFilterType = NavItem.ALL;
    this._filterComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._moviesModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;
    const allTasks = this._moviesModel.getMoviesAll();
    const oldComponent = this._filterComponent;


    const filters = Object.values(NavItem).map((filterType) => {
      return {
        name: filterType,
        count: getMoviesByFilter(allTasks, filterType).length,
      };
    });

    this._filterComponent = new FilterComponent(filters, this._activeFilterType);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(container, this._filterComponent, PositionElement.BEFOREEND);
    }
  }

  _onFilterChange(filterType) {
    this._moviesModel.setFilter(filterType);
    this._activeFilterType = filterType;

    switch (filterType) {
      case STATS:
        this._statisticComponent.show();
        this._contentComponent.hide();
        this._sortComponent.hide();
        break;
      case filterType:
        this._statisticComponent.hide();
        this._contentComponent.show();
        this._sortComponent.show();
        break;
    }
  }

  _onDataChange() {
    this.render();
  }
}
