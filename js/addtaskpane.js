// Variables globally used throughout this script
const prioritypane = document.getElementById('priorityPane');
const difficultypane = document.getElementById('difficultyPane');
let priorityDifficultyPaneIsActive = false;  // setting state as false first -> for locking add task pane when priority + difficulty panes are active
let deleteConfirmationDialogIsActive = false;   // for task delete confirmation dialog in 'edittaskpane.js'

// Initialising priority 'select dropdown' input choice
const prioritySelection = document.getElementById('priorityInput');
// Initialising difficulty 'select dropdown' input choice
const difficultySelection = document.getElementById('difficultyInput');



// TASK PANE CONTROLS       [EXPAND TO REVEAL OLD CODE]
// function toggleNewTaskPane() {
//     // console.log('button clicked');
//     if (addTaskPane.style.visibility == 'visible') {
//         addTaskPane.style.visibility = 'hidden';
//     } else {
//         addTaskPane.style.visibility = 'visible';
//     }
// }

// document.addEventListener('click', function(event));



// hide task pane when clicked outside of it + when clicked on add task button again
function toggleAddEditTaskPane(event) {
    // NOTE: had to addEventListener to the target elements instead of assigning onclick attribute cos it couldn't work when shared among scattered elements
    
    // ADD TASK PANE
    // add task pane still clicked
    const addEditPaneIsFocused = addEditTaskPane.contains(event.target);  // addEditTaskPane declared in 'index.php'
    // // priority pane is active (equates to not clicking on add task pane)
    // const priorityPaneIsFocused = prioritypane.contains(event.target);
    
    // if add task button clicked
    const addTaskButtonClicked = newTaskBtn.contains(event.target);  // newTaskBtn declared in 'index.php'
    // test: close button
    const xBtn = closeAddEditTaskPaneBtn.contains(event.target);  // closeAddEditTaskPaneBtn declared in 'index.php'

    
    // CONTROLLING WHETHER ADDEDITTASKPANE STAYS OPEN OR NOT
    // if addTaskPane out of focus or add task button clicked (<- this one temporarily out of order)
    if ((priorityDifficultyPaneIsActive || deleteConfirmationDialogIsActive) && !addEditPaneIsFocused) {
        addEditTaskPane.style.visibility = 'visible';  // addEditTaskPane declared in 'index.php'
        dimmedOverlay.style.display = 'block';  // dimmedOverlay declared in 'index.php'
    } else if (!addEditPaneIsFocused || xBtn || addTaskButtonClicked && addEditTaskPane.style.visibility == 'visible') {
        addEditTaskPane.style.visibility = 'hidden';  // addEditTaskPane declared in 'index.php'
        dimmedOverlay.style.display = 'none';  // dimmedOverlay declared in 'index.php'
    }

    // clicking add task pane button to OPEN addTaskPane
    if (addTaskButtonClicked && addEditTaskPane.style.visibility == 'hidden') {     // addEditTaskPane declared in 'index.php'
        // console.log('button clicked sos');
        // tell system we're NOT IN EDIT MODE
        isEditMode = false;

        // clearing fields (in case previously used by Edit mode)
        if (isEditMode === false) {
            document.getElementById('tName').value = '';
            document.getElementById('tDescription').value = '';
            document.getElementById('tDate').value = '';
            document.getElementById('tTime').value = '';
            prioritySelection.innerText = '';
            difficultySelection.innerText = '';
            // pane title
            addEditTaskPaneTitle.innerHTML = '';    // clear previous title
            addEditTaskPaneTitle.innerText = 'New Task';    // add task mode title
            // button group setting: add task mode
            // clearing '.edit-task-btn-group-setting' style
            addEditTaskPaneButtonGroup.classList.remove('edit-task-btn-group-setting');
            deleteTaskButton.style.display = 'none';
            saveTaskButton.classList.remove('edit-task-btn-group-setting');

            // adding '.add-task-btn-group' style
            // addEditTaskPaneButtonGroup.classList.add('add-task-btn-group');   // addEditTaskPaneButtonGroup declared in 'index.php'
            saveTaskButton.classList.add('add-task-btn-group');
        }

        // pane & overlay visibility
        addEditTaskPane.style.visibility = 'visible';  // addEditTaskPane declared in 'index.php'
        dimmedOverlay.style.display = 'block';  // dimmedOverlay declared in 'index.php'
    }


    // EDIT TASK PANE
    // click listener on task strip
    // const taskStrip = document.querySelectorAll('.task-list-strip');
    // const taskStripClicked = taskStrip.contains(event.target);

    // // open edit task pane when task strip clicked
    // if (taskStripClicked && addEditTaskPane.style.visibility == 'hidden') {
    //     console.log('task strip clicked');
    //     addEditTaskPane.style.visibility = 'visible';
    //     dimmedOverlay.style.display = 'block';
    // }
}

// trigger toggleAddEditTaskPane() upon click
document.addEventListener('click', toggleAddEditTaskPane);




// PRIORITY PANE
// DISPLAY SETTINGS
// Initialising priority-title-description
const priorityDescriptionDiv = document.getElementById('priorityDescription');
// Initiallising priority selection buttons
const highpriority = document.getElementById('highPriority');
const mediumpriority = document.getElementById('mediumPriority');
const lowpriority = document.getElementById('lowPriority');

// when priority 'select' dropdown is clicked
document.getElementById('prioritySelect').addEventListener('click', function(event) {
    // open priority pane & listen for priority setting
    prioritypane.style.visibility = 'visible';
    priorityDifficultyPaneIsActive = true;
});

// TEXT CHANGE on button hover
// high priority
// on hover
highpriority.addEventListener('mouseover', () => {
    priorityDescriptionDiv.innerHTML = 'I really need to get this done soon!';
    priorityDescriptionDiv.style.fontSize = '18px';
    priorityDescriptionDiv.classList.add('is-visible');
});
// out of hover -> restore default title text
highpriority.addEventListener('mouseout', () => {
    // making sure transition fully fades out first before clearing text - no illusion of sudden 'blip-out'
    setTimeout(() => {
        priorityDescriptionDiv.classList.remove('is-visible');
    }, 50);
    priorityDescriptionDiv.innerHTML = '';
});

// medium priority
mediumpriority.addEventListener('mouseover', () => {
    priorityDescriptionDiv.innerHTML = "Important, but doesn't need to be done right now";
    priorityDescriptionDiv.style.fontSize = '18px';
    priorityDescriptionDiv.classList.add('is-visible');
});
// out of hover -> restore default title text
mediumpriority.addEventListener('mouseout', () => {
    // making sure transition fully fades out first before clearing text - no illusion of sudden 'blip-out'
    setTimeout(() => {
        priorityDescriptionDiv.classList.remove('is-visible');
    }, 50);
    priorityDescriptionDiv.innerHTML = '';
});

// low priority
lowpriority.addEventListener('mouseover', () => {
    priorityDescriptionDiv.innerHTML = "Nice to do if I have time - no pressure!";
    priorityDescriptionDiv.style.fontSize = '18px';
    priorityDescriptionDiv.classList.add('is-visible');
});
// out of hover -> restore default title text
lowpriority.addEventListener('mouseout', () => {
    // making sure transition fully fades out first before clearing text - no illusion of sudden 'blip-out'
    setTimeout(() => {
        priorityDescriptionDiv.classList.remove('is-visible');
    }, 50);
    priorityDescriptionDiv.innerHTML = '';
});



// USER SELECTION SETTINGS: PRIORITY
document.addEventListener('click', function(event) {
    // Initialising variables' hypothetical 'clicked' state
    const highPClick = highpriority.contains(event.target);
    const mediumPClick = mediumpriority.contains(event.target);
    const lowPClick = lowpriority.contains(event.target);
    const cancelPClick = document.getElementById('cancelPriority').contains(event.target);

    // configuring appropriate value passing according to user click
    if (highPClick == true) {
        // populate 'select dropdown'
        prioritySelection.innerHTML = 'high';
        // close pane
        prioritypane.style.visibility = 'hidden';
        // indicate priority pane as inactive
        priorityDifficultyPaneIsActive = false;

    } else if (mediumPClick == true) {
        // populate 'select dropdown'
        prioritySelection.innerHTML = 'medium';
        // close pane
        prioritypane.style.visibility = 'hidden';
        // indicate priority pane as inactive
        priorityDifficultyPaneIsActive = false;
        
    } else if (lowPClick == true) {
        // populate 'select dropdown'
        prioritySelection.innerHTML = 'low';
        // close pane
        prioritypane.style.visibility = 'hidden';
        // indicate priority pane as inactive
        priorityDifficultyPaneIsActive = false;
    }

    // if cancel button clicked, remove priority rating + close pane
    if (cancelPClick == true) {
        prioritySelection.innerHTML = '';
        prioritypane.style.visibility = 'hidden';
        // indicate priority pane as inactive
        priorityDifficultyPaneIsActive = false;
    }
});







// DIFFICULTY PANE
// DISPLAY SETTINGS
// Initialising priority-title-description
const difficultyDescriptionDiv = document.getElementById('difficultyDescription');
// Initiallising priority selection buttons
const easydifficulty = document.getElementById('easyDifficulty');
const mediumdifficulty = document.getElementById('mediumDifficulty');
const harddifficulty = document.getElementById('hardDifficulty');


// when difficulty 'select' dropdown clicked
document.getElementById('difficultySelect').addEventListener('click', function(event) {
    // open priority pane & listen for priority setting
    difficultypane.style.visibility = 'visible';
    priorityDifficultyPaneIsActive = true;
});

// TEXT CHANGE on button hover
// easy difficulty
// on hover
easydifficulty.addEventListener('mouseover', () => {
    difficultyDescriptionDiv.innerHTML = "Doesn't actually take much effort - possible to knock this out quickly!";
    difficultyDescriptionDiv.style.fontSize = '18px';
    difficultyDescriptionDiv.classList.add('is-visible');
});
// out of hover -> restore default title text
easydifficulty.addEventListener('mouseout', () => {
    // making sure transition fully fades out first before clearing text - no illusion of sudden 'blip-out'
    setTimeout(() => {
        difficultyDescriptionDiv.classList.remove('is-visible');
    }, 50);
    difficultyDescriptionDiv.innerHTML = '';
});

// medium difficulty
mediumdifficulty.addEventListener('mouseover', () => {
    difficultyDescriptionDiv.innerHTML = "Takes a little more energy or a few steps, but it's doable!";
    difficultyDescriptionDiv.style.fontSize = '18px';
    difficultyDescriptionDiv.classList.add('is-visible');
});
// out of hover -> restore default title text
mediumdifficulty.addEventListener('mouseout', () => {
    // making sure transition fully fades out first before clearing text - no illusion of sudden 'blip-out'
    setTimeout(() => {
        difficultyDescriptionDiv.classList.remove('is-visible');
    }, 50);
    difficultyDescriptionDiv.innerHTML = '';
});

// hard difficulty
harddifficulty.addEventListener('mouseover', () => {
    difficultyDescriptionDiv.innerHTML = "Feels heavy or complex to complete - I'll need more time and energy to get into it";
    difficultyDescriptionDiv.style.fontSize = '18px';
    difficultyDescriptionDiv.classList.add('is-visible');
});
// out of hover -> restore default title text
harddifficulty.addEventListener('mouseout', () => {
    // making sure transition fully fades out first before clearing text - no illusion of sudden 'blip-out'
    setTimeout(() => {
        difficultyDescriptionDiv.classList.remove('is-visible');
    }, 50);
    difficultyDescriptionDiv.innerHTML = '';
});



// USER SELECTION SETTINGS: DIFFICULTY
document.addEventListener('click', function(event) {
    // Initialising variables' hypothetical 'clicked' state
    const easyDClick = easydifficulty.contains(event.target);
    const mediumDClick = mediumdifficulty.contains(event.target);
    const hardDClick = harddifficulty.contains(event.target);
    const cancelDClick = document.getElementById('cancelDifficulty').contains(event.target);


    // configuring appropriate value passing according to user click
    if (easyDClick == true) {
        // populate 'select dropdown'
        difficultySelection.innerHTML = 'easy';
        // close pane
        difficultypane.style.visibility = 'hidden';
        // indicate priority pane as inactive
        priorityDifficultyPaneIsActive = false;

    } else if (mediumDClick == true) {
        // populate 'select dropdown'
        difficultySelection.innerHTML = 'medium';
        // close pane
        difficultypane.style.visibility = 'hidden';
        // indicate priority pane as inactive
        priorityDifficultyPaneIsActive = false;
        
    } else if (hardDClick == true) {
        // populate 'select dropdown'
        difficultySelection.innerHTML = 'hard';
        // close pane
        difficultypane.style.visibility = 'hidden';
        // indicate priority pane as inactive
        priorityDifficultyPaneIsActive = false;
    }

    // if cancel button clicked, remove priority rating + close pane
    if (cancelDClick == true) {
        difficultySelection.innerHTML = '';
        difficultypane.style.visibility = 'hidden';
        // indicate priority pane as inactive
        priorityDifficultyPaneIsActive = false;
    }
});







// ADD NEW TASK
// test
document.getElementById('addTaskForm').addEventListener('submit', function(event) {
    event.preventDefault();  // preventing default submit sequence from the event [which is the clicked submit button]

    // checking if we're supposed to be in edit mode instead of add mode (this needs to be done this way as add & edit are sharing states)
    if (isEditMode) {
        // 'this' passes the form data/state to the other function    --> no need for tedious getElementById to fetch form field data
        saveEditTask(this);     // declared in 'edittaskpane.js'
        return;     // exiting this function, do not execute anymore beyond this point
    }

    // IF DATE SET WITHOUT TIME
    const dateInput = document.getElementById('tDate');
    const timeInput = document.getElementById('tTime');
    // variable for default reminder time if not set
    let time = '';
    if (dateInput.value && !timeInput.value) {
        time = '09:00:00';
    } else {
        time = timeInput.value;
    }

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
        taskName: this.taskname.value,
        taskDescription: this.taskdescription.value,
        reminderDate: this.reminderdate.value,
        reminderTime: time,
        taskPriority: priorityMark,  
        taskDifficulty: difficultyMark,
        taskProgress: this.progstatus.value
    };
    // console.log(formData);  // debug

    // sending form data to backend file
    fetch('db/add_task_db.php', {
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
            this.taskname.value = '';
            this.taskdescription.value = '';
            this.reminderdate.value = '';
            this.remindertime.value = '';
            prioritySelection.innerHTML = '';       // does not need 'this' reference cos they were declared 
            difficultySelection.innerHTML = '';     // outside of the form d, unlike the other form elements that weren't

            // closing add new task pane
            addEditTaskPane.style.visibility = 'hidden';  // addEditTaskPane declared in 'index.php'
            dimmedOverlay.style.display = 'none';  // dimmedOverlay declared in 'index.php'

            // Update task list display
            // clear list first then re-render list
            document.querySelectorAll('.task-list-li').forEach(strip => {
                strip.remove();
            });
            loadTasks();
            newTaskBtn.style.visibility = 'visible';

            // visibility of system status (usability heuristics)
            message.innerHTML = 'Successfully added task';      
            message.style.color = 'green';
            message.style.backgroundColor = '#9CFFB0';          // message declared in 'index.php'
            message.style.visibility = 'visible';
            // hiding message after 3s
            setTimeout(() => {
                message.style.visibility = 'hidden';
            }, 3000);
        } else if (data.status == 'fail') {
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
        } else if (data.status == 'invalid') {
            // debug
            // console.log(data.status, ', ', data.message);
            // console.log(message);
            // visibility of system status (usability heuristics)
            message.innerHTML = data.message;
            message.style.color = 'black';
            message.style.backgroundColor = '#FF9999';      // message declared in 'index.php'
            message.style.visibility = 'visible';
            // hiding message after 3s
            setTimeout(() => {
                message.style.visibility = 'hidden';
            }, 5000);
        }


        // Update task list display
        // clear list first then re-render list
        // document.querySelectorAll('.task-list-li').forEach(strip => {
        //     strip.remove();
        // });
        // loadTasks();
        // newTaskBtn.style.visibility = 'visible';
    })
    .catch(error => console.error('Error adding task: ', error));
});







// document.getElementById('addTaskForm').addEventListener('submit', function(event) {
//     event.preventDefault();  // preventing default submit sequence from the event [which is the clicked submit button]

//     // FILTER THROUGH PRIORITY + DIFFICULTY INPUT
//     let priorityMark = 0;
//     let difficultyMark = 0;

//     // priority selection
//     if (prioritySelection.innerText == 'high') {
//         priorityMark = 1;
//     } else if (prioritySelection.innerText == 'medium') {
//         priorityMark = 2;
//     } else if (prioritySelection.innerText == 'low') {
//         priorityMark = 3;
//     } else if (prioritySelection.innerText == '') {
//         priorityMark = 3;
//     }
//     // difficulty selection
//     if (difficultySelection.innerText == 'easy') {
//         difficultyMark = 1;
//     } else if (difficultySelection.innerText == 'medium') {
//         difficultyMark = 2;
//     } else if (difficultySelection.innerText == 'hard') {
//         difficultyMark = 3;
//     } else if (difficultySelection.innerText == '') {
//         difficultyMark = 2;
//     }

//     // manually putting user input form data into an object to be sent over to backend
//     const formData = {
//         taskName: this.taskname.value,
//         taskDescription: this.taskdescription.value,
//         reminderDate: this.reminderdate.value,
//         reminderTime: this.remindertime.value,
//         taskPriority: priorityMark,  
//         taskDifficulty: difficultyMark
//     };
//     console.log(formData);  // debug

//     // sending form data to backend file
//     fetch('http:/Aiya Just Do It (FYP retake)/db/add_task_db.php', {
//         method: 'POST',
//         headers: {
//             'Content-Type':'application/json'
//         },
//         body: JSON.stringify(formData)
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.status == 'success') {
//             // clear input fields
//             this.taskname.value = '';
//             this.taskdescription.value = '';
//             this.reminderdate.value = '';
//             this.remindertime.value = '';
//             prioritySelection.innerHTML = '';       // does not need 'this' reference cos they were declared 
//             difficultySelection.innerHTML = '';     // outside of the form d, unlike the other form elements that weren't

//             // closing add new task pane
//             addEditTaskPane.style.visibility = 'hidden';  // addEditTaskPane declared in 'index.php'
//             dimmedOverlay.style.display = 'none';  // dimmedOverlay declared in 'index.php'

//             // visibility of system status (usability heuristics)
//             message.innerHTML = 'Successfully added task';      
//             message.style.color = 'green';
//             message.style.backgroundColor = '#9CFFB0';          // message declared in 'index.php'
//             message.style.visibility = 'visible';
//             // hiding message after 3s
//             setTimeout(() => {
//                 message.style.visibility = 'hidden';
//             }, 3000);
//         } else {
//             // visibility of system status (usability heuristics)
//             message.innerHTML = data.message;
//             message.style.color = 'black';
//             message.style.backgroundColor = '#FF9999';      // message declared in 'index.php'
//             message.style.visibility = 'visible';
//             // hiding message after 3s
//             setTimeout(() => {
//                 message.style.visibility = 'hidden';
//             }, 3000);

//             // temporarily logging backend error to console
//             console.log(data.log);
//         }


//         // Update task list display
//         // clear list first then re-render list
//         document.querySelectorAll('.task-list-li').forEach(strip => {
//             strip.remove();
//         });
//         loadTasks();
//         newTaskBtn.style.visibility = 'visible';
//     })
//     .catch(error => console.error('Error adding task: ', error));
// });