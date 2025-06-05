<?php
    require('dbConnect.php');

    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        // spcifying header to configure response to frontend as JSON data
        header("Content-Type: application/json");
        // array for response message (debug)
        $response = [];

        // retrieve user_ID here

        // retrieving user input
        $input = json_decode(file_get_contents('php://input'), true);   // extracting key-value pairs sent over from formData
                                                                        // the 'true' parameter: controls the type of PHP data structure JSON objects are converted into. 'true' allows us to access the json data using associative arrays e.g. $frontend_data['task_ID']
        $taskname = $input['taskName'];
        $taskdescription = $input['taskDescription'];
        $date = $input['reminderDate']; // date
        $time = $input['reminderTime']; // time
        $priority = $input['taskPriority']; // priority
        $difficulty = $input['taskDifficulty']; // difficulty
        // maybe no need progress status, cos by default it should set as incomplete

        // Inserting into Task table
        try {
            $query = "INSERT INTO Task (task_name, task_description, reminder_date, reminder_time, priority, difficulty)
                        VALUES (?,?,?,?,?,?)";
            $stmt = $con->prepare($query);
            $stmt->bind_param("ssssii", $taskname, $taskdescription, $date, $time, $priority, $difficulty);
            if (!$stmt->execute()) {
                // error message
                $response = [
                    'status' => 'fail',
                    'message' => 'Error inserting new task'
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
                'message' => 'Error creating new task, please try again later.',
                'log' => 'ADD TASK DB | Error: ' . $e->getMessage()
            ];
            // sending back to frontend & ending the process
            echo json_encode($response);
            exit;
        }
        
    }
?>