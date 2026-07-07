import { toDoList, createTodo } from "./todos-object-manipulation.js";
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
 
elements.form.addEventListener('submit', handleSubmit);