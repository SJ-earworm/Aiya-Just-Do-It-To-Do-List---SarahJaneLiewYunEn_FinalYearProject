<?php
    require('dbConnect.php');

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        // spcifying header to configure response to frontend as JSON data
        header('Content-Type: application/json');

        // extracting checkbox data sent from frontend
        $frontend_data = json_decode(file_get_contents('php://input'), true);   // extracting key-value pairs sent over from formData
                                                                                // the 'true' parameter: controls the type of PHP data structure JSON objects are converted into. 'true' allows us to access the json data using associative arrays e.g. $frontend_data['task_ID']
        $taskID = $frontend_data['task_ID'];
        $is_completed = $frontend_data['complete'];

        // if task is is complete, mark as complete. else mark as incomplete
        if ($is_completed == true) {
            try {
                // update 'prog_status' to 2 (completed) 
                $query = "UPDATE Task SET prog_status = ? WHERE task_ID = ?";
                // prepared statements
                $stmt = $con->prepare($query);
                $stmt->bind_param("ii", 2, $taskID);
                
                
                if (!$stmt->execute()) {
                    // error message
                    $response = [
                        'status' => 'fail',
                        'message' => 'Could not make the changes. Please try again later.'
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
                // error
            }
        } else {
            // sequence
        }
    }
?>