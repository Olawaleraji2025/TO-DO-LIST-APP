// DOM Elements
const taskForm = document.getElementById("addTaskForm");
const taskInput = document.getElementById("taskInput");
const taskPriority = document.getElementById("taskPriority");
const taskCategory = document.getElementById("taskCategory");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");
const filterButtons = document.querySelectorAll(".filter-btn");
const taskCount = document.getElementById("taskCount");
const taskAddBtn = document.getElementById("taskAddBtn");

let currentFilter = "all";

const sampleTasks = [
  {
    id: 1,
    text: "Complete project proposal",
    completed: false,
    priority: "high",
    category: "work",
    createdAt: new Date(),
  },
  {
    id: 2,
    text: "Buy groceries",
    completed: false,
    priority: "medium",
    category: "shopping",
    createdAt: new Date(),
  },
  {
    id: 3,
    text: "Call mom",
    completed: true,
    priority: "low",
    category: "personal",
    createdAt: new Date(),
  },
  {
    id: 4,
    text: "Morning workout",
    completed: false,
    priority: "medium",
    category: "personal",
    createdAt: new Date(),
  },
  {
    id: 5,
    text: "Read 30 pages",
    completed: false,
    priority: "low",
    category: "personal",
    createdAt: new Date(),
  },
  {
    id: 6,
    text: "Prepare presentation",
    completed: false,
    priority: "high",
    category: "work",
    createdAt: new Date(),
  },
  {
    id: 7,
    text: "Pay electricity bill",
    completed: false,
    priority: "medium",
    category: "personal",
    createdAt: new Date(),
  },
  {
    id: 8,
    text: "Schedule dentist appointment",
    completed: true,
    priority: "low",
    category: "personal",
    createdAt: new Date(),
  },
  {
    id: 9,
    text: "Research new technologies",
    completed: false,
    priority: "high",
    category: "work",
    createdAt: new Date(),
  },
  {
    id: 10,
    text: "Organize workspace",
    completed: false,
    priority: "medium",
    category: "work",
    createdAt: new Date(),
  },
  {
    id: 11,
    text: "Plan weekend trip",
    completed: false,
    priority: "low",
    category: "personal",
    createdAt: new Date(),
  },
  {
    id: 12,
    text: "Update resume",
    completed: false,
    priority: "high",
    category: "work",
    createdAt: new Date(),
  },
  {
    id: 13,
    text: "Water plants",
    completed: true,
    priority: "low",
    category: "personal",
    createdAt: new Date(),
  },
  {
    id: 14,
    text: "Backup computer files",
    completed: false,
    priority: "medium",
    category: "work",
    createdAt: new Date(),
  },
  {
    id: 15,
    text: "Learn new recipe",
    completed: false,
    priority: "low",
    category: "personal",
    createdAt: new Date(),
  },
  {
    id: 16,
    text: "Clean garage",
    completed: false,
    priority: "medium",
    category: "personal",
    createdAt: new Date(),
  },
  {
    id: 17,
    text: "Review budget",
    completed: false,
    priority: "high",
    category: "personal",
    createdAt: new Date(),
  },
  {
    id: 18,
    text: "Write blog post",
    completed: false,
    priority: "medium",
    category: "work",
    createdAt: new Date(),
  },
  {
    id: 19,
    text: "Meditate for 10 minutes",
    completed: true,
    priority: "low",
    category: "personal",
    createdAt: new Date(),
  },
  {
    id: 20,
    text: "Fix leaking faucet",
    completed: false,
    priority: "high",
    category: "personal",
    createdAt: new Date(),
  },
  {
    id: 21,
    text: "Organize photos",
    completed: false,
    priority: "low",
    category: "personal",
    createdAt: new Date(),
  },
  {
    id: 22,
    text: "Study for certification",
    completed: false,
    priority: "high",
    category: "work",
    createdAt: new Date(),
  },
  {
    id: 23,
    text: "Donate old clothes",
    completed: false,
    priority: "medium",
    category: "personal",
    createdAt: new Date(),
  },
  {
    id: 24,
    text: "Setup new router",
    completed: false,
    priority: "high",
    category: "personal",
    createdAt: new Date(),
  },
  {
    id: 25,
    text: "Create workout plan",
    completed: false,
    priority: "medium",
    category: "personal",
    createdAt: new Date(),
  },
  {
    id: 26,
    text: "Review meeting notes",
    completed: true,
    priority: "low",
    category: "work",
    createdAt: new Date(),
  },
  {
    id: 27,
    text: "Buy birthday gift",
    completed: false,
    priority: "medium",
    category: "shopping",
    createdAt: new Date(),
  },
  {
    id: 28,
    text: "Test new software",
    completed: false,
    priority: "high",
    category: "work",
    createdAt: new Date(),
  },
  {
    id: 29,
    text: "Organize bookshelf",
    completed: false,
    priority: "low",
    category: "personal",
    createdAt: new Date(),
  },
  {
    id: 30,
    text: "Schedule team building",
    completed: false,
    priority: "medium",
    category: "work",
    createdAt: new Date(),
  },

];

// localStorage.setItem("tasks", JSON.stringify(sampleTasks));


// This will work when the webpage finish loading
document.addEventListener("DOMContentLoaded", () => {
  // localStorage.setItem("tasks" ,JSON.stringify(sampleTasks))
  // Initialize localStorage with sampleTasks if empty
  if (!localStorage.getItem("tasks")) {
    localStorage.setItem("tasks", JSON.stringify(sampleTasks));
  }
  setupEventListeners();
});


// This is to prevent the default behaviour of the form input
function setupEventListeners() {
  // This is to prevent to default behaviour of the Form field
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addTask();
  });


  // This will run whenever a target is clicked on in the taskList element
  taskList.addEventListener("click", (e) => {
    const taskElement = e.target.closest(".task-item");
    // console.log(taskElement);
    
    if (!taskElement) return;

    const taskId = parseInt(taskElement.getAttribute("data-id"));
    
    if (e.target.classList.contains("delete-btn")) {
      deleteTask(taskId);
    } else if (e.target.classList.contains("task-checkbox")) {
      toggleTask(taskId);
    } else if (e.target.classList.contains("edit-btn")) {
      editTaskInline(taskId);
    }
  });

  // Filter buttons
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      currentFilter = button.dataset.filter;
      
      loadTasks();
    });
  });
  loadTasks()
}


// This will get the tasks from the local storage
function getTask() {
  const tasks = localStorage.getItem("tasks");
  
  if (tasks) {
    return JSON.parse(tasks)
  } else {
    return [];
  }
}

// This will save the tasks
function saveTask(newTask) {
  localStorage.setItem("tasks", JSON.stringify(newTask))
}


// This function will send the new tasks to the DOM
function renderTasks(tasks) {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const taskElement = document.createElement("div");
    taskElement.className = "task-item";
    taskElement.setAttribute("data-id", task.id);
    taskElement.setAttribute("data-text", task.text);
    taskElement.setAttribute("data-completed", task.completed);
    taskElement.setAttribute("data-priority", task.priority);
    taskElement.setAttribute("data-category", task.category);

    taskElement.innerHTML = `
    <div class="tasks-text-container">
      <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
      <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
      <span class="task-priority priority-${task.priority}">${task.priority}</span>
      <span class="task-category">${task.category}</span>
      </div>
      <div class="edit-container">
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
      </div>
    `;

    taskList.appendChild(taskElement);
  });

}



// This is the format in which new tasks will be sent
function addTask() {
  const tasks = getTask();
  const newTask = {
      id: Date.now(),
      text: taskInput.value,
      completed: false,
      priority: taskPriority.value,
      category: taskCategory.value,
      createdAt: new Date(),
    };

if(taskInput.value === "")
  return alert("Please enter a Task");

  
      tasks.unshift(newTask);
      saveTask(tasks);
      taskInput.value = "";
  
      renderTasks(tasks);

}
  




// This function is for deleting tasks
function deleteTask(taskId) {
  const tasks = getTask();
  const updatedTasks = tasks.filter(task => task.id !== taskId);
  saveTask(updatedTasks);
  loadTasks();
}

// This function is for toggling tasks
function toggleTask(taskId) {
  const tasks = getTask();
  const task = tasks.find(task => task.id === taskId);
  if (task) {
    task.completed = !task.completed;
    saveTask(tasks);
    loadTasks();
  }
}

// This function will Display tasks based on their categories
function loadTasks() {
  const tasks = getTask();

  let filteredTasks = tasks;
  if (currentFilter === "active") {
    filteredTasks = tasks.filter(task => !task.completed);
  } else if (currentFilter === "completed") {
    filteredTasks = tasks.filter(task => task.completed);
  }

  renderTasks(filteredTasks);
  // console.log(filteredTasks);

  // this is to Update task count
  taskCount.textContent = filteredTasks.length;
}

// Edit task text
function editTask(taskId, newText) {
  const tasks = getTask();
  const task = tasks.find(task => task.id === taskId);
  if (task && newText.trim()) {
    task.text = newText.trim();
    saveTask(tasks);
    loadTasks();
  }
}

// Inline edit functionality
function editTaskInline(taskId) {
  const taskElement = document.querySelector(`[data-id="${taskId}"]`);
  if (!taskElement) return;

  const taskTextSpan = taskElement.querySelector('.task-text');
  const originalText = taskTextSpan.textContent;

  const input = document.createElement('input');
  input.type = 'text';
  input.value = originalText;
  input.className = 'task-edit-input';

  taskTextSpan.replaceWith(input);
  input.focus();
  input.select();

  const saveEdit = () => {
    const newText = input.value.trim();
    if (newText && newText !== originalText) {
      editTask(taskId, newText);
    } else {
      loadTasks(); 
    }
  };

  input.addEventListener('blur', saveEdit);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      renderTasks(getTask()); 
    }
  });
}

