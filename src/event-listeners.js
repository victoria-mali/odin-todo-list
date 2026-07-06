import { createTodo } from "./todos-object-manipulation.js";
import { elements, toggleVisibility, getFormValues, renderTodo, clearForm } from "./dom-manipulation.js";

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
    renderTodo(values);
    toggleVisibility(elements.addBtn)
    clearForm();
}
 
elements.form.addEventListener('submit', handleSubmit)