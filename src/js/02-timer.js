import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
Notify.init({
  width: '300px',
  position: 'center-bottom',
  distance: '30px',
  opacity: 1,
  borderRadius: '10px',
  clickToClose: true
});

const refs = {
    startBtn: document.querySelector('button[data-start]'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]')
}

let targetTime = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        targetTime = selectedDates[0].getTime();

        if (targetTime < Date.now()) {
          Notify.failure("Please choose a date in the future")
          refs.startBtn.disabled = true
         
          return
        }
        Notify.success("Okay, let's go! Press the start button")  
      
        refs.startBtn.disabled = false
  },
};
flatpickr('input[type="text"]', options);

refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click', onStartBtnClick);


function onStartBtnClick() {
    intervalId = setInterval(runTimer, 1000);
}

function runTimer() {
    if (targetTime / 1000 <= Date.now() / 1000) {
        clearInterval(intervalId)

        return
    }

    updateInterface(convertMs(targetTime - Date.now()));
}

function updateInterface({ days, hours, minutes, seconds }) {
    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
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

function addLeadingZero(value) {
    return value.toString().padStart(2, '0')
}
