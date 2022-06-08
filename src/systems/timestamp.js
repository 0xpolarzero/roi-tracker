const TimestampConverter = () => {
  const now = () => {
    return new Date().getTime();
  };

  const lastHour = () => {
    return now() - 3600000;
  };

  const today = () => {
    const date = new Date();
    return date.setHours(0, 0, 0, 0);
  };

  const week = () => {
    const date = new Date();
    return now() - 7 * 24 * 3600 * 1000;
  };

  const dateToTimestamp = (date) => {
    return new Date(date).getTime();
  };

  return { now, lastHour, today, dateToTimestamp };
};

const isValidDate = (date) => {
  return !isNaN(new Date(date).getTime());
};

export { TimestampConverter, isValidDate };
