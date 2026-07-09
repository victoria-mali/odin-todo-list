import { toDoList, projects, createTodo, deleteTodo, checkTodo, retrieveTodo, replaceTodo, createProject, deleteProject } from "./todos-object-manipulation.js";
import { elements, showElement, hideElement, showForm, getFormValues, renderTodos, clearForm, prefillForm, changeFormToEdit, addProjectForm, getProjectName, renderProjects, filterTodos, toggleActiveProject, editProject, completeEditingProject } from "./dom-manipulation.js";

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

elements.projectsFormCancelBtn.addEventListener('click', (e) => {
    hideElement(elements.projectsForm);
    elements.projectsForm.project.value = "";
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


function handleProjectSubmit(e) {
    e.preventDefault();
    const projectName = getProjectName();
    createProject(projectName);
    renderProjects(projects);
}

elements.allTodosTab.addEventListener('click', (e) => {
    toggleActiveProject();
    renderTodos(toDoList);
    elements.allTodosTab.classList.add("project-selected");
})

function handleProjectChanges(e) {
    toggleActiveProject();
    const project = e.target.closest('[data-id]');
    if (!project) return;
    const id = project.dataset.id;

    if (e.target.matches(".project")) {
        project.classList.add("project-selected");
        let filteredTodos = filterTodos(toDoList, id);
        console.log(filteredTodos);
        renderTodos(filteredTodos);
        showElement(elements.addBtn);
    }
        if (e.target.matches('.delete-project-btn')) {
        deleteProject(id);
        renderProjects(projects);
    }
        if (e.target.matches('.edit-project-btn')) {
        editProject(project, id);
    }

}



document.addEventListener("DOMContentLoaded", (e) => {
    elements.allTodosTab.click();
})
elements.form.addEventListener('submit', handleSubmit);
elements.todoDiv.addEventListener('click', handleTodoChanges);
elements.projectsForm.addEventListener('submit', handleProjectSubmit);
elements.projects.addEventListener('click', handleProjectChanges);