document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
});

function loadTasks() {
    fetch("http://localhost:8081/task")
        .then(response => response.json())
        .then(tasks => {
            const taskList = document.querySelector(".task-list");
            taskList.innerHTML = "";

            tasks.forEach(task => {
                const taskItem = document.createElement("li");
                taskItem.classList.add("task");
                taskItem.id = `task-${task.id}`;

                const name = document.createElement("p");
                name.textContent = task.name;

                const taskButtons = document.createElement("div");
                taskButtons.classList.add("task-buttons");

                const checkImg = document.createElement("img");
                checkImg.src = "images/check.png";
                checkImg.alt = "ok-in-task";

                checkImg.addEventListener("click", function () {
                    completeTask(task.id);
                });

                const viewLink = document.createElement("a");
                viewLink.href = `/task/${task.id}`;
                const viewImg = document.createElement("img");
                viewImg.src = "images/search.png";
                viewImg.alt = "view-task";
                viewLink.appendChild(viewImg);

                const deleteLink = document.createElement("a");
                deleteLink.href = "#";
                deleteLink.addEventListener("click", function () {
                    deleteTask(task.id);
                });
                const deleteImg = document.createElement("img");
                deleteImg.src = "images/remove.png";
                deleteImg.alt = "delete-task";
                deleteLink.appendChild(deleteImg);

                taskButtons.appendChild(checkImg);
                taskButtons.appendChild(viewLink);
                taskButtons.appendChild(deleteLink);

                taskItem.appendChild(name);
                taskItem.appendChild(taskButtons);
                taskList.appendChild(taskItem);
            });
        })
        .catch(error => console.error("Erro ao carregar tarefas:", error));
}


function addTask() {
    const nameInput = document.querySelector(".task-input");
    const descInput = document.querySelector(".description-input");

    if (!nameInput.value.trim()) {
        alert("O nome da tarefa não pode estar vazio!");
        return;
    }

    const newTask = {
        name: nameInput.value,
        description: descInput.value
    };

    fetch("http://localhost:8081/task", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newTask)
    })
    .then(response => response.json())
    .then(() => {
        nameInput.value = "";
        descInput.value = "";
        loadTasks();
    })
    .catch(error => console.error("Erro ao adicionar tarefa:", error));
}

function deleteTask(taskId) {
    fetch(`http://localhost:8081/task/${taskId}`, {
        method: "DELETE"
    })
    .then(() => {
        loadTasks();
    })
    .catch(error => console.error("Erro ao excluir tarefa:", error));
}

function completeTask(taskId) {
    const taskItem = document.getElementById(`task-${taskId}`);

    if (taskItem) {
        taskItem.classList.toggle("completed");
    }
}
