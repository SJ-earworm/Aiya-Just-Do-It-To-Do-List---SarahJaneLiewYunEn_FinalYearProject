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
            // temporary
            if (data.status == 'success') {
                console.log('db updated, marked as complete');
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