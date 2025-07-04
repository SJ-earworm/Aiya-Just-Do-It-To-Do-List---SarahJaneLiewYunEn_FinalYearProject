// HANDLE BACKEND CASE WHERE USER MARKS TASK AS COMPLETE & INCOMPLETE
function handleTaskComplete(event) {
    const checkbox = event.target;  // the clicked element (event.target) = a.k.a. the clicked checkbox

    // retrive task_ID from checkbox id value
    const task_ID = checkbox.id;
    
    // if is checked, mark as complete
    if (checkbox.checked === true) {
        // gathering data into a formData to be sent over to backend
        const formData = {
            taskID: task_ID,
            complete: true
        };

        fetch('http:/Aiya Just Do It (FYP retake)/db/task_complete_status_db.php', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            // temporary
            if (data.status == 'success') {
                // console.log('db updated, marked as complete');
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
                console.log(data.log);
            }
        })


    } else {
        // if unchecked, mark as incomplete

        // gathering data into a formData to be sent over to backend
        const formData = {
            taskID: task_ID,
            complete: false
        };

        fetch('http:/Aiya Just Do It (FYP retake)/db/task_complete_status_db.php', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            // temporary
            if (data.status == 'success') {
                console.log('db updated, marked as incomplete');
            } else {
                message.innerHTML = data.message;
                message.style.color = 'black';
                message.style.backgroundColor = '#FF9999';      // message declared in 'index.php'
                message.style.visibility = 'visible';
                // hiding message after 3s
                setTimeout(() => {
                    message.style.visibility = 'hidden';
                }, 3000);

                // temporarily logging backend error to console
                console.log(data.log);
            }
        })
    }
    
}





// SHOW/HIDE COMPLETED TASKS
const switchToggle = document.getElementById('showHideCheckbox');  // switch button hidden checkbox
// slider text
const completedTaskVisualState = document.getElementById('completedVisualState');

function toggleCompletedTaskView() {
    // completed tasks display area
    const completedtaskdisplayarea = document.getElementById('completedTasksDisplayBox');

    // if toggled
    if (switchToggle.checked === true) {
        // SHOW completed tasks
        // change button slider text
        completedTaskVisualState.innerHTML = 'Hide completed tasks';
        // pull from db upon call instead of wasting resources by loading up everything one shot
        fetch('http:/Aiya Just Do It (FYP retake)/db/tasklist_db.php')
        .then(response => response.json())
        .then(completedTasks => {
            // ready made list container template
            const liststripTemplate = document.getElementById('listStrip');
            // increment counter for task numbering
            let taskorder = 1;

            // populating list
            completedTasks.forEach(task => {
                // making sure only completed tasks are rendered
                if (task.prog_status == 2) {
                    // cloning the CONTENT of the 'task_list_strip.php' template
                    const listStripClone = liststripTemplate.content.cloneNode(true);
                    // accessing the clone's elements
                    const checkbox = listStripClone.querySelector('.task-checkbox');
                    const taskindex = listStripClone.querySelector('.task-index');
                    const taskname = listStripClone.querySelector('.task-name');


                    // POPULATING CLONED ELEMENTS
                    // assigning taskID to the checkbox
                    checkbox.id = task.task_ID;
                    // if task marked as complete, checkbox to be rendered as checked
                    if (task.prog_status == 2) {
                        checkbox.checked = true;
                    }
                    // add click event listener to checkbox -> to trigger handleTaskComplete() & pass the event info into taskcompletehandler.js
                    checkbox.addEventListener('click', handleTaskComplete);

                    // populating task order index
                    taskindex.innerHTML = `${taskorder}. `;
                    // populating task name
                    taskname.innerHTML = task.task_name;

                    completedtaskdisplayarea.appendChild(listStripClone);

                    // increment taskorder index
                    taskorder++;
                }
            });

            
            // revealing completed tasks display area
            completedtaskdisplayarea.style.display = 'block';


            // clearing any pop-up error messages (in .catch section below)
            message.style.visibility = 'hidden';        // message declared in 'index.php'
        })
        .catch(error => {
            console.error('Error fetching task list: ', error);
            // visibility of system status (usability heuristics)
            document.getElementById('successErrorStatus').innerHTML = 'Failed to load tasks';
            document.getElementById('successErrorStatus').style.color = 'black';
            document.getElementById('successErrorStatus').style.backgroundColor = '#FF9999';
            document.getElementById('successErrorStatus').style.visibility = 'visible';
        })

    } else {
        // HIDE completed tasks
        // change button slider text
        completedTaskVisualState.innerHTML = 'Show completed tasks';
        // removing tasks that have been CHECKED from view
        if (switchToggle.checked === false) {
            // removing the task strips
            document.querySelectorAll('.task-list-li').forEach(strip => {
                if (strip.querySelector('.task-checkbox').checked === true) {
                    strip.remove();
                }
            });
            // remove display area
            completedtaskdisplayarea.style.display = 'none';
        }
    }
}


// run toggleCompletedTaskView on page load
document.addEventListener('DOMContentLoaded', toggleCompletedTaskView);
// run toggleCompletedTaskView when switch button clicked
switchToggle.addEventListener('click', toggleCompletedTaskView);