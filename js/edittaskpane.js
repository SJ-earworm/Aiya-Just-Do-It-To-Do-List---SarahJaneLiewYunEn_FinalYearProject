// Initialising priority 'select dropdown' input choice
// const prioritySelection = document.getElementById('priorityInput');
// Initialising difficulty 'select dropdown' input choice
// const difficultySelection = document.getElementById('difficultyInput');

// task_ID retrieved from task strip to be used for retrieving task information
let stripTaskID = 0;

// elements
const deleteConfirmationDialog = document.getElementById('taskDeleteCfmDialog');
const cancelDeleteBtn = document.getElementById('cancelDelBtn');
const confirmDeleteBtn = document.getElementById('cfmDelBtn');


// Edit Pane elements display logic -> called by click listener function below (needed to ensure it only triggers upon the specific strip click because it was causing the system confusion when dumped after the forEach strip block)
function populateEditPane(stripTaskID) {
    // populate edit pane with task info
    fetch(`http:/Aiya Just Do It (FYP retake)/db/task_info_editPane_db.php?task_ID=${stripTaskID}`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        // populate pane elements
        const taskname = document.getElementById('tName');
        const taskdescription = document.getElementById('tDescription');
        const date = document.getElementById('tDate');
        const time = document.getElementById('tTime');
        const priority = document.getElementById('priorityInput');
        const difficulty = document.getElementById('difficultyInput');
        const progress = document.getElementById('progressSelect');

        if (data.status == 'success') {
            // convert priority + difficulty to readable words
            let priorityMark = data.taskinfo.priority;
            let difficultyMark = data.taskinfo.difficulty;
            let priorityText = '';
            let difficultyText = '';

            // priority selection
            if (priorityMark == 1) {
                priorityText = 'high';
            } else if (priorityMark == 2) {
                priorityText = 'medium';
            } else if (priorityMark == 3) {
                priorityText = 'low';
            }
            // difficulty selection
            if (difficultyMark == 1) {
                difficultyText = 'easy';
            } else if (difficultyMark == 2) {
                difficultyText = 'medium';
            } else if (difficultyMark == 3) {
                difficultyText = 'hard';
            }

            taskname.value = data.taskinfo.task_name;
            taskdescription.value = data.taskinfo.task_description;
            date.value = data.taskinfo.reminder_date;
            time.value = data.taskinfo.reminder_time;
            priority.innerText = priorityText;
            difficulty.innerText = difficultyText;
            progress.value = data.taskinfo.prog_status;


            // debug
            // console.log(data);

        } else {
            // visibility of system status (usability heuristics)
            message.innerHTML = data.message;
            message.style.color = 'black';
            message.style.backgroundColor = '#FF9999';      // message declared in 'index.php'
            message.style.visibility = 'visible';
            // hiding message after 3s
            setTimeout(() => {
                message.style.visibility = 'hidden';
            }, 3000);

            // temporarily logging backend error to console
            if (data.log) {
                // console.log(data.log);
            }
        }
    })
    .catch(error => console.error('Error fetching task data: ', error));
}


// opening Edit Task pane
document.addEventListener('click', function(event) {
    // EDIT TASK PANE
    // selecting all the '.task-list-strip' divs
    const taskStrips = document.querySelectorAll('.task-list-strip');
    let taskStripClicked = false;
   
    // extracting the clicked task's task_ID
    taskStrips.forEach(strip => {
        // looking the '.task-name-strip' that was clicked
        const nameStripDiv = strip.querySelector('.task-name-strip');
        // only when '.task-name-strip' is clicked    [because checkbox falls within '.task-list-strip'. we only want the task pane opening sequence to fire when the '.task-name-strip' is clicked]
        if (nameStripDiv.contains(event.target)) {
            taskStripClicked = true;    // to trigger the opening of addEditTaskPane edit mode (the if block below this one)
            stripTaskID = strip.querySelector('.task-checkbox').id;     // retrieve task_ID tied to the checkbox done in loadtasks.js
            populateEditPane(stripTaskID);
            // console.log('task ID: ', stripTaskID);
        }
    });
    

    // open edit task pane when task strip clicked
    if (taskStripClicked && addEditTaskPane.style.visibility == 'hidden') {
        // console.log('task strip clicked');
        // setting boolean flag declared in 'index.php', letting the system know we're in edit mode now
        isEditMode = true;   // used to eliminate clash between Add New Task mode or Edit Task mode
        // pane title
        addEditTaskPaneTitle.innerHTML = '';    // clear previous title
        addEditTaskPaneTitle.innerText = 'Edit Task';   // edit task mode title
        // button group setting: edit task mode
        // bringing 'delete task' button to view
        deleteTaskButton.style.display = 'flex';
        // adding '.edit-task-btn-group-setting' style to button group & save button
        saveTaskButton.classList.add('edit-task-btn-group-setting');
        addEditTaskPaneButtonGroup.classList.add('edit-task-btn-group-setting');

        addEditTaskPane.style.visibility = 'visible';
        dimmedOverlay.style.display = 'block';
    }
});




// DELETE TASK
document.addEventListener('click', function(event) {
    // clicked main delete button
    const deleteTaskButtonClicked = deleteTaskButton.contains(event.target);
    // clicked cancel delete button
    const cancelDeleteBtnClicked = cancelDeleteBtn.contains(event.target);
    // cllcked confirm delete button
    const confirmDeleteBtnClicked = confirmDeleteBtn.contains(event.target);


    // when main delete button clicked
    if (deleteTaskButtonClicked) {
        // bring up task delete confirmation dialog
        deleteConfirmationDialogIsActive = true;    // declared in 'addtaskpane.js' to prevent addEditTaskPane from closing since it means it'll be out focus d
        deleteConfirmationDialog.style.visibility = 'visible';

    } else if (cancelDeleteBtnClicked) {
        deleteConfirmationDialogIsActive = false;   // declared in 'addtaskpane.js' to prevent addEditTaskPane from closing since it means it'll be out focus d
        deleteConfirmationDialog.style.visibility = 'hidden';

    } else if (confirmDeleteBtnClicked) {
        // backend sequence
        fetch('http:/Aiya Just Do It (FYP retake)/db/delete_task_db.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({_method: 'DELETE', taskID: stripTaskID})
        })
        .then(response => response.json())
        .then(data => {
            if (data.status == 'success') {
                // elements
                const taskname = document.getElementById('tName');
                const taskdescription = document.getElementById('tDescription');
                const date = document.getElementById('tDate');
                const time = document.getElementById('tTime');
                const priority = document.getElementById('priorityInput');
                const difficulty = document.getElementById('difficultyInput');
                const progress = document.getElementById('progressSelect');

                // clear addEditTaskPane input fields
                taskname.value = '';
                taskdescription.value = '';
                date.value = '';
                time.value = '';
                priority.innerHTML = '';       // does not need 'this' reference cos they were declared 
                difficulty.innerHTML = '';     // outside of the form d, unlike the other form elements that weren't
                progress.value = '';

                // clearing delete task confirmation dialog
                deleteConfirmationDialog.style.visibility = 'hidden';

                // closing add new task pane
                addEditTaskPane.style.visibility = 'hidden';  // addEditTaskPane declared in 'index.php'
                dimmedOverlay.style.display = 'none';  // dimmedOverlay declared in 'index.php'

                // visibility of system status (usability heuristics)
                message.innerHTML = data.message;      
                message.style.color = 'green';
                message.style.backgroundColor = '#9CFFB0';          // message declared in 'index.php'
                message.style.visibility = 'visible';
                // hiding message after 3s
                setTimeout(() => {
                    message.style.visibility = 'hidden';
                }, 3000);
            } else {
                // visibility of system status (usability heuristics)
                message.innerHTML = data.message;
                message.style.color = 'black';
                message.style.backgroundColor = '#FF9999';      // message declared in 'index.php'
                message.style.visibility = 'visible';
                // hiding message after 3s
                setTimeout(() => {
                    message.style.visibility = 'hidden';
                }, 3000);
            }


            // Update task list display
            // clear list first then re-render list
            document.querySelectorAll('.task-list-li').forEach(strip => {
                strip.remove();
            });
            loadTasks();
            newTaskBtn.style.visibility = 'visible';
        })
        .catch(error => console.error('Error deleting task: ', error));
    }
})




// SAVE EDITED TASK INFO
// this function will be called from 'addtaskpane.js' since it's sharing the same form
function saveEditTask(form) {
    // *NOTE: 'form' is the form data/state passed from the shared from in addtaskpane.js

    // FILTER THROUGH PRIORITY + DIFFICULTY INPUT
    let priorityMark = 0;
    let difficultyMark = 0;

    // priority selection
    if (prioritySelection.innerText == 'high') {
        priorityMark = 1;
    } else if (prioritySelection.innerText == 'medium') {
        priorityMark = 2;
    } else if (prioritySelection.innerText == 'low') {
        priorityMark = 3;
    } else if (prioritySelection.innerText == '') {
        priorityMark = 3;
    }
    // difficulty selection
    if (difficultySelection.innerText == 'easy') {
        difficultyMark = 1;
    } else if (difficultySelection.innerText == 'medium') {
        difficultyMark = 2;
    } else if (difficultySelection.innerText == 'hard') {
        difficultyMark = 3;
    } else if (difficultySelection.innerText == '') {
        difficultyMark = 2;
    }

    // manually putting user input form data into an object to be sent over to backend
    const formData = {
        taskID: stripTaskID,
        taskName: form.taskname.value,
        taskDescription: form.taskdescription.value,
        reminderDate: form.reminderdate.value,
        reminderTime: form.remindertime.value,
        taskPriority: priorityMark,  
        taskDifficulty: difficultyMark,
        taskProgress: form.progstatus.value
    };
    // console.log(formData);  // debug

    // sending form data to backend file
    fetch('db/edit_task_db.php', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status == 'success') {
            // clear input fields
            form.taskname.value = '';
            form.taskdescription.value = '';
            form.reminderdate.value = '';
            form.remindertime.value = '';
            prioritySelection.innerHTML = '';       // does not need 'this' reference cos they were declared 
            difficultySelection.innerHTML = '';     // outside of the form d, unlike the other form elements that weren't

            // closing add new task pane
            addEditTaskPane.style.visibility = 'hidden';  // addEditTaskPane declared in 'index.php'
            dimmedOverlay.style.display = 'none';  // dimmedOverlay declared in 'index.php'

            // visibility of system status (usability heuristics)
            message.innerHTML = 'Changes made to task.';      
            message.style.color = 'green';
            message.style.backgroundColor = '#9CFFB0';          // message declared in 'index.php'
            message.style.visibility = 'visible';
            // hiding message after 3s
            setTimeout(() => {
                message.style.visibility = 'hidden';
            }, 3000);
        } else {
            // visibility of system status (usability heuristics)
            message.innerHTML = data.message;
            message.style.color = 'black';
            message.style.backgroundColor = '#FF9999';      // message declared in 'index.php'
            message.style.visibility = 'visible';
            // hiding message after 3s
            setTimeout(() => {
                message.style.visibility = 'hidden';
            }, 3000);

            // temporarily logging backend error to console
            // console.log(data.log);
        }


        // Update task list display
        // clear list first then re-render list
        document.querySelectorAll('.task-list-li').forEach(strip => {
            strip.remove();
        });
        loadTasks();
        newTaskBtn.style.visibility = 'visible';
    })
    .catch(error => console.error('Error adding task: ', error));
}