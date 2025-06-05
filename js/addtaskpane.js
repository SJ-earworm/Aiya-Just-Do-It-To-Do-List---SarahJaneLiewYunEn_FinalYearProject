// TASK PANE CONTROLS
function toggleNewTaskPane() {
    console.log('button clicked');
    if (addtaskpane.style.visibility == 'visible') {
        addtaskpane.style.visibility = 'hidden';
    } else {
        addtaskpane.style.visibility = 'visible';
    }
}


// ADD NEW TASK
document.getElementById('addTaskForm').addEventListener('submit', function(e) {
    e.preventDefault();  // preventing default submit sequence

    // manually putting user input form data into an object to be sent over to backend
    const formData = {
        taskName: this.taskname.value,
        taskDescription: this.taskdescription.value,
        reminderDate: this.reminderdate.value,
        reminderTime: this.remindertime.value,
        taskPriority: "",  
        taskDifficulty: ""
    };
    console.log(formData);  // debug

    // sending form data to backend file
    fetch('http:/Aiya Just Do It (FYP retake)/db/add_task_db.php', {
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
            // priority + difficulty

            message.innerHTML = 'Successfully added task';
            message.style.color = 'green';
            message.style.backgroundColor = '#9CFFB0';
            message.style.visibility = 'visible';
            // hiding message after 3s
            setTimeout(() => {
                message.style.visibility = 'hidden';
            }, 3000);
        } else {
            message.innerHTML = data.message;
            message.style.color = 'black';
            message.style.backgroundColor = '#FF9999';
            message.style.visibility = 'visible';
            // hiding message after 3s
            setTimeout(() => {
                message.style.visibility = 'hidden';
            }, 3000);

            // temporarily logging backend error to console
            console.log(data.log);
        }
    })
});