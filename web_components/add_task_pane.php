<!-- ADD TASK PANE -->
<div class="add-task-pane" id="addEditTaskPane">
    <!-- Close button -->
    <button class="close-btn-x" id="closeAddEditTaskPaneBtn"><i class="fa fa-close"></i></button>
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
        <!-- Priority -->
        <div class="priority-settings">
            <span>Priority</span>
            <div class="priority-select" id="prioritySelect">
                <i class="fa fa-angle-down" style="font-size: 20px; margin: 0 5px; position: relative; top: 1px"></i>
                <span id="priorityInput"></span>
            </div>
        </div>
        <!-- Difficulty -->
        <div class="difficulty-settings">
            <span>Difficulty level</span>
            <div class="difficulty-select" id="difficultySelect">
                <i class="fa fa-angle-down" style="font-size: 20px; margin: 0 5px; position: relative; top: 1px"></i>
                <span id="difficultyInput"></span>
            </div>
        </div>

        <!-- Save button -->
        <button type="submit" class="save-btn">Save</button>
    </form>
</div>



<!-- PRIORITY SETTINGS PANE -->
<div class="priority-pane" id="priorityPane">
    <div class="priority-pane-header-titles">
        <span class="priority-title">How important is this task?</span>
        <div class="priority-description" id="priorityDescription"></div>
    </div>
    <button id="highPriority">Urgent</button>
    <button id="mediumPriority">Important</button>
    <button id="lowPriority">Not important</button>
    <button id="cancelPriority" style="border: none; height: 7px; width: 60%; background-color: transparent; text-decoration: underline; color: #1e1e1e7e; font-size: 16px">Maybe I'll set it later</button>
</div>

<!-- DIFFICULTY SETTINGS PANE -->
<div class="difficulty-pane" id="difficultyPane">
    <div class="difficulty-pane-header-titles">
        <span class="difficulty-title">How important is this task?</span>
        <div class="difficulty-description" id="difficultyDescription"></div>
    </div>
    <button id="easyDifficulty">Easy</button>
    <button id="mediumDifficulty">Medium</button>
    <button id="hardDifficulty">Hard</button>
    <button id="cancelDifficulty" style="border: none; height: 7px; width: 60%; background-color: transparent; text-decoration: underline; color: #1e1e1e7e; font-size: 16px">Maybe I'll set it later</button>
</div>