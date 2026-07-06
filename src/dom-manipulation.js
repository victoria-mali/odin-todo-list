const elements = {
    container: document.querySelector(".container"),
    form: document.querySelector(".todo-form"),
    cancelBtn: document.querySelector(".cancel-btn"),
    confirmBtn: document.querySelector(".confirm-btn"),
    addBtn: document.querySelector(".add-btn"),
}


function toggleVisibility(element) {
    element.classList.toggle("visibility");
}

function getFormValues() {
    return {
        title: elements.form.title.value,
        description: elements.form.description.value,
        dueDate: elements.form.date.value,
        priority: elements.form.priority.value,
        notes: elements.form.notes.value,
        id: crypto.randomUUID(),
    }
}

function renderTodo(values) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-item");
    const checkbox = document.createElement("input");
    checkbox.classList.add("checkbox");
    checkbox.type = "checkbox";
    checkbox.id = "checkbox";
    checkbox.name = "checkbox";
    const todoText = document.createElement("div");
    todoText.classList.add("todo-text");
    const todoTitle = document.createElement("h2");
    todoTitle.classList.add("todo-title");
    const todoDesc = document.createElement("p");
    todoDesc.classList.add("todo-desc");

    elements.container.appendChild(todoDiv);
    todoDiv.appendChild(checkbox);
    todoDiv.appendChild(todoText);
    todoText.appendChild(todoTitle);
    todoText.appendChild(todoDesc);

    todoTitle.textContent = values.title;
    todoDesc.textContent = values.description;

    toggleVisibility(elements.form);
}


function clearForm() {
    elements.form.title.value = "";
}


export { elements, toggleVisibility, getFormValues, clearForm, renderTodo };