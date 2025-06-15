// CHECK DATABASE FOR EXISTENCE OF TASKS IN THE SELECTED LIST
function loadTasks() {
    fetch('http:/Aiya Just Do It (FYP retake)/db/tasklist_db.php')
    .then(response => response.json()) // retrieving response from backend
    .then(tasks => {
        // to check if prompt exists (is rendered in the html)
        const newTaskPrompt = document.getElementById('addNewTasksPrompt');
        if (newTaskPrompt) {
            // if data received is not an array or is empty, trigger sequence below
            if (!Array.isArray(tasks) || tasks.length === 0) {
                // bring up the 'Add Tasks' prompt
                newTaskPrompt.style.visibility = 'visible';
            } else {
                // hide 'Add Tasks' prompt
                newTaskPrompt.style.visibility = 'hidden';
            }
        }

        // ready made list container template
        const liststripTemplate = document.getElementById('listStrip');
        // increment counter for task numbering
        let taskorder = 1;

        // populating list
        tasks.forEach(task => {
            // loading only incomplete tasks (as default first, 'show incomplete tasks' will be separately handled in taskcompletehandler.js)
            if (task.prog_status == 0 || task.prog_status == 1) {
                // cloning the CONTENT of the 'task_list_strip.php' template
                const listStripClone = liststripTemplate.content.cloneNode(true);
                // accessing the clone's elements
                const checkbox = listStripClone.querySelector('.task-checkbox');
                const taskindex = listStripClone.querySelector('.task-index');
                const taskname = listStripClone.querySelector('.task-name');
                const taskDifPriorNote = listStripClone.querySelector('.ts-difficulty-priority-notation');
                
                // converting difficulty + priority ratings to words
                const dbDifficulty = task.difficulty;
                const dbPriority = task.priority;
                let difficultyRating = '';
                let priorityRating = '';
                // difficulty
                if (dbDifficulty == '1') {
                    difficultyRating = 'Easy';
                } else if (dbDifficulty == '2') {
                    difficultyRating = 'Medium';
                } else {
                    difficultyRating = 'Hard';
                }
                // priority
                if (dbPriority == '1') {
                    priorityRating = 'Urgent';
                } else if (dbPriority == '2') {
                    priorityRating = 'Important';
                } else {
                    priorityRating = 'Not Important';
                }


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
                // populating difficulty + priority notation
                taskDifPriorNote.innerHTML = `(${difficultyRating}, ${priorityRating})`;
                // displaying task progress status indicator if task is 'in progress'    [already ready made in the task strip template]
                if (task.prog_status == 1) {
                    listStripClone.querySelector('.task-progress-indicator').style.display = 'inline-flex';
                }


                // highlight if first 3 tasks
                if (taskorder < 4) {
                    listStripClone.querySelector('.task-list-li-thumb').classList.add('highlighted');
                    listStripClone.querySelector('.task-list-li').classList.add('highlighted');
                    listStripClone.querySelector('.task-index').classList.add('highlighted');
                    listStripClone.querySelector('.task-name').classList.add('highlighted');

                    // append the list to the highlighted area
                    highlights.appendChild(listStripClone);

                } else {
                    // else, render as normal list
                    taskarea.appendChild(listStripClone);   // taskarea declared in 'index.php'
                }


                // debug
                // console.log('taskID: ', checkbox.id);


                // appending rendered list strip to display area
                // taskarea.appendChild(listStripClone);   // taskarea declared in 'index.php'


                // increment taskorder index
                taskorder++;
            }
        });

        // highlighted tasks title element
        const highlighttitle = document.getElementById('highlightedTasksTitle');

        // if only 3 tasks in the list, this is the title
        if (taskorder < 4) {
            highlighttitle.innerText = "Let's knock these 3 off the list!";
        } else {
            highlighttitle.innerText = "We recommend doing these first";
        }

        // appending the ul to the display area
        // taskarea.appendChild(ul);   // taskarea declared in 'index.php'

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
}


// Trigger loadTasks() upon page load
document.addEventListener('DOMContentLoaded', loadTasks);