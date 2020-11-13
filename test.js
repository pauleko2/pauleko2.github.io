const startB = document.getElementById('startButton');
const pomodoroB = document.getElementById('pomodoroButton');
const breakB = document.getElementById('breakButton');
var settingsB = document.querySelector('.settingsButton');
var modalBg = document.querySelector('.modal-bg');
var modalClose = document.querySelector('.modal-close');
var themeToggle = document.querySelector('input[name=theme]');


var minLabel = document.getElementById("min-label");
var secLabel = document.getElementById("sec-label");



themeToggle.addEventListener('change', function () {
    if (document.documentElement.getAttribute('data-theme', 'light') == "light") {
        trans()
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem("DarkMode", "yes")
    } else {
        trans()
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem("DarkMode", "no")
    }
});
//Transition between themes
let trans = () => {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
        document.documentElement.classList.remove('transition');
    }, 1000)
}
var box = document.getElementById("switch");
if (localStorage.getItem("DarkMode") == "yes") {
    document.documentElement.setAttribute('data-theme', 'dark');
    box.checked = true;
} else {
    box.checked = false;
    document.documentElement.setAttribute('data-theme', 'light');
}


settingsB.addEventListener('click', function () {
    modalBg.classList.add('bg-active');
});

modalClose.addEventListener('click', function () {
    modalBg.classList.remove('bg-active');
});

window.addEventListener('click', (event) => {
    if (event.target == modalBg) {
        modalBg.classList.remove('bg-active');
    }
});


breakB.addEventListener('click', () => {
    changeToBreak();
});

pomodoroB.addEventListener('click', () => {
    changeToPomodoro();
});

startB.addEventListener('click', () => {
    if (!timerStarted) {
        document.getElementById('startButton').src = 'stop.svg';
        timerStarted = true;

    } else {
        document.getElementById('startButton').src = 'start.svg';
        timerStarted = false;
    }
});



function changeToBreak() {
    document.getElementById('timerBackground').src = 'greenBack.svg';
    document.getElementById('breakButton').src = 'breakDark.svg';
    document.getElementById('pomodoroButton').src = 'pomodoroLight.svg';
    document.getElementById('timeString').textContent = "05:00";
}

function changeToPomodoro() {
    document.getElementById('timerBackground').src = 'red.svg';
    document.getElementById('breakButton').src = 'breakLight.svg';
    document.getElementById('pomodoroButton').src = 'pomodoroDark.svg';
    document.getElementById('timeString').textContent = "25:00";
}

function onHover() {
    var img = document.getElementById('timerBackground').src;
    if (img.indexOf('red.svg') != -1) {
        document.getElementById('timerBackground').src = 'greenBack.svg';
    } else {
        document.getElementById('timerBackground').src = 'red.svg';
    }
}