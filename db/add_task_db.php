<?php
    // error display configuation
    error_reporting(E_ALL | E_STRICT);
    ini_set('display_errors', 0);   // show errors ON THE SCREEN. 1 = on, 2 = off. TURN OFF LATER
    ini_set('display_startup_errors', 0);   // show startup errors ON THE SCREEN. TURN OFF LATER    [startup errors are rare, occurs during PHP's startup process]
    ini_set('log_errors', 'On');    // save logs to the file set below
    ini_set('error_log', 'C:/Applications/XAMPP/apache/logs/AiyaJustDoIt(FYPretake)/AiyaJustDoIt-error.log');
    error_reporting(E_ALL);   // making sure all errors are reported



    require('dbConnect.php');

    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        // specifying header to configure response to frontend as JSON data
        header("Content-Type: application/json");
        // array for response message (debug)
        $response = [];

        // retrieve user_ID here

        // retrieving user input
        $input = json_decode(file_get_contents('php://input'), true);   // extracting key-value pairs sent over from formData
                                                                        // the 'true' parameter: controls the type of PHP data structure JSON objects are converted into. 'true' allows us to access the json data using associative arrays e.g. $frontend_data['task_ID']
        $taskname = $input['taskName'];                     // not sanitizing these as it may save needed special characters e.g. >," or 'as their HTML entities (e.g. &#60;).
        $taskdescription = $input['taskDescription'];       // will only rely on character escaping when retrieving tasks for display
        $date = $input['reminderDate']; // date
        $time = $input['reminderTime']; // time
        $priority = filter_var($input['taskPriority'], FILTER_SANITIZE_NUMBER_INT); // priority
        $difficulty = filter_var($input['taskDifficulty'], FILTER_SANITIZE_NUMBER_INT); // difficulty
        $progress = filter_var($input['taskProgress'], FILTER_SANITIZE_NUMBER_INT); // progress status

        // sanitised date & time
        $sanitisedDate = preg_replace("/[^0-9:]/", "", $date);  // replacing all characters that aren't digits or ':' with ''
        $sanitisedTime = preg_replace("/[^0-9:]/", "", $time);  // replacing all characters that aren't digits or ':' with ''

        // validation for task name, if empty, make sure user doens't leave it empty
        if ($taskname == '' || $taskname == ' ') {      // ' ' = whitespace only inputs
            $response = [
                'status' => 'invalid',
                'message' => 'Please fill in the task name'
            ];
            // sending message to frontend
            echo json_encode($response);
            exit;

            // if task name is filled, proceed with db insertion sequence
        } else {
            // Inserting into Task table
            try {
                $query = "INSERT INTO Task (task_name, task_description, reminder_date, reminder_time, priority, difficulty, prog_status)
                            VALUES (?,?,?,?,?,?,?)";
                $stmt = $con->prepare($query);
                $stmt->bind_param("ssssiii", $taskname, $taskdescription, $sanitisedDate, $sanitisedTime, $priority, $difficulty, $progress);
                if (!$stmt->execute()) {
                    // error message
                    $response = [
                        'status' => 'fail',
                        'message' => 'Error inserting new task'
                    ];
                    // sending back to frontend & ending the process
                    echo json_encode($response);

                    // log error to error log file
                    error_log("ADD TASK DB | Could not execute DELETE statement. Error #{$stmt->errno}: {$stmt->error}");
                    exit;
                } else {
                    // success response to frontend
                    $response = ['status' => 'success'];
                    // sending back to frontend & ending the process
                    echo json_encode($response);
                    exit;
                }

                // close statement
                $stmt->close();
            } catch (mysqli_sql_exception $e) {
                $response = [
                    'status' => 'fail',
                    'message' => 'Error creating new task, please try again later.'
                ];
                // sending back to frontend & ending the process
                echo json_encode($response);

                // logging error
                error_log("ADD TASK DB | Error: {$e->getMessage()}");
                exit;
            }
        }
        
    }
?>