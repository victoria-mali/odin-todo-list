import { toDoList, createTodo, deleteTodo, checkTodo, retrieveTodo, replaceTodo } from "./todos-object-manipulation.js";
import { elements, showElement, hideElement, showForm, getFormValues, renderTodos, clearForm, prefillForm, changeFormToEdit } from "./dom-manipulation.js";

let editingId = null;

elements.addBtn.addEventListener('click', (e) => {
    editingId = null;
    showForm();
    hideElement(elements.addBtn);
})

elements.cancelBtn.addEventListener('click', (e) => {
    hideElement(elements.form);
    showElement(elements.addBtn);
})

function handleSubmit(e) {
    e.preventDefault();
    if (editingId === null) {
        const values = getFormValues();
        createTodo(values);
        renderTodos(toDoList);
        showElement(elements.addBtn);
        clearForm();
    } else {
        let newValues = getFormValues();
        replaceTodo(editingId, newValues);
        renderTodos(toDoList);
        clearForm();
        showElement(elements.addBtn);
        editingId = null;
    }
}

function handleTodoChanges(e) {
    const todoItem = e.target.closest('[data-id]');
    if (!todoItem) return;
    const id = todoItem.dataset.id;

    if (e.target.matches('.todo-delete-btn')) {
        deleteTodo(id);
        renderTodos(toDoList);
        showElement(elements.addBtn);
    }

    if (e.target.matches('.checkbox')) {
        checkTodo(id);
        renderTodos(toDoList);
    }
    if (e.target.matches('.todo-edit-btn')) {
        editingId = id;
        const values = retrieveTodo(id);
        prefillForm(values);
        changeFormToEdit(todoItem, editingId);
    }
}


/* function addPlaceholders() {
    createTodo({title: "Finish the to-do list project",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        dueDate: "2026-07-06",
        priority: "High",
        notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        id: crypto.randomUUID(),
        });
    createTodo({title: "Go to the gym",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        dueDate: "2026-07-06",
        priority: "High",
        notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        id: crypto.randomUUID(),
        });
    createTodo({title: "Order groceries",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        dueDate: "2026-07-06",
        priority: "Medium",
        notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        id: crypto.randomUUID(),
        });
    renderTodos(toDoList);
}

document.addEventListener("DOMContentLoaded", addPlaceholders); */
elements.form.addEventListener('submit', handleSubmit);
elements.todoDiv.addEventListener('click', handleTodoChanges);