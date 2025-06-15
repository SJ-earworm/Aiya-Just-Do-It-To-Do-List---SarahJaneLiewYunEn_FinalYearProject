<?php
    // THIS PAGE IS TO POPULATE EDIT TASK PANE WITH TASK INFO


    require('dbConnect.php');

    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        // specifying header to configure response to frontend as JSON data
        header("Content-Type: application/json");
        // array for general response encapsulating taskinfo + processStatus to the frontend
        $response = [];
        // array for task info
        $taskinfo = [];

        // retrieve user_ID here

        // retrieving task_ID from header
        // what is '??' --->  PHP 7 feature: if operand to the left of ?? exists  & not null, will be used. Else, uses operand on its right
        $taskID = filter_var($_GET['task_ID'] ?? '', FILTER_VALIDATE_INT);  // sanitising the URL retrieved variable

        // retrieve task data from db
        $query = "SELECT * FROM Task WHERE task_ID = ?";
        $stmt = $con->prepare($query);
        $stmt->bind_param("i", $taskID);

        try {
            if (!$stmt->execute()) {
                // error message
                $response = [
                    'status' => 'fail',
                    'message' => 'Could not fetch task data. Please try again later'
                ];
                echo json_encode($response);
                exit;
            }

            // retrieve query result
            $result = $stmt->get_result();      // using get_result() instead of bind_result() cos we kinda need all column data. easier that way
            if ($result->num_rows > 0) {
                // populating result into the array
                $taskinfo = $result->fetch_assoc();
            }

            // close statement
            $stmt->close();

            // wrapping $processstatus & $taskinfo
            $response = [
                'status' => 'success',
                'taskinfo' => $taskinfo
            ];

            // sending data to frontend
            echo json_encode($response);
            exit;

        } catch (mysqli_sql_exception $e) {
            $response = [
                'status' => 'fail',
                'message' => 'Could not fetch task data. Please try again later',
                'log' => 'TASK INFO EDIT PANE DB | Error: ' . $e->getMessage()
            ];
            echo json_encode($response);
            exit;
        }
    }
?>