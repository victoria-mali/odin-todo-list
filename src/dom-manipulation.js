const elements = {
    container: document.querySelector(".container"),
    form: document.querySelector(".todo-form"),
    cancelBtn: document.querySelector(".cancel-btn"),
    confirmBtn: document.querySelector(".confirm-btn"),
    addBtn: document.querySelector(".add-btn"),
    todoDiv: document.querySelector(".todo-list-div"),
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

function renderTodos(todos) {
    elements.todoDiv.innerHTML = "";

    todos.forEach(todo => {
        const todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");
        todoItem.setAttribute('data-id', todo.id);

        const checkbox = document.createElement("input");
        checkbox.classList.add("checkbox");
        checkbox.type = "checkbox";
        checkbox.classList.add("checkbox");
        checkbox.name = "checkbox";
        checkbox.checked = todo.done;

        const todoText = document.createElement("div");
        todoText.classList.add("todo-text");

        const todoTitle = document.createElement("h2");
        todoTitle.classList.add("todo-title");
        todoTitle.textContent = todo.title;

        const todoDesc = document.createElement("p");
        todoDesc.classList.add("todo-desc");
        todoDesc.textContent = todo.description;

        const toDoButtons = document.createElement("div");
        toDoButtons.classList.add("to-do-buttons");
        
        const toDoEditBtn = document.createElement("button");
        toDoEditBtn .classList.add("to-do-edit-btn");
        toDoEditBtn .textContent = "Edit";

        const toDoDeleteBtn = document.createElement("button");
        toDoDeleteBtn.classList.add("to-do-delete-btn");
        toDoDeleteBtn.textContent = "Delete";

        elements.todoDiv.appendChild(todoItem);
        todoItem.appendChild(checkbox);
        todoItem.appendChild(todoText);
        todoText.appendChild(todoTitle);
        todoText.appendChild(todoDesc);
        todoItem.appendChild(toDoButtons);
        toDoButtons.appendChild(toDoEditBtn);
        toDoButtons.appendChild(toDoDeleteBtn);
    });


    elements.form.classList.add("visibility");
}


function clearForm() {
    elements.form.title.value = "";
    elements.form.description.value = "";
    elements.form.date.value = "";
    elements.form.priority.value = "";
    elements.form.notes.value = "";
}


export { elements, toggleVisibility, getFormValues, clearForm, renderTodos };