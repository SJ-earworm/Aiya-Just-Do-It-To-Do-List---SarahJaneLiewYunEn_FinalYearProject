<?php
    require('dbConnect.php');

    if($_SERVER['REQUEST_METHOD'] == 'GET') {
        // setting JSON header to communicate back with the frontend
        header("Content-Type: application/json");
        // array for response message
        $response = [];
        // array to hold tasks
        $tasks = [];

        // retrieve user_ID here

        // SELECT query
        // $query = "SELECT task_ID, task_name, prog_status FROM Task";
        $query = "SELECT task_ID, task_name, prog_status, difficulty, priority FROM Task ORDER BY difficulty ASC, priority ASC";    // difficulty & priority values pulled from db is for testing purposes, pls remove later
        $stmt = $con->prepare($query);

        try {
            if (!$stmt->execute()) {
                $response = ['message' => 'Could not fetch task list. Please try again later'];
                echo json_encode($response);
                exit;
            }
            // retrieve query result
            $result = $stmt->get_result();
            // Loop to compile query results in tasks[]
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $tasks[] = $row;
                }
            }

            // close statement
            $stmt->close();
            
            // send tasks to frontend
            echo json_encode($tasks);
            exit;
            
        } catch (mysqli_sql_exception $e) {
            // error message
            $response = [
                'message' => 'TASKLIST DB | Error: ' . $e->getMessage()
            ];
            // sending error message to frontend (debug)
            echo json_encode($response);
            exit;
        }
    }
?>