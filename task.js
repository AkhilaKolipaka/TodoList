// Get references to the elements
var taskInput = document.getElementById("ct-btn");
var addTaskButton = document.getElementById("add-btn");
var taskList = document.getElementById("taskList");
var addedTasks = {};
function addTask() {
    var taskName = taskInput.value;
    if (taskName.trim() === "") {
        alert("Please enter a taskname.");
        return;
    }
    if (!addedTasks[taskName]) {
        addTaskRow(taskName);
        taskInput.value = "";
    }
    else {
        alert("Task already added.Please enter a different task name!");
    }
    // Function to add a task row to the task list
    function addTaskRow(taskName) {
        var taskRow = document.createElement("div");
        taskRow.classList.add("task-row");
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("cbx");
        var taskBox = document.createElement("input");
        taskBox.type = "text";
        taskBox.classList.add("task-box");
        taskBox.value = taskName;
        taskBox.readOnly = true;
        var statusDropdown = document.createElement("select");
        statusDropdown.classList.add("drpdwn");
        var statusOptions = ["Todo", "Inprogress", "Completed"];
        for (var _i = 0, statusOptions_1 = statusOptions; _i < statusOptions_1.length; _i++) {
            var option = statusOptions_1[_i];
            var optionElement = document.createElement("option");
            optionElement.value = option;
            optionElement.textContent = option;
            statusDropdown.appendChild(optionElement);
        }
        statusDropdown.addEventListener("change", function () {
            var selectedStatus = statusDropdown.value;
            if (selectedStatus === "Completed") {
                checkbox.checked = true;
                taskBox.style.textDecoration = "line-through";
                taskBox.style.color = "grey";
                delete addedTasks[taskName];
            }
            else {
                checkbox.checked = false;
                taskBox.style.textDecoration = "none";
            }
        });
        var deleteButton = document.createElement("button");
        deleteButton.classList.add("btn");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function () {
            taskList.removeChild(taskRow);
            delete addedTasks[taskName];
        });
        taskRow.appendChild(checkbox);
        taskRow.appendChild(taskBox);
        taskRow.appendChild(statusDropdown);
        taskRow.appendChild(deleteButton);
        taskList.appendChild(taskRow);
        addedTasks[taskName] = true;
    }
    // Function to handle adding a new task
}
// Attach the addTask function to the button click
addTaskButton.addEventListener("click", addTask);
var searchInput = document.getElementById("search-box");
if (searchInput) {
    searchInput.addEventListener("input", function () {
        var searchText = searchInput.value.trim().toLowerCase();
        var taskContainers = document.querySelectorAll(".task-row");
        taskContainers.forEach(function (container) {
            var textField = container.querySelector("input[type='text']");
            var shouldDisplay = textField.value.toLowerCase().includes(searchText);
            container.style.display = shouldDisplay ? "block" : "none";
        });
    });
}
