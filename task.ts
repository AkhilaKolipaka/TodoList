// Get references to the elements
const taskInput = document.getElementById("ct-btn") as HTMLInputElement;
const addTaskButton = document.getElementById("add-btn") as HTMLButtonElement;
const taskList = document.getElementById("taskList") as HTMLDivElement;

const addedTasks: Record<string, boolean> = {};
function addTask() {
    const taskName = taskInput.value;

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
function addTaskRow(taskName: string) {

    const taskRow = document.createElement("div");
    taskRow.classList.add("task-row");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("cbx");


    const taskBox = document.createElement("input");
    taskBox.type = "text";
    taskBox.classList.add("task-box");
    taskBox.value = taskName;
    taskBox.readOnly = true;

    const statusDropdown = document.createElement("select");
    statusDropdown.classList.add("drpdwn");
    const statusOptions = ["Todo", "Inprogress", "Completed"];
    for (const option of statusOptions) {
        const optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.textContent = option;
        statusDropdown.appendChild(optionElement);
    }
    statusDropdown.addEventListener("change", () => {
        const selectedStatus = statusDropdown.value;
       
        if (selectedStatus === "Completed") {
            checkbox.checked = true;
            taskBox.style.textDecoration = "line-through";
            taskBox.style.color ="grey" ;
            
            delete addedTasks[taskName];

        } else {
            checkbox.checked = false;
            taskBox.style.textDecoration = "none";
        }
    });
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn")
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
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
const searchInput: HTMLInputElement | null = document.getElementById("search-box") as HTMLInputElement;
if (searchInput) {
    searchInput.addEventListener("input", () => {
        const searchText: string = searchInput.value.trim().toLowerCase();
        const taskContainers: NodeListOf<HTMLDivElement> = document.querySelectorAll(".task-row");
        taskContainers.forEach(container => {
            const textField: HTMLInputElement = container.querySelector("input[type='text']") as HTMLInputElement;
            const shouldDisplay: boolean = textField.value.toLowerCase().includes(searchText);
            container.style.display = shouldDisplay ? "block" : "none";
        });
    });

}

 
