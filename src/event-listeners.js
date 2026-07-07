import { toDoList, createTodo, deleteTodo, checkTodo } from "./todos-object-manipulation.js";
import { elements, toggleVisibility, getFormValues, renderTodos, clearForm } from "./dom-manipulation.js";

elements.addBtn.addEventListener('click', (e) => {
    toggleVisibility(elements.form);
    toggleVisibility(elements.addBtn);
})

elements.cancelBtn.addEventListener('click', (e) => {
    toggleVisibility(elements.form);
    toggleVisibility(elements.addBtn);
})

function handleSubmit(e) {
    e.preventDefault();
    const values = getFormValues();
    createTodo(values);
    renderTodos(toDoList);
    toggleVisibility(elements.addBtn)
    clearForm();
}

function handleTodoChanges(e) {
    const todoItem = e.target.closest('[data-id]');
    if (!todoItem) return;
    const id = todoItem.dataset.id;

    if (e.target.matches('.to-do-delete-btn')) {
        deleteTodo(id);
        renderTodos(toDoList);
    }

    if (e.target.matches('.checkbox')) {
        checkTodo(id);
        renderTodos(toDoList);
    }
}

 
elements.form.addEventListener('submit', handleSubmit);
elements.todoDiv.addEventListener('click', handleTodoChanges);