let timer;

function displayNotif(category, message, time) {
  clearInterval(timer);
  const div = document.querySelector('.notif');
  div.classList.add(category);
  div.textContent = message;

  timer = setInterval(() => {
    div.classList.remove(category);
    clearInterval(timer);
  }, time);
}

async function fetchData(url) {
  const value = await fetch(url, { mode: 'cors' }).catch((err) => {
    displayNotif('error', err);
  });
  if (!value.ok) {
    displayNotif(
      'error',
      'There seems to be an error connecting to the API. Please try again later.',
    );
  }
  const data = await value.json();

  return data;
}

export { displayNotif, fetchData };
