<?php
    // THIS SCRIPT IS LINKED TO WINDOWS TASK SCHEDULER TO
    // RUN THIS SCRIPT EVERY MINUTE



    // error handling
    ini_set('display_errors', 1);   // show errors ON THE SCREEN. 1 = on, 2 = off. TURN OFF LATER
    ini_set('display_startup_errors', 1);   // show startup errors ON THE SCREEN. TURN OFF LATER    [startup errors are rare, occurs during PHP's startup process]
    ini_set('log_errors', 'On');    // save logs to the file set below
    ini_set('error_log', 'C:/Applications/XAMPP/apache/logs/AiyaJustDoIt(FYPretake)/AiyaJustDoIt-error.log');
    error_reporting(E_ALL);   // making sure all errors are reported


    // require('C:/Applications/XAMPP/htdocs/Aiya Just Do It (FYP retake)/db/dbConnect.php');
    require(__DIR__ . '/../db/dbConnect.php');

    // array holding tasks
    $highlightsTaskData = [];
    $reminderTaskData = [];
    // preparing email content
    // recipient name variable
    $username = '';
    // defining recepient, subject, body content
    $to = "P19011819@gmail.com";
    $subject = "Aiya Just Do It! " . $username . ", you got this!";
    // email body variable
    $body = '';
    // configuring email header
    $headers = "MIME-Version: 1.0" . "\r\n";    // to ensure various content is rendered beyond the traditional simple ASCII text limitation
    $headers .= "Content-type: text/html; charset=UTF-8" . "\r\n";  // content type + encoding specification
    $headers .= "From: liewsarahjane@gmail.com" . "\r\n";    // sender email account
    // flag to determine email content version
    $sendTaskHighlights = false;
    // body content
    function emailBody($sendTaskHighlights, $highlightsTaskData, $reminderTaskData) {
        // 2 task loading scenarios: (1) no date & time, just general encouraging prompt (2) with date & time
        $body = "
            <html>
                <head>                
                    <style>
                        .email-box {
                            background: #069494;
                            background: linear-gradient(180deg,rgba(6, 148, 148, 0.26) 41%, rgba(6, 148, 148, 0.14) 69%, rgba(6, 148, 148, 0.06) 85%);
                            border-radius: 15px;
                            font-family: 'Segoe UI Emoji', 'Apple Color Emoji', Helvetica, Arial, sans-serif;
                            font-size: 18px;
                            color: #1E1E1E;
                            width: 65%;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            margin-left: auto;
                            margin-right: auto;
                            padding: 50px 0;
                        }

                        .email-title {
                            font-size: 24px;
                            font-weight: 600;
                            margin-bottom: 15px;
                            display: flex;
                            flex-wrap: wrap;
                            max-width: 73.5%;
                            /* border: 1px solid black; */
                        }

                        .subtitle {
                            font-size: 21px;
                            font-style: bold;
                            margin-bottom: 40px;
                            width: 73.5%;
                            /* border: 1px solid black; */
                        }

                        .h3 {
                            font-size: 19px;
                            font-weight: 600;
                            margin-bottom: 10px;
                            color: rgb(219, 103, 15);
                            /* border: 1px solid black; */
                        }

                        .task {
                            margin-bottom: 30px;
                            /* border: 1px solid black; */
                        }

                        .final-sendoff {
                            display: block;
                            margin: 15px auto;
                            margin-top: 70px;
                            max-width: max-content;
                            text-align: center;
                        }

                        a {
                            text-decoration: none;
                            box-sizing: border-box;
                        }

                        button {
                            background-color: #FA750C;
                            color: #F5F5F5;
                            font-size: 18px;
                            padding: 15px 21px;
                            margin: 17px;
                            border-radius: 40px;
                            border: none;
                        }
                    </style>        
                </head>
                <body>
                    <div class='email-box'>";

                        // if we're in task highlight mode
                        if ($sendTaskHighlights) {
                            // counter to determine when to stop populating
                            $taskcount = 0;
                            // task title variable
                            $tasktitle = '';

                            // content headers
                            $body .= "<div class='email-title'>Ready when you are - let's knock these out of the way today!</div>
                                        <div class='subtitle'>You got this! Start wherever feels lightest.</div>
                                        <div class='email-task-list'>";
                            // populating tasks
                            foreach ($highlightsTaskData as $task) {
                                // setting accompanying task title
                                if ($taskcount === 0) {
                                    $tasktitle = "First, try this:";
                                } else if ($taskcount === 1) {
                                    $tasktitle = "Next, if you're on a roll:";
                                } else if ($taskcount === 2) {
                                    $tasktitle = "Last one!:";
                                } else if ($taskcount > 2) {
                                    // if counter > 3
                                    $taskcount = 0;  // reset task count
                                    break;  // exit loop
                                }

                                // attaching accompanying titles & task name to the email body
                                $body .= "<div class='h3'>" . $tasktitle . "</div>
                                          <div class='task'>" . htmlspecialchars($task['task_name'], ENT_QUOTES, 'UTF-8') . "</div>";   // sanitised task name

                                // increment taskcount
                                $taskcount++;
                            }

                            // if we're in reminder mode
                        } else {
                            // accompanying title
                            $body .= "<div class='email-title'>Hey! You asked for reminders on these tasks:</div>";
                            // populating tasks
                            foreach ($reminderTaskData as $task) {
                                $body .= "<div class='task'>" . $task['task_name'] . "</div>";
                            }
                        }
                        
                        

        // join with the remaining content
        $body .=           "<div class='final-sendoff'>
                                <div>Struggling to start? That's okay *sending hugs*</div>
                                <div style='margin-bottom: 30px;'>Even if you check 1 off, that's a big win!</div>
                                <div>When you're ready, let's get more stuff done!</div>
                                <div style='margin-top: 15px;'>&#8595;</div>  <!-- unicode for the arrow down icon -->
                                <a href='http://localhost/Aiya%20Just%20Do%20It%20(FYP%20retake)/'>
                                    <button>Open App</button>
                                </a>
                            </div>
                        </div>
                    </div>
                </body>
            </html>";



        // explicitly return body content cos the function won't modify the global $body variable unless explicitly told to (a.k.a. returned)
        return $body;
    }

    // setting php environment timezone to Malaysia's timezone
    date_default_timezone_set('Asia/Kuala_Lumpur');



    // EMAIL WHEN USER SET REMINDER DATE AND/OR TIME
    // retrieving current date & time
    $currentDate = date('Y-m-d');
    $currentTime = date('H:i');    // H:i --->  'H' 24 hour hour hand with leading zeros (e.g. 07, 17) | 'i' for minutes with leading zeros (e.g. 05)

    // getting tasks which reminder date and time match the current system time
    $query = "SELECT task_name, task_description 
                FROM Task 
                WHERE (reminder_date = ? AND reminder_time = ?)
                OR reminder_date = ?";

    $stmt = $con->prepare($query);
    $stmt->bind_param("sss", $currentDate, $currentTime, $currentDate);
    
    try {
        // error message if could not execute query
        if (!$stmt->execute() || $stmt->errno !== 0) {
            error_log('SEND EMAIL PHP API | Time & Date Reminder: Failed to execute query for tasks.');
        }

        // retrieve task name & description
        $result = $stmt->get_result();
        if (!$result) {
            error_log('SEND EMAIL PHP API | Time & Date Reminder: Error fetching tasks for the email.');
            
            // if successful, proceed to loop to retrieve data
        } else if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $reminderTaskData[] = $row;
            }

            // close statement
            $stmt->close();

            // configuring the content version
            // passing in $sendTaskHighlights, $highlightsTaskData, $reminderTaskData cos functions cannot access variables declared outside unless passed into (bruh how did you forget)
            $body = emailBody($sendTaskHighlights, $highlightsTaskData, $reminderTaskData);

            // mail() here
            // initialising user name
            $username = 'tempuser pls change to dynamic name later';  // temporary for testing, used inside $subject
            if (!mail($to, $subject, $body, $headers)) {
                error_log('SEND EMAIL PHP API | Error sending email prompt');
            }

            // clear emali content
            $body = '';
        }
        
        // close statement
        $stmt->close();

       
    } catch (mysqli_sql_exception $e) {
        // catch exceptions
        error_log('SEND EMAIL PHP API | Time & Date Reminder Catch block error: ' . $e->getMessage());
    }






    // EMAIL FOR GENERAL TASK HIGHLIGHTS --> occurs randomly
    // only send email when the random number generator churns out '1' cuz we randomizing the email blast times
    // if (random_int(1, 10) === 1)
    // test
    // $testtrigger = 1;
    if (random_int(1, 10) === 1) {
        $sendTaskHighlights = true;  // mark as 'yes, send task highlights too'

        // query for tasks
        $query = "SELECT task_name, task_description FROM Task WHERE prog_status != 2 ORDER BY difficulty ASC, priority ASC";
        $stmt = $con->prepare($query);

        try {
            // error
            if (!$stmt->execute() || $stmt->errno !== 0) {
                error_log('SEND EMAIL PHP API | Task Highlights: Failed to execute query for tasks.');
            }

            // retrieve task name & description
            $result = $stmt->get_result();
            // if error in returning result
            if (!$result) {
                error_log('SEND EMAIL PHP API | Task Highlights: Error fetching tasks for the email.');

                // if successful, proceed to loop to retrieve data
            } else if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $highlightsTaskData[] = $row;
                }

                // configuring the content version
                // passing in $sendTaskHighlights, $highlightsTaskData, $reminderTaskData cos functions cannot access variables declared outside unless passed into (bruh how did you forget)
                $body = emailBody($sendTaskHighlights, $highlightsTaskData, $reminderTaskData);

                // mail() here
                // initialising user name
                $username = 'tempuser pls change to dynamic name later';  // temporary for testing, used inside $subject
                if (!mail($to, $subject, $body, $headers)) {
                    error_log('SEND EMAIL PHP API | Error sending email prompt');
                }
                
                // clear email content
                $body = '';
            }

            // close statement
            $stmt->close();


        } catch (mysqli_sql_exception $e) {
            // catch exceptions
            error_log('SEND EMAIL PHP API | Task Highlights Catch block error: ' . $e->getMessage());
        }
    }
?>