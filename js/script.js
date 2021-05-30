{
    let tasks = [];
    let hideDoneTasks = false;

    const resetInput = () => {
        const resetField = document.querySelector(".js-newTask");
        resetField.value = "";
    }

    const focusInput = () => {
        const newTaskFocus = document.querySelector(".js-newTask").focus();
        if (newTaskFocus === "") {
            newTaskFocus.focus()
        }
    }

    const addNewTask = (newTaskContent) => {
        tasks = [...tasks, { content: newTaskContent }];
        render();
        resetInput();
        focusInput();
    };

    const markAllTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render();
    };

    const toggelHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    }

    const toggleTaskDone = (taskIndex) => {
        const task = tasks[taskIndex];

        tasks = [
            tasks.slice(0, taskIndex),
            { ...task, done: !task.done },
            ...task.slice(taskIndex + 1),
        ];
        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });

        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });

        });
    }

    const renderTasks = () => {
        const taskToHTML = task => `
            <li class="list__item${task.done && hideDoneTasks ? " list__item--hidden" : ""}">
            <button class="list__button list__button--done js-done">
            ${task.done ? "✓" : ""}
            </button>
            <span class="list__task${task.done ? " list__task--done" : ""}">
            ${task.content}
            </span>
            <button class="list__button list__button--remove js-remove">🗑
            </button>
            </li>
              `
            ;

        const tasksElement = document.querySelector(".js-tasks");
        tasksElement.innerHTML = tasks.map(taskToHTML).join("");

        bindEvents();

    };

    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-button");

        if (!tasks.length) {
            buttonsElement.innerHTML = "";
            return;
        }

        buttonsElement.innerHTML = `
        <button class="buttons__button js-toggleHideDoneTasks">
        ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone </button>
        <button class="buttons__button js-markAllDone"
        ${tasks.every(({ done }) => done) ? " disabled" : ""}>
        Ukończ wszytkie
        </button>
        `;
    };

    const bindButtonsEvents = () => {
        const markAllDoneButtons = document.querySelector(".js-markAllDone");

        if (markAllDoneButtons) {
            markAllDoneButtons.addEventListener("click", markAllTasksDone);
        }

        const toggleHideDoneTasksButtons = document.querySelector(".js-toggleHideDoneTasks");

        if (toggleHideDoneTasksButtons) {
            toggleHideDoneTasksButtons.addEventListener("click", toggelHideDoneTasks);
        }
    };

    const render = () => {
        renderTasks();
        renderButtons();
        bindButtonsEvents();
    };


    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        };
        addNewTask(newTaskContent);
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);

    };

    init();

};