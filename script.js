{
    const tasks = [];

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="list__item>
            <button class="list__button list__button--done js-done>
            ${task.done ? "√" : ""}</button>
            <span class="list__task${task.done ? "list__task--done" : ""}">${task.content}</span>
            <button class="list__button list__button--remove js-remove> </button>
            </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;

    };

    const addNewTask = () => {
        tasks.push({
            content: newTaskContent,
        });

        render();

    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        }
        addNewTask(newTaskContent);
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);

    };

    init();

}