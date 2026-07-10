import { toDoList, createTodo, deleteTodo, checkTodo, retrieveTodo, replaceTodo, changeTodoProperty } from "./todos-object-manipulation.js";
import { elements, showElement, hideElement, showForm, getFormValues, renderTodos, clearForm, prefillForm, changeFormToEdit, addProjectForm, getProjectName, renderProjects, filterTodos, toggleActiveProject, editProjectName, getNewProjectName } from "./dom-manipulation.js";
import { projects, createProject, deleteProject, renameProject}  from "./projects-manipulation.js"


//Todos
let editingId = null;


elements.addBtn.addEventListener('click', (e) => {
    editingId = null;
    let selected = document.querySelector(".project-selected");
    let selectedId = selected.id;
    showForm(selectedId);
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
        console.log(values);
        createTodo(values);
            let selected = document.querySelector(".project-selected");
            let selectedId = selected.id;
            if (selectedId !== "all-tasks") {
                let filteredTodos = filterTodos(toDoList, selectedId);
                renderTodos(filteredTodos);
            } else {
                renderTodos(toDoList);
            }

        showElement(elements.addBtn);
        clearForm();
    } else {
        let newValues = getFormValues();
        replaceTodo(editingId, newValues);
                    let selected = document.querySelector(".project-selected");
            let selectedId = selected.id;
            if (selectedId !== "all-tasks") {
                let filteredTodos = filterTodos(toDoList, selectedId);
                renderTodos(filteredTodos);
            } else {
                renderTodos(toDoList);
            };
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
            let selected = document.querySelector(".project-selected");
            let selectedId = selected.id;
            if (selectedId !== "all-tasks") {
                let filteredTodos = filterTodos(toDoList, selectedId);
                renderTodos(filteredTodos);
            } else {
                renderTodos(toDoList);
            }
        showElement(elements.addBtn);
    }

    if (e.target.matches('.checkbox')) {
        checkTodo(id);
    }

    if (e.target.matches('.todo-edit-btn')) {
        editingId = id;
        const values = retrieveTodo(id);
        prefillForm(values);
        changeFormToEdit(todoItem, editingId);
    }
}

//Projects
elements.addProjectBtn.addEventListener('click', (e) => {
    addProjectForm();
})


function handleProjectSubmit(e) {
    e.preventDefault();
    const projectName = getProjectName();
    createProject(projectName);
    renderProjects(projects);
}


function handleProjectChanges(e) {
    console.log('target:', e.target);
console.log('queried input:', document.querySelector('.project-name-input'));
    toggleActiveProject();
    const project = e.target.closest('[data-id]');
    console.log(project);
    if (!project) return;
    const id = project.dataset.id;

    if (e.target.closest(".project")) {
        project.classList.add("project-selected");
        let filteredTodos = filterTodos(toDoList, id);
        console.log(filteredTodos);
        renderTodos(filteredTodos);
        showElement(elements.addBtn);
    }
        if (e.target.matches('.delete-project-btn')) {
        changeTodoProperty("Default", id);
        deleteProject(id);

            elements.allTodosTab.click();

        
        renderProjects(projects);
        console.log(toDoList);
    }
        if (e.target.matches('.edit-project-btn')) {
        editProjectName(project, id);
        }   

        if (e.target.matches('.cancel-edit-project')) {
        renderProjects(projects);
    }
         if (e.target.matches('.save-edit-project')) {
            let newName = getNewProjectName();
            renameProject(newName, id);
            changeTodoProperty(newName, id);
            renderProjects(projects);
    }

}

document.addEventListener('click', (e) => {
    if (document.querySelector('.rename-project') && (!document.querySelector('.rename-project').contains(e.target))) {
        renderProjects(projects);
    }
})


elements.allTodosTab.addEventListener('click', (e) => {
    toggleActiveProject();
    renderTodos(toDoList);
    elements.allTodosTab.classList.add("project-selected");
    showElement(elements.addBtn);
})

elements.projectsFormCancelBtn.addEventListener('click', (e) => {
    hideElement(elements.projectsForm);
    elements.projectsForm.project.value = "";
})

/* document.addEventListener('click', (e) => {
    if (document.querySelector('.rename-project') && (!document.querySelector('.rename-project').contains(e.target))){
    renderProjects(projects);
    }
})
 */


document.addEventListener("DOMContentLoaded", (e) => {
    elements.allTodosTab.click();
})
elements.form.addEventListener('submit', handleSubmit);
elements.todoDiv.addEventListener('click', handleTodoChanges);
elements.projectsForm.addEventListener('submit', handleProjectSubmit);
elements.projects.addEventListener('click', handleProjectChanges);