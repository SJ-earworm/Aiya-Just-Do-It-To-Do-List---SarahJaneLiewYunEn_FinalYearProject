<?php
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
        $taskID = filter_var($input['taskID'], FILTER_SANITIZE_NUMBER_INT);
        $taskname = $input['taskName'];
        $taskdescription = $input['taskDescription'];
        $date = $input['reminderDate']; // date
        $time = $input['reminderTime']; // time
        $priority = filter_var($input['taskPriority'], FILTER_SANITIZE_NUMBER_INT); // priority
        $difficulty = filter_var($input['taskDifficulty'], FILTER_SANITIZE_NUMBER_INT); // difficulty
        $progress = filter_var($input['taskProgress'], FILTER_SANITIZE_NUMBER_INT); // progress status

        // sanitised date & time
        $sanitisedDate = preg_replace("/[^0-9:]/", "", $date);
        $sanitisedTime = preg_replace("/[^0-9:]/", "", $time);

        // Inserting into Task table
        try {
            $query = "UPDATE Task
                        SET 
                            task_name = ?,
                            task_description = ?,
                            reminder_date = ?,
                            reminder_time = ?,
                            priority = ?,
                            difficulty = ?,
                            prog_status = ?
                        WHERE task_ID = ?";
            $stmt = $con->prepare($query);
            $stmt->bind_param("ssssiiii", $taskname, $taskdescription, $sanitisedDate, $sanitisedTime, $priority, $difficulty, $progress, $taskID);
            if (!$stmt->execute()) {
                // error message
                $response = [
                    'status' => 'fail',
                    'message' => 'Error updating task'
                ];
                // sending back to frontend & ending the process
                echo json_encode($response);
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
                'message' => 'Error updating task, please try again later.',
                'log' => 'ADD TASK DB | Error: ' . $e->getMessage()
            ];
            // sending back to frontend & ending the process
            echo json_encode($response);
            exit;
        }
        
    }
?>