// on initial page load, 'my list' button should be active
const mylistBtn = document.getElementById('myListMode');
const focusseshBtn = document.getElementById('pomodoroMode');
const mylistview = document.getElementById('mylistBigView');
const focussessionview = document.getElementById('focussessionBigView');

function toggleGeneralAppMode() {
    // window.getComputedStyle checks for the styles actually being applied even if it's not written as an inline style (a.k.a. from external stylesheet)
    const mylistDisplay = window.getComputedStyle(mylistview).getPropertyValue('display');
    const focussessionDisplay = window.getComputedStyle(focussessionview).getPropertyValue('display');

    // 'my list' mode display
    if (mylistDisplay === 'flex') {
        // set html body to whitesmoke colour
        // '.body' is direct reference to <body> element
        document.body.classList.remove('pomodoro-mode-view');  // remove dark bg
        document.body.classList.add('my-list-mode-view');  // apply light bg
        // make 'my list' button active, deactivate 'focus session' button
        focusseshBtn.classList.remove('active');
        mylistBtn.classList.add('active');


        // 'focus session' mode (Pomodoro) display
    } else if (focussessionDisplay === 'flex') {
        // set html body to #1E1E1E colour
        document.body.classList.remove('my-list-mode-view');  // remove light bg
        document.body.classList.add('pomodoro-mode-view');  // apply dark bg

        // make 'focus session' button active, deactivate 'my list' button
        mylistBtn.classList.remove('active');
        focusseshBtn.classList.add('active');

        // default pomodoro setting upon initial load
        pomodorotimerMode.classList.add('active');   // 'pomodorotimerMode' declared in index.php
        timercircle.classList.add('pomodoro');   // 'timercircle' declared in index.php
        // telling the system to be on the pomodoro timer mode (for 'pomodorotimer.js')
        isPomodoro = true; // 'isPomodoro' flag declared in 'index.php'
        // setting default pomodoro timer
        setDefaultTimerModeInterval();
    }
}

// setting default timer values for 'pomodorotimer.js' [have to declare in this file because toggleGeneralAppMode() needs to call it]
function setDefaultTimerModeInterval() {
    if (isPomodoro && !isShortBreak && !isLongBreak){
        // retrieve timer values set in session variables
        fetch('http:/Aiya Just Do It (FYP retake)/app_config/session_pomodoro_value_set.php?pommode=pomodoro', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            // set default pomodoro interval upon intial page load
            setTimer(Number(data.minutehand), Number(data.secondhand));   // setTimer() in 'pomodorotimer.js'
        })

        // set default pomodoro interval upon intial page load
        // setTimer(25, 0);
    } else if (isShortBreak && !isPomodoro && !isLongBreak) {
        // retrieve timer values set in session variables
        fetch('http:/Aiya Just Do It (FYP retake)/app_config/session_pomodoro_value_set.php?pommode=short', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            // set default pomodoro interval upon intial page load
            setTimer(Number(data.minutehand), Number(data.secondhand));   // setTimer() in 'pomodorotimer.js'
        })
        // set default short break interval upon intial page load
        // setTimer(5, 0);
    } else if (isLongBreak && !isPomodoro && !isShortBreak) {
        // retrieve timer values set in session variables
        fetch('http:/Aiya Just Do It (FYP retake)/app_config/session_pomodoro_value_set.php?pommode=long', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            // set default pomodoro interval upon intial page load
            setTimer(Number(data.minutehand), Number(data.secondhand));   // setTimer() in 'pomodorotimer.js'
        })
        // set default pomodoro interval upon intial page load
        // setTimer(15, 0);
    }
}

// change button style upon hover
mylistBtn.addEventListener('mouseover', () => {
    mylistBtn.classList.add('hover');
})
mylistBtn.addEventListener('mouseout', () => {
    mylistBtn.classList.remove('hover');
})
focusseshBtn.addEventListener('mouseover', () => {
    focusseshBtn.classList.add('hover');
})
focusseshBtn.addEventListener('mouseout', () => {
    focusseshBtn.classList.remove('hover');
})


// handling button click for 'my list mode' or 'pomodoro timer mode'
document.addEventListener('click', function(event) {
    // elements
    // const mylistBtn = document.getElementById('myListMode');
    // const focusseshBtn = document.getElementById('pomodoroMode');
    // const mylistview = document.getElementById('mylistBigView');

    // listen for button click
    const mylistClicked = mylistBtn.contains(event.target);
    const focusseshClicked = focusseshBtn.contains(event.target);

    // if none of these 2 buttons are clicked, exit function
    // const appModeClicked = mylistClicked || focusseshClicked;
    if (!(mylistClicked || focusseshClicked)) {
        return;   // exit function
    }

    if (mylistClicked) {
        // hide 'focus session' view
        focussessionview.style.display = 'none';
        // 'my list' view shows up
        mylistview.style.display = 'flex';

    } else if (focusseshClicked) {
        // hide 'my list' view
        mylistview.style.display = 'none';
        // 'focus session' view shows up
        focussessionview.style.display = 'flex';
    }

    // debug
    // console.log('focus session page entered.');
    toggleGeneralAppMode();
})


document.addEventListener('DOMContentLoaded', toggleGeneralAppMode);