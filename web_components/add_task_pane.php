<div class="add-task-pane" id="addTaskPane">
    <!-- Close button -->
    <button class="close-btn-x" onclick="toggleNewTaskPane()"><i class="fa fa-close"></i></button>
    <!-- New task form -->
    <form id="addTaskForm" name="new-task-form" method="post">
        <!-- Task title -->
        <input type="text" id="tName" name="taskname" placeholder="New task">
        <!-- Task description -->
        <textarea id="tDescription" name="taskdescription" placeholder="Task description"></textarea>
        <!-- Date -->
        <label for="date">Reminder date</label>
        <input type="date" id="tDate" name="reminderdate" value="<?php echo date('Y-m-d'); ?>">
        <!-- Time -->
        <label for="time">Reminder time</label>
        <input type="time" id="tTime" name="remindertime">
        <!-- Priority + difficulty -->

        <!-- Save button -->
        <button type="submit" class="save-btn">Save</button>
    </form>
</div>