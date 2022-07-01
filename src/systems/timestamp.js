const TimestampConverter = () => {
  // Timestamp in Unix epoch format -> number of seconds since 1970-01-01
  // Here in milliseconds
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

  const lastWeek = () => {
    const date = new Date();
    return now() - 7 * 24 * 3600 * 1000;
  };

  const lastMonth = () => {
    const date = new Date();
    return now() - 30 * 24 * 3600 * 1000;
  };

  const dateToTimestamp = (date) => {
    return new Date(date).getTime();
  };

  const timestampToDate = (timestamp) => {
    return new Date(timestamp);
  };

  return {
    now,
    lastHour,
    today,
    lastWeek,
    lastMonth,
    dateToTimestamp,
    timestampToDate,
  };
};

const isValidDate = (date) => {
  return !isNaN(new Date(date).getTime());
};

export { TimestampConverter, isValidDate };
