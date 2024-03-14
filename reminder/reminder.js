if ("Notification" in window){
    Notification.requestPermission().then(function(permission){
    if (Notification.permission!=="granted"){
        alert("please allow notification access !");
        location.reload()
    }
    })
}

var timeoutIds = [];
isValid = true;

function scheldudedReminder(){
    var title = document.getElementById('title').value;
    var description = document.getElementById('description').value;
    var date = document.getElementById('date').value;
    var time = document.getElementById('Time').value;

    var dateTimeString = date + " " + time;
    var scheldudedTime = new Date(dateTimeString);
    var currentTime = new Date();
    var timeDifference = scheldudedTime - currentTime;

    if (timeDifference > 0){
        addReminder(title, description, dateTimeString);

        var timeoutId = setTimeout(function(){
            document.getElementById('notificationSound').play();
            
            var notification = new Notification(title,{body:description,
            requireInteraction:true,
        })
        },timeDifference);
        timeoutIds.push(timeoutId);
    } else{
        alert('the scheldude time is in the past!')
    }
} 

function addReminder(title,description,dateTimeString){
    var tableBody = document.getElementById('reminderTableBody');
    var row = tableBody.insertRow();
    var titleCell = row.insertCell(0);
    var descriptionCell = row.insertCell(1);
    var dateTimeCell = row.insertCell(2);
    var actionCell = row.insertCell(3);
    
    titleCell.innerHTML = title;
    descriptionCell.innerHTML = description;
    dateTimeCell.innerHTML = dateTimeString;
    actionCell.innerHTML = '<button onclick = "deleteRemainder(this);"> delete </button>';

}

function deleteRemainder(button){
    var row = button.closest("tr");
    var index = row.rowIndex;
    clearTimeout(timeoutIds[index - 1]);
    timeoutIds.splice(index-1, 1);
    row.remove();
}

