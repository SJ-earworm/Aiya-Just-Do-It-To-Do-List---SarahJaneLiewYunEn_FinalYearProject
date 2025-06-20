<?php
    $timerRunActivePing = isset($_GET['active']) ?? '';
    // check if session has already been started, if not
    // start new session
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
        
        // setting default pomodoro timer values
        // only set the default pomodoro values when session loaded for the first time
        if (!isset($_SESSION['POM_MINS']) || !isset($_SESSION['POM_SECS'])) {
            // pomodoro focus
            $_SESSION['POM_MINS'] = 25;
            $_SESSION['POM_SECS'] = 0;
        } else if (!isset($_SESSION['SHORT_BR_MINS']) || !isset($_SESSION['SHORT_BR_SECS'])) {
            // short break
            $_SESSION['SHORT_BR_MINS'] = 5;
            $_SESSION['SHORT_BR_SECS'] = 0;
        } else if (!isset($_SESSION['LONG_BR_MINS']) || !isset($_SESSION['LONG_BR_SECS'])) {
            // long break
            $_SESSION['LONG_BR_MINS'] = 15;
            $_SESSION['LONG_BR_SECS'] = 0;
        }
    }


    // setting timeout after 5 minutes inactivity for demo purposes --> (in real-world scenario, would be 5 hours)
    $timeout = 300;   // 300 secs = 5mins
    $timeSinceLastActivity = time() - $_SESSION['LAST_ACTIVITY'];   // time() gives the current time when the script is executed (a.k.a. activity)

    if (isset($_SESSION['LAST_ACTIVITY']) && $timeSinceLastActivity > $timeout) {
        // clear session data - clear the timer values set to session
        session_unset();
        // close session so that we get a clean session reset the next time the site launches
        session_destroy();
    }

    // the LAST_ACTIVITY detected & recorded will be here
    $_SESSION['LAST_ACTIVITY'] = time();   // time() gives the current time when the script is executed (a.k.a. activity)
    

    // if this file is being pinged by the pomodoro timers
    if (isset($_GET['active']) && $_GET['active'] === '1') {   // FYI integers sent thru $_GET[] will become strings
        // getting response from the PHP server just so that PHP knows that the page isn't idle - keeps it alive
        http_response_code(204);
        // code 204: server successfully processed request, and there's no content to send back

    }
?>