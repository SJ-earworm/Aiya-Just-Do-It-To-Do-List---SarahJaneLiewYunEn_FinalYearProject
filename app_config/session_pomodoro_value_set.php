<?php
    // this file still needs to 'session_start()' because it's not detected as 'inherited' from session_handling.php when being accessed by an AJAX fetch() request
    require('session_handling.php');
    // SETTING TIMER VALUES TO SESSION
    $timerdata = json_decode(file_get_contents('php://input'), true);   // extracting key-value pairs sent over from formData
                                                                        // the 'true' parameter: controls the type of PHP data structure JSON objects are converted into. 'true' allows us to access the json data using associative arrays e.g. $frontend_data['task_ID']

    $pomMinsInput = filter_var($timerdata['pomodoro_minutes'] ?? '', FILTER_SANITIZE_NUMBER_INT);
    $pomSecsInput = filter_var($timerdata['pomodoro_seconds'] ?? '', FILTER_SANITIZE_NUMBER_INT);
    $shortBrMinsInput = filter_var($timerdata['short_break_minutes'] ?? '', FILTER_SANITIZE_NUMBER_INT);      // ?? is the null coalescing operator to set the right-side scenario if variable is found to be null
    $shortBrSecsInput = filter_var($timerdata['short_break_seconds'] ?? '', FILTER_SANITIZE_NUMBER_INT);
    $longBrMinsInput = filter_var($timerdata['long_break_minutes'] ?? '', FILTER_SANITIZE_NUMBER_INT);
    $longBrSecsInput = filter_var($timerdata['long_break_seconds'] ?? '', FILTER_SANITIZE_NUMBER_INT);

    if (!($pomMinsInput == '') || !($pomSecsInput == '')) {
        // pomodoro timer
        $_SESSION['POM_MINS'] = $pomMinsInput;
        $_SESSION['POM_SECS'] = $pomSecsInput;

        // response msg to frontend
        $response = [
            'status' => 'success',
            'message' => 'Custom Pomodoro Timer Set',
            'minutehand' => $_SESSION['POM_MINS'],   // sending back session variable to frontend to make sure
            'secondhand' => $_SESSION['POM_SECS']    // display is consistent with the session variables
        ];
        echo json_encode($response);
        exit();

    } else if (!($shortBrMinsInput == '') || !($shortBrSecsInput == '')) {
        // short break timer
        $_SESSION['SHORT_BR_MINS'] = $shortBrMinsInput;
        $_SESSION['SHORT_BR_SECS'] = $shortBrSecsInput;

        // response msg to frontend
        $response = [
            'status' => 'success',
            'message' => 'Custom Short Break Timer Set',
            'minutehand' => $_SESSION['SHORT_BR_MINS'],   // sending back session variable to frontend to make sure
            'secondhand' => $_SESSION['SHORT_BR_SECS']    // display is consistent with the session variables
        ];
        echo json_encode($response);
        exit();

    } else if (!($longBrMinsInput == '') || !($longBrSecsInput == '')) {
        // long break timer
        $_SESSION['LONG_BR_MINS'] = $longBrMinsInput;
        $_SESSION['LONG_BR_SECS'] = $longBrSecsInput;

        // response msg to frontend
        $response = [
            'status' => 'success',
            'message' => 'Custom Long Break Timer Set',
            'minutehand' => $_SESSION['LONG_BR_MINS'],   // sending back session variable to frontend to make sure
            'secondhand' => $_SESSION['LONG_BR_SECS']    // display is consistent with the session variables
        ];
        echo json_encode($response);
        exit();


        // if nothing was set and this file is called, send back current session variables
    } else if (isset($_GET['pommode']) && !($_GET['pommode'] === '')) {
        // retrieve GET URL parameter
        // if (isset($_GET['pommode']))  {
            $pommode = $_GET['pommode'] ?? '';   // retrieve URL value from js fetch call

            // switch case to determine which mode is requesting for the info
            switch ($pommode) {
                case 'pomodoro':
                    $response = [
                        'minutehand' => $_SESSION['POM_MINS'],
                        'secondhand' => $_SESSION['POM_SECS']
                    ];
                    break;  // once condtion is met, break out of the switch

                case 'short':
                    $response = [
                        'minutehand' => $_SESSION['SHORT_BR_MINS'],
                        'secondhand' => $_SESSION['SHORT_BR_SECS']
                    ];
                    break;  // once condtion is met, break out of the switch

                case 'long':
                    $response = [
                        'minutehand' => $_SESSION['LONG_BR_MINS'],
                        'secondhand' => $_SESSION['LONG_BR_SECS']
                    ];
                    break;  // once condtion is met, break out of the switch

                default:
                    // http_response_code(400);
                    $response = [
                        'status' => 'fail',
                        'message' => 'Missing pommode'
                    ];
                    echo json_encode($response);
            }
            // send timer values back to js frontend
            echo json_encode($response);
            exit();
        // }
    }
?>