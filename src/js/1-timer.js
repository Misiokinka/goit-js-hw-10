import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
let userSelectedDate;
let timeInterval;
const startButton = document.querySelector('button[data-start]');

startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const starDate = Date.now();
    userSelectedDate = selectedDates[0].getTime();
    if (userSelectedDate - starDate < 0) {
      startButton.disabled = true;
      return iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
    }
    startButton.disabled = false;
  },
};

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  const inputDate = document.getElementById('datetime-picker');
  inputDate.disabled = true;
  timeInterval = setInterval(startTimer, 1000);
});

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function startTimer() {
  const resultDate = convertMs(userSelectedDate - Date.now());
  const days = document.querySelector('span[data-days]');
  const hours = document.querySelector('span[data-hours]');
  const minutes = document.querySelector('span[data-minutes]');
  const seconds = document.querySelector('span[data-seconds]');
  if (userSelectedDate - Date.now() <= 0) {
    clearInterval(timeInterval);
    days.textContent = addLeadingZero(0);
    hours.textContent = addLeadingZero(0);
    minutes.textContent = addLeadingZero(0);
    seconds.textContent = addLeadingZero(0);
  }
  days.textContent = addLeadingZero(resultDate.days);
  hours.textContent = addLeadingZero(resultDate.hours);
  minutes.textContent = addLeadingZero(resultDate.minutes);
  seconds.textContent = addLeadingZero(resultDate.seconds);
}

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
