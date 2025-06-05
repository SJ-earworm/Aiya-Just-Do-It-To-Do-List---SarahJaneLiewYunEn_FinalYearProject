// HANDLE CASE WHERE USER MARKS TASK AS COMPLETE & INCOMPLETE
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
            // response message here
        })
    }
    // if unchecked, mark as incomplete
}