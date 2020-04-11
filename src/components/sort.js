
const paramsSort = [`default`, `date`, `rating`];

const createItemSortTemplate = (sorts) => {
  return sorts.map((sort, i) => {
    return (`<li><a href="#" class="sort__button ${i === 0 ? `sort__button--active` : ``}">Sort by ${sort}</a></li>`);
  }).join(`\n`);
};


export const createSortTamplate = () => {
  const sorting = createItemSortTemplate(paramsSort);

  return (
    `<ul class="sort">
      ${sorting}
    </ul>`
  );
};
