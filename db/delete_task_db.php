<?php
    require('dbConnect.php');

    // specifying header to configure response to frontend as JSON data
    header("Content-Type: application/json");
    // receiving data feom frontend
    $data = json_decode(file_get_contents('php://input'), true);        // extracting key-value pairs sent over from formData
                                                                        // the 'true' parameter: controls the type of PHP data structure JSON objects are converted into. 'true' allows us to access the json data using associative arrays e.g. $frontend_data['task_ID']

    if ($_SERVER['REQUEST_METHOD'] == 'POST' && $data['_method'] === 'DELETE') {

        // retrieving task ID from frontend
        $taskID = $data['taskID'];
        // reponse array
        $response = [];

        // query
        $query = "DELETE FROM Task WHERE task_ID = ?";
        // prepared statements
        $stmt = $con->prepare($query);
        $stmt->bind_param("i", $taskID);
        
        try {
            if (!$stmt->execute()) {
                // error message
                $response = [
                    'status' => 'fail',
                    'message' => 'Error deleting task'
                ];

                echo json_encode($response);
                exit;
            } else {
                // success message
                $response = [
                    'status' => 'success',
                    'message' => 'Task deleted'
                ];

                echo json_encode($response);
                exit;
            }

            // close statement
            $stmt->close();

        } catch (mysqli_sql_exception $e) {
            // error message
            $response = [
                'status' => 'fail',
                'message' => 'Could not delete task',
                'log' => 'DELETE TASK DB | Error: ' . $e->getMessage()
            ];
            echo json_encode($response);
            exit;
        }
    }
?>