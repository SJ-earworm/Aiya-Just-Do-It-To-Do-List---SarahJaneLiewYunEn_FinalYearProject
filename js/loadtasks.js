// CHECK DATABASE FOR EXISTENCE OF TASKS IN THE SELECTED LIST
// document.addEventListener('DOMContentLoaded', function () {
//     fetch('http:/Aiya Just Do It (FYP retake)/db/tasklist_db.php')
//     .then(response => response.json()) // retrieving response from backend
//     .then(tasks => {
//         // element where tasks will be populated
//         const taskarea = document.getElementById('taskArea');

//         // if data received is not an array or is empty, trigger sequence below
//         if (!Array.isArray(tasks) || tasks.length === 0) {
//             // bring up the 'Add Tasks' prompt
//             document.getElementById('addNewTasksPrompt').visibility = 'visible';
//         } else {
//             // hide 'Add Tasks' prompt
//             document.getElementById('addNewTasksPrompt').visibility = 'hidden';
//         }


//         // populate with tasks if $tasks[] filled
//         // creating list to hold tasks (create first then append to main display later)
//         const ul = document.createElement('ul');
//         // increment counter for task numbering
//         let taskorder = 1;

//         // populating list
//         tasks.forEach(task => {
//             // creating one li only when there's a task to display
//             const li = document.createElement('li');
//             li.className = 'task-list-li';  // giving the created li a className

//             // creating checkbox element to be appended to task list
//             const checkbox = document.createElement('input');
//             checkbox.type = 'checkbox';
//             checkbox.id = `${task.task_ID}`;
//             // if task marked as complete, checkbox to be rendered as checked
//             if (task.prog_status == 2) {
//                 checkbox.checked = true;
//             }
//             // add click event listener to checkbox -> to trigger handleTaskComplete() & pass the event info into taskcompletehandler.js
//             checkbox.addEventListener('click', handleTaskComplete);
            

//             // append task_name + list index to li
//             const listtextcontent = document.createTextNode(`${taskorder}. ${task.task_name}`);  // JavaScript template literal -> embedding JavaScript object properties' 
//                                                                                                 // value directly into string
//                                                                                                 // 'task.task_name' to access the task_name db value from the array (or else it'll just return 'Object')

//             // append checkbox to the li
//             li.appendChild(checkbox);
//             // append list text to the li
//             li.appendChild(listtextcontent);

//             // appending li to the bigger ul
//             ul.appendChild(li);

//             // increment taskorder index
//             taskorder++;
//         });

//         // appending the ul to the display area
//         taskarea.appendChild(ul);

//         // clearing any pop-up error messages (in .catch section below)
//         message.style.visibility = 'hidden';
//     })
//     .catch(error => {
//         console.error('Error fetching task list: ', error);
//         document.getElementById('successErrorStatus').innerHTML = 'Failed to load tasks';
//         document.getElementById('successErrorStatus').style.color = 'black';
//         document.getElementById('successErrorStatus').style.backgroundColor = '#FF9999';
//         document.getElementById('successErrorStatus').style.visibility = 'visible';
//     })
// });

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

        // if data received is not an array or is empty, trigger sequence below
        // if (!Array.isArray(tasks) || tasks.length === 0) {
        //     // bring up the 'Add Tasks' prompt
        //     document.getElementById('addNewTasksPrompt').style.visibility = 'visible';
        // } else {
        //     // hide 'Add Tasks' prompt
        //     document.getElementById('addNewTasksPrompt').style.visibility = 'hidden';
        // }


        // populate with tasks if $tasks[] filled
        // creating list to hold tasks (create first then append to main display later)
        const ul = document.createElement('ul');
        // increment counter for task numbering
        let taskorder = 1;

        // populating list
        tasks.forEach(task => {
            // creating one li only when there's a task to display
            const li = document.createElement('li');
            li.className = 'task-list-li';  // giving the created li a className

            // creating checkbox element to be appended to task list
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `${task.task_ID}`;
            // if task marked as complete, checkbox to be rendered as checked
            if (task.prog_status == 2) {
                checkbox.checked = true;
            }
            // add click event listener to checkbox -> to trigger handleTaskComplete() & pass the event info into taskcompletehandler.js
            checkbox.addEventListener('click', handleTaskComplete);

            
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

            // append task_name + list index to li
            const listtextcontent = document.createTextNode(`${taskorder}. ${task.task_name}   (${difficultyRating}, ${priorityRating})`);  // JavaScript template literal -> embedding JavaScript object properties' 
                                                                                                // value directly into string
                                                                                                // 'task.task_name' to access the task_name db value from the array (or else it'll just return 'Object')

            // append checkbox to the li
            li.appendChild(checkbox);
            // append list text to the li
            li.appendChild(listtextcontent);

            // appending li to the bigger ul
            ul.appendChild(li);

            // increment taskorder index
            taskorder++;
        });

        // appending the ul to the display area
        taskarea.appendChild(ul);   // taskarea declared in 'index.php'

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