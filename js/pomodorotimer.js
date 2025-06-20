let minuteCounter = 0;
let secondCounter = 0;
let time; // full time display (minuteCounter:secondCounter combined)
let interval;
let timerPause = false;
let shortBreakCount = 0
let systemIsStillActive = 0;  // to represent the 5 mins interval time for pinging session_handling.php
// flags to determine which pomodoro mode it's on
// let isPomodoro = false;
// let isShortBreak = false;
// let isLongBreak = false;
// timer display div in the timer circle
const customMinuteInput = document.getElementById('customMinute');
const customSecondInput = document.getElementById('customSecond');
const timerDisplay = document.getElementById('timerPreview');

// TIMER FUNCTION
function setTimer(setMinutes, setSeconds) {
    // setting minutes & seconds from initial page load [setDefaultTimerModeInterval()] or custom set time
    minuteCounter = setMinutes;  // from function parameter 1
    secondCounter = setSeconds;  // from function parameter 2
    time = `${String(minuteCounter).padStart(2, '0')}:${String(secondCounter).padStart(2, '0')}`;
    timerDisplay.innerHTML = time;
}

// the timer run
function timer() {
    // if timercircle clicked to pause
    if (timerPause) {
        return;  // skip the rest of the function
    } // else, proceed to decrease counter

    // decrease second-hand counter
    secondCounter--;
    // if second-hand < 0, decrease minute-hand + reset second-hand to 59
    if (secondCounter < 0) {
        minuteCounter--;
        secondCounter = 59;
    }
    // show current count
    time = `${String(minuteCounter).padStart(2, '0')}:${String(secondCounter).padStart(2, '0')}`;
    timerDisplay.innerHTML = time;

    // telling the server that 'hey the site is still active, don't session_unset()' cos this timer doesn't trigger any PHP scripts - PHP doesn't know the site is still active
    systemIsStillActive++;  // increase counter
    // tell server 'hey i'm still alive' every 5 mins   [300 secs = 5 mins]
    if (systemIsStillActive == 300) {
        // ping & fetch response from session_handling.php to trigger its time()
        fetch('app_config/session_handling.php?active=1');
        // reset systemIsStillActive counter
        systemIsStillActive = 0;
    }

    // when timer ends, play beep
    if (minuteCounter === 0 && secondCounter === 0) {
        if (isPomodoro) {
            pomodoroRingtone();
            // change flag mode
            isPomodoro = false;
            // if shortBreakCount = 4, move to long break
            if (shortBreakCount === 4) {
                isShortBreak = false;
                isLongBreak = true;
                // reset shortBreakCount
                shortBreakCount = 0;
                // else, default to short break
            } else {
                isShortBreak = true;
                isLongBreak = false;
                // increase shortBreakCount
                shortBreakCount++;
            }

        } else if (isShortBreak) {
            shortlongBreakRIngtone();
            // change flag mode
            isPomodoro = true;
            isShortBreak = false;
            isLongBreak = false;
        } else if (isLongBreak) {
            shortlongBreakRIngtone();
            // change flag mode
            isPomodoro = true;
            isShortBreak = false;
            isLongBreak = false;
        }

        // clearing interval setting
        clearInterval(interval);

        // few seconds pause before automatcally triggering
    }
}




// RINGTONES
function pomodoroRingtone() {
    const audio = new Audio('resources/super_mario_bros_level_up.wav');
    audio.volume = .3;
    audio.play();
}

// short break + long break's shared ringtone
function shortlongBreakRIngtone() {
    const audio = new Audio('resources/minecraft_level_up_sound.wav');
    audio.volume = .3;
    audio.play();
}



// session variable file response
function sessionTimerSetResponse(data) {
    if (data.status == 'success') {
        // debug
        console.log('minutehand: ', data.minutehand, ', secondhand: ', data.secondhand);
        // concatenate minute + second values
        time = `${String(data.minutehand).padStart(2, '0')}:${String(data.secondhand).padStart(2, '0')}`;
        // clear timer display div first
        timerDisplay.innerHTML = '';
        // fill in new timer value
        timerDisplay.innerHTML = time;


        // VISIBILITY OF SYSTEM STATUS (usability heuristics)
        message.innerHTML = data.message;      
        message.style.color = 'green';
        message.style.backgroundColor = '#9CFFB0';          // message declared in 'index.php'
        message.style.visibility = 'visible';
        // hiding message after 3s
        setTimeout(() => {
            message.style.visibility = 'hidden';
        }, 3000);
    }
}



// SETTING CUSTOM TIME
document.getElementById('setCustomTimeBtn').addEventListener('click', () => {
    // debug
    console.log('set custom time clicked');

    // set custom time only if the minutes and/or seconds fields contain text
    if ((customMinuteInput && !customMinuteInput.value == '') || (customSecondInput && !customSecondInput.value == '')) {
        // if pomodoro flag true
        if (isPomodoro) {
            // minute field
            if (customMinuteInput.value == '') {
                minuteCounter = 0;   // set default 0 if minute field empty
            } else {
                minuteCounter = customMinuteInput.value;   // else set custom value to minute counter
            }

            // second field
            if (customSecondInput.value == '') {
                secondCounter = 0;  // set default 0 if second field empty
            } else {
                secondCounter = customSecondInput.value;  // else set custom value to second counter
            }


            // save custom value to session
            fetch('http:/Aiya Just Do It (FYP retake)/app_config/session_pomodoro_value_set.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({pomodoro_minutes: minuteCounter, pomodoro_seconds: secondCounter})
            })
            .then(response => response.json())
            .then(data => {
                sessionTimerSetResponse(data);
            })
            

            // if short break flag true
        } else if (isShortBreak) {
            // minute field
            if (customMinuteInput.value == '') {
                minuteCounter = 0;   // set default 0 if minute field empty
            } else {
                minuteCounter = customMinuteInput.value;   // else set custom value to minute counter
            }

            // second field
            if (customSecondInput.value == '') {
                secondCounter = 0;  // set default 0 if second field empty
            } else {
                secondCounter = customSecondInput.value;  // else set custom value to second counter
            }

            // save custom value to session
            fetch('http:/Aiya Just Do It (FYP retake)/app_config/session_pomodoro_value_set.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({short_break_minutes: minuteCounter, short_break_seconds: secondCounter})
            })
            .then(response => response.json())
            .then(data => {
                sessionTimerSetResponse(data);
            })

        } else if (isLongBreak) {
            // minute field
            if (customMinuteInput.value == '') {
                minuteCounter = 0;   // set default 0 if minute field empty
            } else {
                minuteCounter = customMinuteInput.value;   // else set custom value to minute counter
            }

            // second field
            if (customSecondInput.value == '') {
                secondCounter = 0;  // set default 0 if second field empty
            } else {
                secondCounter = customSecondInput.value;  // else set custom value to second counter
            }

            // save custom value to session
            fetch('http:/Aiya Just Do It (FYP retake)/app_config/session_pomodoro_value_set.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({long_break_minutes: minuteCounter, long_break_seconds: secondCounter})
            })
            .then(response => response.json())
            .then(data => {
                sessionTimerSetResponse(data);
            })
        }
    }
})



// click listener on the MODE BUTTONS
document.addEventListener('click', function(event) {
    const pomBtnClicked = pomodorotimerMode.contains(event.target);   // 'pomodorotimerMode' declared in index.php
    const shortbreakBtnClicked = shortbreaktimerMode.contains(event.target);   // 'shortbreaktimerMode' declared in index.php
    const longbreakBtnClicked = longbreaktimerMode.contains(event.target);   // 'longbreaktimerMode' declared in index.php

    // fail-safe mechanism: if none of these buttons are clicked, do not execute function any further
    // const pomodoroModesClicked = pomBtnClicked || shortbreakBtnClicked || longbreakBtnClicked;
    if (!(pomBtnClicked || shortbreakBtnClicked || longbreakBtnClicked)) {
        return;   // exit function if none of these buttons clicked
    }


    // clearing all active styles applied first
    pomodorotimerMode.classList.remove('active');
    shortbreaktimerMode.classList.remove('active');
    longbreaktimerMode.classList.remove('active');

    timercircle.classList.remove('pomodoro', 'short-break', 'long-break');



    // setting mode flags according to button click
    if (pomBtnClicked) {
        isPomodoro = true;  // activating pomodoro flag (declared in index.php)
        
        // deactivating the other 2 flags
        isShortBreak = false;
        isLongBreak = false;

    } else if (shortbreakBtnClicked) {
        
        isShortBreak = true;  // activating short break flag (declared in index.php)

        // deactivating the other 2 flags
        isPomodoro = false;
        isLongBreak = false;

    } else if (longbreakBtnClicked) {
        isLongBreak = true;  // activating long break flag (declared in index.php)

        // deactivating the other 2 flags
        isPomodoro = false;
        isShortBreak = false;

    }


    // apply styles according to the flags
    if (isPomodoro && !isShortBreak && !isLongBreak) {
        // apply pomodoro active styles
        pomodorotimerMode.classList.add('active');   // 'pomodorotimerMode' declared in index.php
        timercircle.classList.add('pomodoro');   // 'timercircle' declared in index.php
    } else if (isShortBreak && !isPomodoro && !isLongBreak) {
        // apply pomodoro active styles
        shortbreaktimerMode.classList.add('active');   // 'pomodorotimerMode' declared in index.php
        timercircle.classList.add('short-break');   // 'timercircle' declared in index.php
    } else if (isLongBreak && !isPomodoro && !isShortBreak) {
        // apply pomodoro active styles
        longbreaktimerMode.classList.add('active');   // 'pomodorotimerMode' declared in index.php
        timercircle.classList.add('long-break');   // 'timercircle' declared in index.php
    }

    setDefaultTimerModeInterval();
})


// click listener for the timer circle
timercircle.addEventListener('click', () => {
    // debug
    // console.log('')


    // pausing timer when interval is set + when timerPause = false
    if (interval && !timerPause) {
        timerPause = true;
        clearInterval(interval);   // stop timer countdown
        interval = null;   // mark as no active interval (to skip this if block the next time timercircle is clicked)
    } else {
        timerPause = false;
        if (!interval) {
            interval = setInterval(timer, 1000);
        }
    }
})