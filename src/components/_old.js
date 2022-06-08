// Track ROI from dates

e.preventDefault();
// Otherwise the time period is custom
// Check the validity of the time period
if (
  !isValidDate(this.state.period.from) ||
  !isValidDate(this.state.period.to)
) {
  displayNotif('error', 'Please make sure to fill the two dates', 2000);
  return;
}
// Then proceed to the timestamp of those dates
const start = TimestampConverter().dateToTimestamp(this.state.period.from);
const end = TimestampConverter().dateToTimestamp(this.state.period.to);
transactions = await getTransactions(start, end);

// Period custom

<div className='period-custom'>
  <span>From</span>
  <input onChange={changeDate} type='datetime-local' id='date-from' />
  <span>To</span>
  <input onChange={changeDate} type='datetime-local' id='date-to' />
</div>;

changeDate = (e) => {
  if (e.target.id === 'date-from') {
    this.setState({
      period: {
        from: e.target.value,
        to: this.state.period.to,
      },
    });
  } else {
    this.setState({
      period: {
        from: this.state.period.from,
        to: e.target.value,
      },
    });
  }
};
