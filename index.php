<!DOCTYPE html>
<html>
    <head>
        <title>Aiya Just Do It</title>
        <!-- configuring for responsive design -->
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!--css stylesheet-->
        <link rel="stylesheet" type="text/css" href="style.css">

        <!-- fontawesome icons -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    </head>
    <body>
        <!-- 'Header' - logo + settings icon -->
        <?php include('web_components/header.php');     ?>

        <div class="main-main-frame">
            <!-- test <span>this is the main main frame</span> -->
            <!-- Folder pane -->
            <?php include('web_components/folder_pane.php') ?>

            <!-- main functioning container -->
            <div class="main-functioning-container" id="taskArea">
                <?php 
                    // if task list empty, pull up prompt to add new task
                    include('web_components/empty_view_new_task_prompt.php');
                    // else, populate tasks here
                ?>
                <!-- add task button -->
                <?php include('web_components/add_task_button.php') ?>
            </div>
        </div>

        <?php include('web_components/add_task_pane.php') ?>

        <!-- success/error status -->
        <div id="successErrorStatus" class="success-error-status"></div>
        
        <!-- JavaScript -->
        <script>
            // Initialising button for adding new tasks
            const newtaskbtn = document.getElementById('newTaskBtn');
            // Initialising add task pane
            const addtaskpane = document.getElementById('addTaskPane');
            // Initialising response message pop-up box
            const message = document.getElementById('successErrorStatus');
        </script>
        <script src="js/loadtasks.js"></script> <!-- checks if incomplete tasks exist in the folder, then populates main area accordingly -->
        <script src="js/taskcompletehandler.js" defer></script>
        <script src="js/addtaskpane.js" defer></script>
    </body>
</html>