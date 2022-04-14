const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
    body: document.querySelector('body')
}
let intervalId = null;

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
    intervalId = setInterval(changeBgColor, 1000)
    refs.startBtn.disabled = true;
}

function onStopBtnClick() {
    clearInterval(intervalId)
    refs.startBtn.disabled = false;
}

function changeBgColor() {
    refs.body.style.backgroundColor = getRandomHexColor()
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}