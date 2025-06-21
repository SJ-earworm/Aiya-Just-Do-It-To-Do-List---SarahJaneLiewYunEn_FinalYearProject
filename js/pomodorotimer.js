let minuteCount = 0;  // the minutehand that was set
let secondCount = 0;  // the secondhand that was set
let totalDuration = 0;
let timerStartStamp = 0;  // timestamp when timer starts
// let timestampOnPause = 0;
let remaining = 0;
let currentTimeDisp;  // formatted time display
let shortBreakCount = 0;
let timerIsRunning = false;
let timerPause = false;
let timerReset = true;
let timerHasEnded = false;
let handleTimerTimeout;
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
    minuteCount = setMinutes;  // from function parameter 1
    secondCount = setSeconds;  // from function parameter 2
    currentTimeDisp = `${String(minuteCount).padStart(2, '0')}:${String(secondCount).padStart(2, '0')}`;
    timerDisplay.innerHTML = currentTimeDisp;

    // debug
    console.log('setTimer() minute: ', minuteCount, ' , seconds: ', secondCount);
}

// function to prep time values for system-time-based timer + trigger timer run
function startTimer() {
    // debug
    console.log('startTimer() minute: ', minuteCount, ' , seconds: ', secondCount);

    totalDuration = (minuteCount * 60 + secondCount) * 1000;   // turning total time (minute + seconds) into milliseconds to be read by the Date function/object
    timerStartStamp = Date.now();   // getting the start time's millisecond timestamp from real-time clock
                                    // using Date.now() instead of the earlier setInterval() because Date.now() provides the correct running time even when tab inactive

    // handling timer end sequence using setTimeout()
    // guarantees that handleTimerEnd() truly fires even when tab minimised/inactive  -> requestAnimationFrame() only triggers when tab is active
    handleTimerTimeout = setTimeout(() => {
        handleTimerEnd();
    }, totalDuration);
    // the timer function itself
    timer();
}

// the timer run
function timer() {
    // [OLD CODE]
    // if timercircle clicked to pause
    // if (timerPause) {
    //     return;  // skip the rest of the function
    // } // else, proceed to decrease counter

    // decrease second-hand count
    // secondCounter--;
    // if second-hand < 0, decrease minute-hand + reset second-hand to 59
    // if (secondCounter < 0) {
    //     minuteCounter--;
    //     secondCounter = 59;
    // }

    timerIsRunning = true;  // 'timer is currently running', referred by timer circle reset

    const timeNow = Date.now();                 // grab current runtime's real-time clock time
    const elapsed = timeNow - timerStartStamp;  // runtime elapsed
    remaining = totalDuration - elapsed;  // manually deducing the remaining timer time

    // if timer count is down to 0 or < 0
    if (remaining <= 0) {
        handleTimerEnd();
        return;
    }

    minuteCount = Math.floor(remaining / 60000);  // converting deduced remaining time to minutes   [1 min = 60000 milliseconds]
    secondCount = Math.floor((remaining % 60000) / 1000);  // convertind deduced remaining time to seconds   [1 sec = 1000 milliseconds]


    // show current count
    currentTimeDisp = `${String(minuteCount).padStart(2, '0')}:${String(secondCount).padStart(2, '0')}`;
    timerDisplay.innerHTML = currentTimeDisp;

    // telling the server that 'hey the site is still active, don't session_unset()' cos this timer doesn't trigger any PHP scripts - PHP doesn't know the site is still active
    systemIsStillActive++;  // increase counter
    // tell server 'hey i'm still alive' every 5 mins   [300 secs = 5 mins]
    if (systemIsStillActive == 300) {
        // ping & fetch response from session_handling.php to trigger its time()
        fetch('app_config/session_handling.php?active=1');
        // reset systemIsStillActive counter
        systemIsStillActive = 0;
    }

    // STARTS TIMER + KEEPS TIMER RUNNING
    // the mechanism that acts like a recurring timer [requestAnimationFrame() runs every 16ms - used in animation/UI updates]
    timerRunObject = requestAnimationFrame(timer);  // call the timer() function again
}


function pauseTimer() {
    cancelAnimationFrame(timerRunObject);  // stop 'recurring timer'
    clearTimeout(handleTimerTimeout);      // clear timeout in startTimer()
    timerPause = true;  // 'yes we're on pause mode' (for circle button)
    timerIsRunning = false;  // 'for reset timer circle to refer to'
}

function resumeTimer() {
    timerPause = false;             // 'not on pause mode anymore' (for circle button)
    timerStartStamp = Date.now();   // replacing the outdated real-time clock timestamp w/ the current real-time clock stamp
    // totalDuration = remaining;      // setting the remaining time as the current total duration     (so that the calculation is mathematically correct in totalDuration - elapsed)
    startTimer();                        // call timer() function to resume counter
}

function handleTimerEnd() {
    // WHEN TIMER ENDS
    // if (minuteCount <= 0 && secondCount <= 0) {     // needs <= 0 because requestAnimationFrame() pauses when tab inactive/minimised  -> might miss the rendering of '0' & jump straight to negative when tab active again
    
    // to prevent double execution [calling from both setTimeout() & another from timer()]
    if (timerHasEnded)
        return;

    timerIsRunning = false;   // refered by reset timer circle
    timerHasEnded = true;

    if (isPomodoro) {
        // play finisher ringtone
        pomodoroRingtone();
        // change flag mode
        isPomodoro = false;
        // if shortBreakCount = 4, move to long break
        if (shortBreakCount === 4) {
            isShortBreak = false;
            isLongBreak = true;
            // apply long break style + fill respective timer values
            applyStyle();
            // reset shortBreakCount
            shortBreakCount = 0;
            // else, default to short break
        } else {
            isShortBreak = true;
            isLongBreak = false;
            // apply short break style + fill respective timer values
            applyStyle();
            // increase shortBreakCount
            shortBreakCount++;
        }

        // debug
        console.log('shortBreakCount: ', shortBreakCount);

    } else if (isShortBreak) {
        // play finisher ringtone
        shortlongBreakRIngtone();
        // change flag mode
        isPomodoro = true;
        isShortBreak = false;
        isLongBreak = false;
        // apply short break style + fill respective timer values
        applyStyle();

    } else if (isLongBreak) {
        // play finisher ringtone
        shortlongBreakRIngtone();
        // change flag mode
        isPomodoro = true;
        isShortBreak = false;
        isLongBreak = false;
        // apply pomodoro style + fill respective timer values
        applyStyle();
    }

        // clearing interval setting
        // clearInterval(interval);

    // end timer loop
    cancelAnimationFrame(timerRunObject);   // clear UI loop    
    clearTimeout(handleTimerTimeout);       // clear timeout set in startTimer()
    timerReset = true;
    // }
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
        currentTimeDisp = `${String(data.minutehand).padStart(2, '0')}:${String(data.secondhand).padStart(2, '0')}`;
        // clear timer display div first
        timerDisplay.innerHTML = '';
        // fill in new timer value
        timerDisplay.innerHTML = currentTimeDisp;


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



// applying styles according to flags
function applyStyle() {
    // clearing all active styles applied first
    pomodorotimerMode.classList.remove('active');
    shortbreaktimerMode.classList.remove('active');
    longbreaktimerMode.classList.remove('active');

    timercircle.classList.remove('pomodoro', 'short-break', 'long-break');


    if (isPomodoro && !isShortBreak && !isLongBreak) {
        // apply pomodoro active styles
        pomodorotimerMode.classList.add('active');   // 'pomodorotimerMode' declared in index.php
        timercircle.classList.add('pomodoro');   // 'timercircle' declared in index.php
        setDefaultTimerModeInterval()

    } else if (isShortBreak && !isPomodoro && !isLongBreak) {
        // apply pomodoro active styles
        shortbreaktimerMode.classList.add('active');   // 'pomodorotimerMode' declared in index.php
        timercircle.classList.add('short-break');   // 'timercircle' declared in index.php
        setDefaultTimerModeInterval()

    } else if (isLongBreak && !isPomodoro && !isShortBreak) {
        // apply pomodoro active styles
        longbreaktimerMode.classList.add('active');   // 'pomodorotimerMode' declared in index.php
        timercircle.classList.add('long-break');   // 'timercircle' declared in index.php
        setDefaultTimerModeInterval()
    }
}



// TIMER SETTINGS
// open custom time box
document.addEventListener('click', function (event) {
    // elements
    const customtimerpane = document.getElementById('customTimerPane');
    const customtimercontent = document.getElementById('customTimerBoxCont');
    // checking applied styles
    // const customtimerContDisp = window.getComputedStyle(customtimercontent).getPropertyValue('display');
    // clicks
    const customtimerpaneClicked = customtimerpane.contains(event.target);

    // expand custom timer details
    if (customtimerpaneClicked && !(customtimerpane.classList.contains('expanded'))) {
        // expanding box
        customtimerpane.classList.add('expanded');
        customtimercontent.classList.add('expanded');;

        // autofill minutes-seconds input fields
        if (isPomodoro && !isShortBreak && !isLongBreak){
            // retrieve timer values set in session variables
            fetch('http:/Aiya Just Do It (FYP retake)/app_config/session_pomodoro_value_set.php?pommode=pomodoro', {
                method: 'GET'
            })
            .then(response => response.json())
            .then(data => {
                // fill minutes-seconds input fields
                customMinuteInput.value = Number(data.minutehand);
                customSecondInput.value = Number(data.secondhand);
            })

        } else if (isShortBreak && !isPomodoro && !isLongBreak) {
            // retrieve timer values set in session variables
            fetch('http:/Aiya Just Do It (FYP retake)/app_config/session_pomodoro_value_set.php?pommode=short', {
                method: 'GET'
            })
            .then(response => response.json())
            .then(data => {
                // fill minutes-seconds input fields
                customMinuteInput.value = Number(data.minutehand);
                customSecondInput.value = Number(data.secondhand);
            })
            
        } else if (isLongBreak && !isPomodoro && !isShortBreak) {
            // retrieve timer values set in session variables
            fetch('http:/Aiya Just Do It (FYP retake)/app_config/session_pomodoro_value_set.php?pommode=long', {
                method: 'GET'
            })
            .then(response => response.json())
            .then(data => {
                // fill minutes-seconds input fields
                customMinuteInput.value = Number(data.minutehand);
                customSecondInput.value = Number(data.secondhand);
            })
        }



        // close if clicked ouside of the pane
    } else if (!customtimerpaneClicked && customtimerpane.classList.contains('expanded')) {
        customtimerpane.classList.remove('expanded');
        customtimercontent.classList.remove('expanded');
    }
})



// SETTING CUSTOM TIME
document.getElementById('setCustomTimeBtn').addEventListener('click', () => {
    // set custom time only if the minutes and/or seconds fields contain text
    if ((customMinuteInput && !customMinuteInput.value == '') || (customSecondInput && !customSecondInput.value == '')) {
        // if pomodoro flag true
        if (isPomodoro) {
            // minute field
            if (customMinuteInput.value == '') {
                minuteCount = 0;   // set default 0 if minute field empty
            } else {
                minuteCount = Number(customMinuteInput.value);   // else set custom value to minute counter
            }

            // second field
            if (customSecondInput.value == '') {
                secondCount = 0;  // set default 0 if second field empty
            } else {
                secondCount = Number(customSecondInput.value);  // else set custom value to second counter
            }


            // save custom value to session
            fetch('http:/Aiya Just Do It (FYP retake)/app_config/session_pomodoro_value_set.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({pomodoro_minutes: minuteCount, pomodoro_seconds: secondCount})
            })
            .then(response => response.json())
            .then(data => {
                sessionTimerSetResponse(data);
            })
            

            // if short break flag true
        } else if (isShortBreak) {
            // minute field
            if (customMinuteInput.value == '') {
                minuteCount = 0;   // set default 0 if minute field empty
            } else {
                minuteCount = Number(customMinuteInput.value);   // else set custom value to minute counter
            }

            // second field
            if (customSecondInput.value == '') {
                secondCount = 0;  // set default 0 if second field empty
            } else {
                secondCount = Number(customSecondInput.value);  // else set custom value to second counter
            }

            // save custom value to session
            fetch('http:/Aiya Just Do It (FYP retake)/app_config/session_pomodoro_value_set.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({short_break_minutes: minuteCount, short_break_seconds: secondCount})
            })
            .then(response => response.json())
            .then(data => {
                sessionTimerSetResponse(data);
            })

        } else if (isLongBreak) {
            // minute field
            if (customMinuteInput.value == '') {
                minuteCount = 0;   // set default 0 if minute field empty
            } else {
                minuteCount = Number(customMinuteInput.value);   // else set custom value to minute counter
            }

            // second field
            if (customSecondInput.value == '') {
                secondCount = 0;  // set default 0 if second field empty
            } else {
                secondCount = Number(customSecondInput.value);  // else set custom value to second counter
            }

            // save custom value to session
            fetch('http:/Aiya Just Do It (FYP retake)/app_config/session_pomodoro_value_set.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({long_break_minutes: minuteCount, long_break_seconds: secondCount})
            })
            .then(response => response.json())
            .then(data => {
                sessionTimerSetResponse(data);
            })
        }
    }
})



// RESET CUSTOM TIME WITHIN CUSTOM TIME BOX
document.getElementById('resetCustomTimeBoxBtn').addEventListener('click', () => {
    if (isPomodoro) {
        customMinuteInput.value = 25;
        customSecondInput.value = 0;

    } else if (isShortBreak) {
        customMinuteInput.value = 5;
        customSecondInput.value = 0;

    } else if (isLongBreak) {
        customMinuteInput.value = 15;
        customSecondInput.value = 0;
    }
})



// RESET THE TIMER CIRCLE TIMER
document.getElementById('resetTimerCircleBtn').addEventListener('click', () => {
    // if timer is still running
    if (timerIsRunning) {
        cancelAnimationFrame(timerRunObject);   // clear 'manual recurring timer'
        clearTimeout(handleTimerTimeout);       // clear timeout in startTimer()
    }
    setDefaultTimerModeInterval();
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
    applyStyle();

    setDefaultTimerModeInterval();
})


// click listener for the timer circle
timercircle.addEventListener('click', () => {
    // if circle clicked & pause flag is false, pause timer
    if (!timerPause && !timerReset) {
        // pause timer
        pauseTimer();
        // set flag
        timerPause = true;

        // else it's start/resume timer
    } else if (timerPause && !timerReset) {
        // resume the timer
        resumeTimer();

    } else if (timerReset) {
        // start timer from scratch
        startTimer();
        timerReset = false;
        timerHasEnded = false;
    }

    // [OLD CODE]
    // pausing timer when interval is set + when timerPause = false
    // if (interval && !timerPause) {
    //     timerPause = true;
    //     clearInterval(interval);   // stop interval run - stop timer countdown
    //     interval = null;   // mark as no active interval (to skip this if block the next time timercircle is clicked)
    // } else {
    //     timerPause = false;
    //     if (!interval) {
    //         interval = setInterval(timer, 1000);
    //     }
    // }
})