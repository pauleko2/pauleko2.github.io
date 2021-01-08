const startB = document.getElementById('startButton');
const stopB = document.getElementById('stopButton');
const resetB = document.getElementById('resetButton');
const pomodoroB = document.getElementById('pomodoroButton');
const breakB = document.getElementById('breakButton');


const totalMinutesText = document.getElementById('timeSpentText');
const totalCyclesText = document.getElementById('totalCyclesText');

var settingsB = document.querySelector('.settingsButton');
var modalBg = document.querySelector('.modal-bg');
var modalBg2 = document.querySelector('.modal2-bg');
var modalClose = document.querySelector('.modal-close');
var modal2Close = document.querySelector('.modal2-close');

const statsList = document.querySelector('.stat-items');

var themeToggle = document.querySelector('input[name=theme]');
const countdownText = document.getElementById("timerLabel");
const pomOkButton = document.getElementById('pLengthButton');
const breakOkButton = document.getElementById('bLengthButton');
const plength = document.getElementById('plength');
const blength = document.getElementById('blength');
const statisticsB = document.getElementById('statisticsButton');

const selectedNotif = document.getElementById('notif-select');
const testSoundButton = document.getElementById('testSoundButton');
const notificationSlider = document.getElementById('notifVolume');

var onBreak = false;
var timerStarted;
var pomodoroLen = getPomLen();
var breakLen = getBreakLen();

let time = pomodoroLen * 60;

resetB.addEventListener('click', resetTimer);
startB.addEventListener('click', startTimer);
stopB.addEventListener('click', stopTimer);
selectedNotif.addEventListener("change", setNotification);
testSoundButton.addEventListener('click', testSound);
notificationSlider.addEventListener('change', setNotificationVolume);

var bell = new Audio('./bell.mp3');
var panda = new Audio('./panda.mp3');
var audioToPlay = new Audio();

let stats = [];

function testSound() {
    audioToPlay.play();
}


function getPomLen() {
    strPom = localStorage.getItem("pomCycle");
    if (strPom == null || strPom == "null") {
        pomodoroLen = 25;
    } else {
        pomodoroLen = parseInt(strPom);
    }
    return pomodoroLen;
}

function getBreakLen() {
    strBreak = localStorage.getItem("breakLength");
    if (strBreak == null || strBreak == "null") {
        breakLen = 5;
    } else {
        breakLen = parseInt(strBreak);
    }
    return breakLen;
}

window.onload = function () {
    document.getElementById('plength').value = `${pomodoroLen}`;
    document.getElementById('blength').value = `${breakLen}`;
    countdownText.innerHTML = `${pomodoroLen}:00`;
    updateCurrentTask();
    equipNotification();
};


function equipNotification() {
    var notificationNumber = localStorage.getItem("notification");
    var notificationVolume = localStorage.getItem("notificationVolume");
    notificationSlider.value = notificationVolume * 100;

    switch (notificationNumber) {
        case 'bell':
            audioToPlay = bell;
            selectedNotif.value = 'bell';
            break;
        case 'panda':
            audioToPlay = panda;
            selectedNotif.value = 'panda';
            break;
        default:
            audioToPlay = bell;
    }
}

function setNotificationVolume() {
    audioToPlay.volume = notificationSlider.value / 100;
    localStorage.setItem("notificationVolume", notificationSlider.value / 100);
}

function setNotification() {
    var notificationNumber = selectedNotif.value;
    console.log(notificationNumber);
    localStorage.setItem("notification", notificationNumber);
    equipNotification();
}

pomOkButton.addEventListener('click', function () {
    if (document.getElementById('plength').value >= 1) {
        localStorage.setItem("pomCycle", document.getElementById('plength').value);
        countdownText.innerHTML = `${document.getElementById('plength').value}:00`;
        pomodoroLen = document.getElementById('plength').value
        time = pomodoroLen * 60;
    }
});

breakOkButton.addEventListener('click', function () {
    if (document.getElementById('blength').value >= 1) {
        localStorage.setItem("breakLength", document.getElementById('blength').value);
        breakLen = document.getElementById('blength').value;
    }
});

function stopTimer() {
    clearInterval(timerStarted);
    timerStarted = undefined;
    console.log("stoping");
}

function startTimer() {
    console.log("starting");
    if (timerStarted === undefined) {
        timerStarted = setInterval(timerCountdown, 25);
    } else {}
}

function timerCountdown() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;
    countdownText.innerHTML = `${minutes}:${seconds}`;
    time--;
    time = time < 0 ? 0 : time;

    if (time == 0 && !onBreak && seconds == 0) {
        console.log("change");
        changeToBreak();
        resetTimer();
        onBreak = true;
        time = breakLen * 60;
        startTimer();
        decrimentPomCycles();
        audioToPlay.play();
        addStat();
        showStats(stats);
    }
    if (time == 0 && onBreak && seconds == 0) {
        changeToPomodoro();
        resetTimer();
        onBreak = false;
        time = pomodoroLen * 60;
    }
}

function resetTimer() {
    clearInterval(timerStarted);
    timerStarted = undefined;
    countdownText.innerHTML = `${pomodoroLen}:00`;
    time = pomodoroLen * 60;
}

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


//Transition
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

statisticsB.addEventListener('click', function () {
    modalBg2.classList.add('bg2-active');
    showStats(stats);
});



modalClose.addEventListener('click', function () {
    modalBg.classList.remove('bg-active');
});

modal2Close.addEventListener('click', function () {
    modalBg2.classList.remove('bg2-active');
});

window.addEventListener('click', (event) => {
    if (event.target == modalBg) {
        modalBg.classList.remove('bg-active');
    }
    if (event.target == modalBg2) {
        modalBg2.classList.remove('bg2-active');
    }
});


// breakB.addEventListener('click', () => {
//     changeToBreak();
// });

// pomodoroB.addEventListener('click', () => {
//     changeToPomodoro();
// });



function changeToBreak() {
    document.getElementById('timerBackground').src = 'images/greenBack.svg';
    document.getElementById('breakButton').src = 'images/breakDark.svg';
    document.getElementById('pomodoroButton').src = 'images/pomodoroLight.svg';
    countdownText.innerHTML = `${breakLen}:00`;
}

function changeToPomodoro() {
    document.getElementById('timerBackground').src = 'images/red.svg';
    document.getElementById('breakButton').src = 'images/breakLight.svg';
    document.getElementById('pomodoroButton').src = 'images/pomodoroDark.svg';
    countdownText.innerHTML = `${pomodoroLen}:00`;
}

function onHover() {
    var img = document.getElementById('timerBackground').src;
    if (img.indexOf('red.svg') != -1) {
        document.getElementById('timerBackground').src = 'images/greenBack.svg';
    } else {
        document.getElementById('timerBackground').src = 'images/red.svg';
    }
}

function addStat() {
    var d = new Date();

    const stat = {
        date: d,
        cycleLength: pomodoroLen,
    };
    stats.push(stat);
    localStorage.setItem('stats', JSON.stringify(stats));
}

function showStats(stats) {
    var totalMin = 0;
    var totalCycles = 0;

    statsList.innerHTML = '';
    const reference = localStorage.getItem('stats');
    if (reference) {
        stats = JSON.parse(reference);
        stats.forEach(function (stat) {
            totalMin += parseInt(stat.cycleLength);
            totalCycles++;

            const li = document.createElement('li');
            li.setAttribute('class', 'stat');

            var datString = stat.date;
            var newString = datString.substring(0, 18);

            li.innerHTML = `${newString} Cycle length: ${stat.cycleLength}min.`;
            statsList.append(li);
        });
        totalMinutesText.innerHTML = `${totalMin} min.`;
        totalCyclesText.innerHTML = `${totalCycles}`;
    }
}

function dumb() {
    const li = document.createElement('li');
    li.setAttribute('class', 'stat');
    li.innerHTML = ` haha`;
    statsList.append(li);
}