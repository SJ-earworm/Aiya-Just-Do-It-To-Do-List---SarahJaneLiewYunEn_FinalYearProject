<!-- ADD TASK PANE -->
<div class="add-task-pane" id="addEditTaskPane">
    <!-- Close button -->
    <button class="close-btn-x" id="closeAddEditTaskPaneBtn"><i class="fa fa-close"></i></button>
    <!-- Pane title -->
    <span id="addEditTaskPaneTitle" style="font-size: 24px; font-weight: 600; color: #1E1E1E; margin: -29px 0 19px 0;"></span>
    <!-- New task form -->
    <form id="addTaskForm" name="new-task-form" method="post">
        <!-- Task title -->
        <input type="text" id="tName" name="taskname" placeholder="New task" required>
        <!-- Task description -->
        <textarea id="tDescription" name="taskdescription" placeholder="Task description"></textarea>
        <div class="date-time-group">
            <!-- Date -->
            <div style="display: flex; flex-direction: column; align-items: center; margin-left: 6px; margin-right: auto;">
                <label for="tDate">Reminder date</label>
                <input type="date" id="tDate" name="reminderdate" value="<?php echo date('Y-m-d'); ?>" style="margin: 3px 0;">
            </div>
            <!-- Time -->
            <div style="display: flex; flex-direction: column; align-items: center; margin-left: auto; margin-right: 6px;">
                <label for="tTime">Reminder time</label>
                <input type="time" id="tTime" name="remindertime" style="margin: 3px 0;">
            </div>
        </div>
        <div style="width: max-content; margin-bottom: 24px;">
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
        </div>
        <!-- task progress -->
        <div class="horizontal-container" style="display: flex; flex-direction: row; align-items: center;">
            <label for="progressSelect">Progress status</label>
            <select class="progress-select" id="progressSelect" name="progstatus">
                <option value="0">Pending</option>
                <option value="1">Doing</option>
                <option value="2">Done</option>
            </select>
        </div>

        <div class="pane-btns" id="addEditTaskPaneBtnGroup"> <!-- applying dynamic styles: add-task-btn-group, edit-task-btn-group -->
            <!-- Delete button: only in Edit mode -->
            <button type="button" class="delete-task-btn" id="deleteTaskBtn">Delete task</button>
            <!-- Save button -->
            <button type="submit" class="save-btn" id="saveTaskBtn">Save</button>
        </div>
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
        <span class="difficulty-title">How difficult is this task?</span>
        <div class="difficulty-description" id="difficultyDescription"></div>
    </div>
    <button id="easyDifficulty">Easy</button>
    <button id="mediumDifficulty">Medium</button>
    <button id="hardDifficulty">Hard</button>
    <button id="cancelDifficulty" style="border: none; height: 7px; width: 60%; background-color: transparent; text-decoration: underline; color: #1e1e1e7e; font-size: 16px">Maybe I'll set it later</button>
</div>




<!-- EDIT MODE: task delete confirmation dialog -->
<div class="task-delete-confirmation-dialog" id="taskDeleteCfmDialog">
    <div style="width: 300px; text-align: center; margin-bottom: 25px;">Are you sure you want to delete task?</div>
    <div class="task-delete-confirmation-dialog-btns">
        <button class="cancel-btn" id="cancelDelBtn">Cancel</button>
        <button class="cfm-delete-btn" id="cfmDelBtn">Yes</button>
    </div>
</div>