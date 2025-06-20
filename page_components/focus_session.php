<div class="focus-session-view" id="focussessionBigView">
    <!-- timer modes buttons -->
    <div class="pomodoro-modes-btns">
        <div class="pom-btn" id="focusModeBtn">Pomodoro</div>
        <div class="shortbreak-btn" id="shortBreakModeBtn">Short Break</div>
        <div class="longbreak-btn" id="longBreakModeBtn">Long Break</div>
    </div>
    <!-- timer cicle/start button -->
    <div class="pomodoro-timer-circle" id="timerCircle">
        <div class="timer-preview" id="timerPreview"></div>
        <div class="start-timer-btn">Start</div>
    </div>
    <!-- custom timer setting -->
    <div class="custom-timer-box">
        <span style="margin: 5px 0; font-weight: 600;">Set custom time</span>
        <div class="custom-time-wrap">
            <span style="margin-right: 5px;">minutes</span>
            <input class="minute-second-hand-box" id="customMinute" />
            <div style="margin: 0 2px;">:</div>
            <input class="minute-second-hand-box" id="customSecond" />
            <span style="margin-left: 5px;">seconds</span>
        </div>
        <button id="setCustomTimeBtn">set</button>
    </div>
</div>