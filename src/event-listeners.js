import { toDoList, projects, createTodo, deleteTodo, checkTodo, retrieveTodo, replaceTodo, createProject } from "./todos-object-manipulation.js";
import { elements, showElement, hideElement, showForm, getFormValues, renderTodos, clearForm, prefillForm, changeFormToEdit, addProjectForm, getProjectName, renderProjects, filterTodos } from "./dom-manipulation.js";

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

elements.addProjectBtn.addEventListener('click', (e) => {
    addProjectForm();
})


function handleProjectSumbit(e) {
    e.preventDefault();
    const projectName = getProjectName();
    createProject(projectName);
    renderProjects(projects);
}


function handleProjectChanges(e) {
    const project = e.target.closest('[data-id]');
    if (!project) return;
    const id = project.dataset.id;

    if (e.target.matches(".project")) {
        //project.classList.add("project-selected");
        let filteredTodos = filterTodos(toDoList, id);
        console.log(filteredTodos);
        console.log(id);
        renderTodos(filteredTodos);
    }
}

elements.form.addEventListener('submit', handleSubmit);
elements.todoDiv.addEventListener('click', handleTodoChanges);
elements.projectsForm.addEventListener('submit', handleProjectSumbit);
elements.projects.addEventListener('click', handleProjectChanges)