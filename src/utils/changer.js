export const getTimeFromMins = (mins) => {
  return `${Math.trunc(mins / 60)}h ${mins % 60}m`;
};
