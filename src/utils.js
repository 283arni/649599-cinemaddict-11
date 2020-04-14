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
      container.prepend(element);
      break;
    case PositionElement.BEFOREEND:
      container.append(element);
      break;
  }
};

