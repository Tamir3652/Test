const content = document.getElementById("time");
const clock = document.getElementById("Clock");
const timer = document.getElementById("Timer");
const clockTab = document.getElementById("clockTab");
const timerTab = document.getElementById("timerTab");

/* ---------- CLOCK ---------- */
const getClock = () => {
  const now = new Date();
  let hours = String(now.getHours()).padStart(2, "0");
  let minutes = String(now.getMinutes()).padStart(2, "0");
  let seconds = String(now.getSeconds()).padStart(2, "0");

  content.textContent = hours + ":" + minutes + ":" + seconds;
};
getClock();
setInterval(getClock, 1000);

/* ---------- ТАБ СОЛИХ ---------- */
const showClock = () => {
  clock.classList.replace("ClockHide", "ClockShow");
  timer.classList.replace("TimerShow", "TimerHide");
  clockTab.classList.add("active");
  timerTab.classList.remove("active");
};
const showTimer = () => {
  clock.classList.replace("ClockShow", "ClockHide");
  timer.classList.replace("TimerHide", "TimerShow");
  timerTab.classList.add("active");
  clockTab.classList.remove("active");
};

/* ---------- TIMER ---------- */
const timerText = document.getElementById("timerText");
const barFill = document.getElementById("barFill");
const startBtn = document.getElementById("startBtn");
const hourInput = document.getElementById("hourInput");
const minInput = document.getElementById("minInput");
const secInput = document.getElementById("secInput");
const inputsBox = document.getElementById("inputsBox");
const presetsBox = document.getElementById("presetsBox");
const beep = new Audio("beep.wav"); // дуусахад тоглох дуу

let total = 300; // нийт секунд
let left = 300; // үлдсэн секунд
let timerId = null; // setInterval-ийн дугаар (зогсоохдоо хэрэгтэй)

const render = () => {
  // Нийт секундыг цаг, минут, секунд болгон задална
  // Жишээ: 3725 сек = 1 цаг (3600) + 2 мин (120) + 5 сек
  let hours = String(Math.floor(left / 3600)).padStart(2, "0");
  let minutes = String(Math.floor((left % 3600) / 60)).padStart(2, "0");
  let seconds = String(left % 60).padStart(2, "0");
  timerText.textContent = hours + ":" + minutes + ":" + seconds;

  // Үлдсэн хувиар bar-ын өргөнийг өөрчилнө
  barFill.style.width = (left / total) * 100 + "%";

  if (left <= 10 && left > 0) {
    timer.classList.add("danger");
  } else {
    timer.classList.remove("danger");
  }
};

const pauseTimer = () => {
  clearInterval(timerId);
  timerId = null;
  startBtn.textContent = "Start";
  inputsBox.classList.remove("locked");
  presetsBox.classList.remove("locked");
};

const setTimer = (sec) => {
  pauseTimer();
  total = sec;
  left = sec;
  timer.classList.remove("done");
  render();
};

const tick = () => {
  left = left - 1;
  render();
  if (left <= 0) {
    pauseTimer();
    timer.classList.add("done");
    beep.play();
  }
};

const toggleTimer = () => {
  if (timerId !== null) {
    pauseTimer();
  } else {
    if (left <= 0) {
      setTimer(total);
    }
    timerId = setInterval(tick, 1000);
    startBtn.textContent = "Pause";
    inputsBox.classList.add("locked");
    presetsBox.classList.add("locked");
  }
};

// Input-д бичсэн цагийг уншиж timer тохируулна
const setCustom = () => {
  let h = Number(hourInput.value); // хоосон бол 0 болно
  let m = Number(minInput.value);
  let s = Number(secInput.value);

  if (h < 0 || m < 0 || s < 0 || m > 59 || s > 59) {
    alert("Минут, секунд 0-59 хооронд байх ёстой");
  } else if (h + m + s === 0) {
    alert("Хугацаагаа оруулна уу");
  } else {
    setTimer(h * 3600 + m * 60 + s);
    hourInput.value = "";
    minInput.value = "";
    secInput.value = "";
  }
};

// Input дээр Enter дарвал Set дарсантай адил
const enterKey = (event) => {
  if (event.key === "Enter") {
    setCustom();
  }
};

const resetTimer = () => {
  setTimer(total);
};

render();
