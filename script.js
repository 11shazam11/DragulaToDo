document.addEventListener("DOMContentLoaded", function () {
  const pendingList = document.getElementById("pending");
  const doneList = document.getElementById("done");

  const drake = dragula([pendingList, doneList], {
    revertOnSpill: true,
  });

  // Load tasks from localStorage
  loadTasks();

  drake.on("drop", function (el, target) {
    if (target === doneList) {
      el.style.backgroundColor = "#28a745"; // Green for Done
    } else if (target === pendingList) {
      el.style.backgroundColor = "#dc3545"; // Red for Pending
    }
    saveTasks();
  });
});

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const task = document.createElement("div");
  task.classList.add("task");
  task.textContent = taskText;
  task.style.backgroundColor = "#dc3545"; // Default Pending color

  document.getElementById("pending").appendChild(task);
  taskInput.value = "";

  saveTasks();
}

function saveTasks() {
  const tasks = {
    pending: [],
    done: [],
  };

  document.querySelectorAll("#pending .task").forEach((task) => {
    tasks.pending.push(task.textContent);
  });

  document.querySelectorAll("#done .task").forEach((task) => {
    tasks.done.push(task.textContent);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (!savedTasks) return;

  savedTasks.pending.forEach((taskText) => {
    const task = document.createElement("div");
    task.classList.add("task");
    task.textContent = taskText;
    task.style.backgroundColor = "#dc3545"; // Red for Pending
    document.getElementById("pending").appendChild(task);
  });

  savedTasks.done.forEach((taskText) => {
    const task = document.createElement("div");
    task.classList.add("task");
    task.textContent = taskText;
    task.style.backgroundColor = "#28a745"; // Green for Done
    document.getElementById("done").appendChild(task);
  });
}
