
export const PositionElement = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = (container, element, place) => {
  switch (place) {
    case PositionElement.AFTERBEGIN:
      container.prepend(element.getElement());
      break;
    case PositionElement.BEFOREEND:
      container.append(element.getElement());
      break;
  }
};

export const replace = (newComponent, oldComponent) => {

  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElements = !!(parentElement && newElement && oldElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

export const replaceTitle = (newComponent, oldComponent) => {

  const parentElement = oldComponent.getElement().querySelector(`.films-list`);
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement().querySelector(`.films-list__title`);

  const isExistElements = !!(parentElement && newElement && oldElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};
