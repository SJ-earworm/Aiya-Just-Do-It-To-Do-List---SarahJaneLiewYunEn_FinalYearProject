<!-- Folder pane -->
<div class="my-list-view" id="mylistBigView">
    <?php include('web_components/folder_pane.php') ?>
    <div class="vertical-container toggle-and-tasks-group">
        <!-- Switch toggle to 'show/hide completed tasks' -->
        <?php include('web_components/task_complete_view_toggle.php'); ?>
        <!-- main functioning container -->
        <div class="main-functioning-container">
            <?php 
                // if task list empty, pull up prompt to add new task
                include('web_components/empty_view_new_task_prompt.php');
                // else, JavaScript handling case where list exists
                // list strip template (hidden from view)
                include('web_components/task_list_strip.php');

                // suggested tasks to complete
                // include('web_components/highlighted_tasks_section.php');

                // main tasks + suggested tasks to complete
                include('web_components/main_task_display.php');

                // hidden/revealed completed tasks
                include('web_components/task_complete_display.php');
            ?>
            <!-- add task button -->
            <?php include('web_components/add_task_button.php') ?>
        </div>
    </div>
</div>