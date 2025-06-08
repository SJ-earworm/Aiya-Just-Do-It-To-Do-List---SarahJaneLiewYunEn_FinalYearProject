<?php
    require('dbConnect.php');

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        // spcifying header to configure response to frontend as JSON data
        header('Content-Type: application/json');

        // extracting checkbox data sent from frontend
        $frontend_data = json_decode(file_get_contents('php://input'), true);   // extracting key-value pairs sent over from formData
                                                                                // the 'true' parameter: controls the type of PHP data structure JSON objects are converted into. 'true' allows us to access the json data using associative arrays e.g. $frontend_data['task_ID']
        $taskID = $frontend_data['taskID'];
        $is_completed = $frontend_data['complete'];

        // if task is is complete, mark as complete. else mark as incomplete
        // marking task as complete
        if ($is_completed == true) {
            try {
                // update 'prog_status' to 2 (completed) 
                // assigning value to variable as bind_param() only accepts variables passed by reference, not values
                $progress_status = 2;

                // query & prepared statements to interact with SQL
                $query = "UPDATE Task SET prog_status = ? WHERE task_ID = ?";
                $stmt = $con->prepare($query);
                $stmt->bind_param("ii", $progress_status, $taskID);
                
                
                if (!$stmt->execute()) {
                    // error message
                    $response = [
                        'status' => 'fail',
                        'message' => 'Could not reach database. Please try again later.'
                    ];
                    // sending response to frontend & ending the process
                    echo json_encode($response);
                    exit;
                } else {
                    $response = [
                        'status' => 'success'
                    ];
                    // sending response to frontend & ending the process
                    echo json_encode($response);
                    exit;
                }
            } catch (mysqli_sql_exception $e) {
                // error message
                $response = [
                    'status' => 'fail',
                    'message' => 'Could not make the changes. Please try again later.',
                    'log' => 'TASK COMPLETE STATUS DB | Error: ' . $e->getMessage()
                ];
            }

        } else {
            // marking task as INCOMPLETE
            try {
                // update 'prog_status' to 0 (incomplete) 
                // assigning value to variable as bind_param() only accepts variables passed by reference, not values
                $progress_status = 0;

                // query & prepared statements to interact with SQL
                $query = "UPDATE Task SET prog_status = ? WHERE task_ID = ?";
                $stmt = $con->prepare($query);
                $stmt->bind_param("ii", $progress_status, $taskID);
                
                
                if (!$stmt->execute()) {
                    // error message
                    $response = [
                        'status' => 'fail',
                        'message' => 'Could not reach database. Please try again later.'
                    ];
                    // sending response to frontend & ending the process
                    echo json_encode($response);
                    exit;
                } else {
                    $response = [
                        'status' => 'success'
                    ];
                    // sending response to frontend & ending the process
                    echo json_encode($response);
                    exit;
                }
            } catch (mysqli_sql_exception $e) {
                // error message
                $response = [
                    'status' => 'fail',
                    'message' => 'Could not make the changes. Please try again later.',
                    'log' => 'TASK COMPLETE STATUS DB | Error: ' . $e->getMessage()
                ];
            }
        }
    }
?>