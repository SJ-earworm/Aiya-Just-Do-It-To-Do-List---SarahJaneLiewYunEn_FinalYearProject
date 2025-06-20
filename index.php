<!-- session handling -->
<?php //session_destroy() // debug ?>
<?php require('app_config/session_handling.php') ?>

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
        <?php include('web_components/header.php'); ?>

        <!-- main page content area -->
        <div class="main-main-frame">
            <?php include('page_components/my_list.php') ?>
            <?php include('page_components/focus_session.php') ?>
        </div>

        <!-- dimmed overlay -->
        <div class="dimmed-overlay" id="overlay"></div>

        <?php include('web_components/add_edit_task_pane.php') ?>

        <!-- success/error status -->
        <div id="successErrorStatus" class="success-error-status"></div>
        
        <!-- JavaScript -->
        <script>
            // Initialising button for adding new tasks
            const newTaskBtn = document.getElementById('newTaskBtn');
            // Element where tasks will be populated
            const taskarea = document.getElementById('defaultListTaskArea');
            // Highlighted tasks area
            const highlights = document.getElementById('highlightedSection');
            // Initialising add task pane
            const addEditTaskPane = document.getElementById('addEditTaskPane');
            // boolean to let system know if we're in add mode or edit mode
            let isEditMode = false;
            // Initialising close add task pane
            const closeAddEditTaskPaneBtn = document.getElementById('closeAddEditTaskPaneBtn');
            // POMODORO BUTTONS & ELEMENTS
            const pomodorotimerMode = document.getElementById('focusModeBtn');
            const shortbreaktimerMode = document.getElementById('shortBreakModeBtn');
            const longbreaktimerMode = document.getElementById('longBreakModeBtn');
            const timercircle = document.getElementById('timerCircle');
            // flags to determine which pomodoro mode it's on
            let isPomodoro = false;
            let isShortBreak = false;
            let isLongBreak = false;
            // Initialising dimmed overlay
            const dimmedOverlay = document.getElementById('overlay');
            // Initialising response message pop-up box
            const message = document.getElementById('successErrorStatus');
        </script>
        <script src="js/loadtasks.js"></script> <!-- checks if incomplete tasks exist in the folder, then populates main area accordingly -->
        <script src="js/taskcompletehandler.js" defer></script>
        <script src="js/appsettings.js" defer></script>
        <script src="js/addtaskpane.js" defer></script>
        <script src="js/edittaskpane.js" defer></script>
        <script src="js/list_pomodoroswitcher.js" defer></script>
        <script src="js/pomodorotimer.js" defer></script>
    </body>
</html>