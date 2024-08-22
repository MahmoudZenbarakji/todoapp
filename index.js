let tasks = [];
const tasksPerPage = 10;
let currentPage = 1;

const AddTask = (e) => {
    e.preventDefault(); 
    const TaskInput = document.getElementById("Input_Tasks");
    const text = TaskInput.value.trim();
    if (text) {
        tasks.push({ text: text, completed: false });
        UpdateTaskList();
        TaskInput.value = ''; 
    }
};

const UpdateTaskList = () => {
    let listcontainer = document.getElementById("list_container");
    listcontainer.innerHTML = ""; 


    const start = (currentPage - 1) * tasksPerPage;
    const end = start + tasksPerPage;
    
    
    const pageTasks = tasks.slice(start, end);

    pageTasks.forEach((task, index) => {
        const listitem = document.createElement("li");
        listitem.className = "list-group-item d-flex justify-content-between align-items-center";

        listitem.innerHTML = `
            <div class="task ${task.completed ? "completed" : ""}">
                <input type="checkbox" class="checkbox me-2" ${task.completed ? "checked" : ""} onchange="toggleTaskComplete(${start + index})"/>
                <p class="mb-0">${task.text}</p>
            </div>
            <div class="icons">
                <img src="./img/edit.png" alt="Edit" onclick="editTask(${start + index})" class="me-2">
                <img src="./img/bin.png" alt="Delete" onclick="deleteTask(${start + index})">
            </div>
        `;
        
        listcontainer.append(listitem);
    });

    UpdatePaginationControls();
};

const UpdatePaginationControls = () => {
    let pagination = document.getElementById("pagination");
    pagination.innerHTML = ""; 

    const totalPages = Math.ceil(tasks.length / tasksPerPage);

    
    if (currentPage > 1) {
        pagination.innerHTML += `<li class="page-item"><a class="page-link" href="#" onclick="changePage(${currentPage - 1})">Previous</a></li>`;
    }

    
    for (let i = 1; i <= totalPages; i++) {
        pagination.innerHTML += `<li class="page-item ${i === currentPage ? 'active' : ''}"><a class="page-link" href="#" onclick="changePage(${i})">${i}</a></li>`;
    }

    
    if (currentPage < totalPages) {
        pagination.innerHTML += `<li class="page-item"><a class="page-link" href="#" onclick="changePage(${currentPage + 1})">Next</a></li>`;
    }
};

const changePage = (page) => {
    if (page >= 1 && page <= Math.ceil(tasks.length / tasksPerPage)) {
        currentPage = page;
        UpdateTaskList();
    }
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    UpdateTaskList();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    UpdateTaskList();
};

const editTask = (index) => {
    const newTask = prompt("Edit task:", tasks[index].text);
    if (newTask !== null) {
        tasks[index].text = newTask.trim();
        UpdateTaskList();
    }
};

document.getElementById("taskForm").addEventListener("submit", AddTask);
