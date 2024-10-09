let inputTask = document.getElementById("inputTask");
let addTask = document.getElementById("addTask");
let taskList = document.getElementById("taskList");
//let inputCheckBox = document.getElementById("inputCheckBox");
//let editBtn = document.getElementById("editBtn");
//let deleteBtn = document.getElementById("deleteBtn");

let generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
};

let saveTasksToLocalStorage = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

let removeTasksFromLocalStorage = () => {
  localStorage.removeItem("tasks");
};

let getTasksFromLocalStorage = () => {
  let tasks = localStorage.getItem("tasks");
  if (tasks) {
    return JSON.parse(tasks);
  }
  return [];
};

let tasks = getTasksFromLocalStorage();
console.log(tasks);

let addToList = (bool, id) => {
  let newList = [];
  tasks.map((task) => {
    if (task.id === id) {
      task.isCompleted = bool;
    }
    newList.push(task);
  });

  console.log("newList: " + newList);
  removeTasksFromLocalStorage();
  saveTasksToLocalStorage(newList);
};
let taskTemplate = (task, id, status) => {
  console.log("executing task");
  let li = document.createElement("li");
  li.classList.add("taskContainer");
  li.setAttribute("id", id);

  let container = document.createElement("div");
  let checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.checked = status;

  checkBox.classList.add("checkBox");
  container.appendChild(checkBox);
  li.appendChild(container);
  let taskParaContainer = document.createElement("div");
  taskParaContainer.classList.add("taskParaContainer");
  let paraEle = document.createElement("p");
  paraEle.classList.add("paraEle");
  paraEle.textContent = task;
  taskParaContainer.appendChild(paraEle);
  if (status) {
    paraEle.classList.add("paraLine");
  }
  let deleteBtnEle = document.createElement("button");
  deleteBtnEle.setAttribute("class", "editBtn");
  deleteBtnEle.setAttribute("id", "deleteBtn");
  deleteBtnEle.innerHTML = `<i class="fas fa-trash delete-icon"></i>
`;
  taskParaContainer.appendChild(deleteBtnEle);
  li.appendChild(taskParaContainer);
  taskList.appendChild(li);
  deleteBtnEle.addEventListener("click", () => {
    deleteTask(id);
  });
  checkBox.addEventListener("click", () => {
    console.log(checkBox.checked);
    if (checkBox.checked) {
      addToList(true, id);
      paraEle.classList.add("paraLine");
    } else {
      addToList(false, id);
      paraEle.classList.remove("paraLine");
    }
  });
  /*
  return `
   <li class="taskContainer" key=${id}>
            <div>
              <input id="inputCheckBox" type="checkbox" class="checkBox" />
            </div>
            <div class="taskParaContainer">
              <p class="paraEle">${task}</p>
              <div>
                <button class="editBtn" id="deleteBtn">
                  <i class="fas fa-trash delete-icon"></i>
                </button>
              </div>
            </div>
          </li>
          `;*/
};

addTask.addEventListener("click", () => {
  let task = inputTask.value;
  if (task === "") {
    alert("Please enter a task");
    return;
  }
  let newTask = {
    id: generateUniqueId(),
    task: task,
    isCompleted: false,
  };
  tasks.push(newTask);
  taskTemplate(task, newTask.id, newTask.isCompleted);
  inputTask.value = "";
  saveTasksToLocalStorage(tasks);
});

let deleteTask = (id) => {
  let taskContainer = document.getElementById(id);
  taskList.removeChild(taskContainer);
  tasks = tasks.filter((task) => task.id !== id);
  saveTasksToLocalStorage(tasks);
};

for (let i = 0; i < tasks.length; i++) {
  let { task, id, isCompleted } = tasks[i];
  taskTemplate(task, id, isCompleted);
}
