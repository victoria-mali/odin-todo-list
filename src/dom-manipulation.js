const elements = {
    form: document.querySelector(".todo-form"),
    cancelBtn: document.querySelector(".cancel-btn"),
    confirmBtn: document.querySelector(".confirm-btn"),
    addBtn: document.querySelector(".add-btn"),
}

const todoDiv = {
    div: document.querySelector(".todo-list-div"),
    item: document.querySelector(".todo-item"),
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
    let newTodo = todoDiv.item.cloneNode(true);
    toggleVisibility(newTodo);
    todoDiv.div.appendChild(newTodo);
    toggleVisibility(elements.form);
}


function clearForm() {
    elements.form.title.value = "";
}


export { elements, toggleVisibility, getFormValues, clearForm, renderTodo };