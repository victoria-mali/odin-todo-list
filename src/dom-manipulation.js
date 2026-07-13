import editIconUrl from "./img/Pencil-Square--Streamline-Plump 1.svg";
import deleteIconUrl from "./img/Recycle-Bin-2--Streamline-Plump 1.svg";
import { format } from 'date-fns';


const elements = {
    container: document.querySelector(".container"),
    projects: document.querySelector(".projects"),
    addProjectBtn: document.querySelector(".new-project-btn"),
    projectsForm: document.querySelector(".projects-form"),
    projectsFormBtn: document.querySelector(".projects-form-save-btn"),
    projectsFormCancelBtn: document.querySelector(".projects-form-cancel-btn"),
    todosContainer: document.querySelector(".todos-container"),
    allTodosTab: document.querySelector(".all-todos-btn"),
    form: document.querySelector(".todo-form"),
    formTitle: document.querySelector(".todo-form-title"),
    cancelBtn: document.querySelector(".cancel-form-btn"),
    confirmBtn: document.querySelector(".confirm-btn"),
    addBtn: document.querySelector(".add-btn"),
    todoDiv: document.querySelector(".todo-list-div"),
}


function showElement(element) {
    element.classList.remove("visibility");
}

function hideElement(element) {
    element.classList.add("visibility");
}


function showForm(selectedId) {
    clearForm();
    elements.formTitle.textContent = "Add new item";
        if (selectedId !== "all-tasks") {
            elements.form.project.value = selectedId;
        } else {
            elements.form.project.value = "Default";
        }
    elements.todosContainer.appendChild(elements.form);
    showElement(elements.form);
}

function getFormValues() {
    return {
        title: elements.form.title.value,
        description: elements.form.description.value,
        project: elements.form.project.value,
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

        const todoItemContent = document.createElement("div");
        todoItemContent.classList.add("todo-item-content");

        const todoInfo = document.createElement("div");
        todoInfo.classList.add("todo-info");

        const todoLeftDiv = document.createElement("div");
        todoLeftDiv.classList.add("todo-left");

        const checkboxLabel = document.createElement("label");
        checkboxLabel.classList.add("checkbox-label");

        const checkbox = document.createElement("input");
        checkbox.classList.add("checkbox");
        checkbox.type = "checkbox";
        checkbox.name = "checkbox";
        checkbox.checked = todo.done;

        const checkmark = document.createElement("span");
        checkmark.classList.add("checkmark");

        const todoText = document.createElement("div");
        todoText.classList.add("todo-text");

        const todoTitle = document.createElement("h2");
        todoTitle.classList.add("todo-title");
        todoTitle.textContent = todo.title;

        const todoDesc = document.createElement("p");
        todoDesc.classList.add("todo-desc");
        todoDesc.textContent = todo.description;

        const todoRightDiv = document.createElement("div");
        todoRightDiv.classList.add("todo-right");

        const todoPriorityTag = document.createElement("div");
        todoPriorityTag.classList.add("todo-priority-tag");
        const todoPriorityText = document.createElement("p");
        switch (todo.priority) {
            case "High":
                todoPriorityTag.classList.add("todo-priority-high");
                break;
            case "Medium":
                todoPriorityTag.classList.add("todo-priority-medium");
                break;
            case "Low":
                todoPriorityTag.classList.add("todo-priority-low");
                break;
        }
        todoPriorityText.classList.add("todo-priority-text");
        todoPriorityText.textContent = todo.priority;

        const todoDate = document.createElement("div");
        todoDate.classList.add("todo-date");


        if (todo.dueDate !== "") {
                    const formattedDate = format(todo.dueDate,'do MMM');

            todoDate.textContent = formattedDate;
        } else {
            todoDate.textContent = "No date";
        }

        const toDoButtons = document.createElement("div");
        toDoButtons.classList.add("todo-buttons");
        
        const toDoEditBtn = document.createElement("a");
        toDoEditBtn.classList.add("todo-edit-btn", "todo-btn");
        let editIcon = document.createElement("img");
        editIcon.classList.add("edit-project-icon", "project-icon")
        editIcon.src = editIconUrl;

        const toDoDeleteBtn = document.createElement("a");
        toDoDeleteBtn.classList.add("todo-delete-btn", "todo-btn");
        let deleteIcon = document.createElement("img");
        deleteIcon.classList.add("delete-project-icon", "project-icon");
        deleteIcon.src = deleteIconUrl;

        const editTodoForm = document.createElement("div");
        editTodoForm.classList.add("edit-todo-form", "visibility");


        if (todo.done === true) {
            todoItemContent.classList.add("todo-item-done");
        } else {
            todoItemContent.classList.remove("todo-item-done");
        }

        elements.todoDiv.appendChild(todoItem);
        todoItem.appendChild(todoItemContent);
        todoItemContent.appendChild(todoInfo);
        todoInfo.appendChild(todoLeftDiv);
        todoLeftDiv.appendChild(checkboxLabel);
        checkboxLabel.appendChild(checkbox);
        checkboxLabel.appendChild(checkmark);
        todoLeftDiv.appendChild(todoText);
        todoText.appendChild(todoTitle);
        todoText.appendChild(todoDesc);
        todoInfo.appendChild(todoRightDiv);


        if (todo.priority !== "") {
            todoRightDiv.appendChild(todoPriorityTag);
            todoPriorityTag.appendChild(todoPriorityText);
        }

        
            todoRightDiv.appendChild(todoDate);
        
        todoRightDiv.appendChild(toDoButtons);
        toDoButtons.appendChild(toDoEditBtn);
        toDoEditBtn.appendChild(editIcon);
        toDoButtons.appendChild(toDoDeleteBtn);
        toDoDeleteBtn.appendChild(deleteIcon);
        todoItem.appendChild(editTodoForm);
    });


    elements.form.classList.add("visibility");
}

function crossTodoOut(item) {
    let title = item.querySelector(".todo-title");
    let desc = item.querySelector(".todo-desc");
    title.classList.toggle("todo-item-done");
    desc.classList.toggle("todo-item-done");

}


function prefillForm(values) {
    elements.form.title.value = values.title;
    elements.form.description.value = values.description;
    elements.form.project.value = values.project;
    elements.form.date.value = values.dueDate;
    elements.form.priority.value = values.priority;
    elements.form.notes.value = values.notes;
}

function changeFormToEdit(item, id) {
    let formDiv = item.querySelector(".edit-todo-form");
    formDiv.appendChild(elements.form);
    formDiv.classList.remove("visibility");
    elements.formTitle.textContent = "Edit";
    elements.form.classList.remove("visibility");
}

function clearForm() {
    elements.form.title.value = "";
    elements.form.description.value = "";
    elements.form.project.value = "";
    elements.form.date.value = "";
    elements.form.priority.value = "";
    elements.form.notes.value = "";
}


// Projects
function addProjectForm() {
    showElement(elements.projectsForm);
    hideElement(elements.addProjectBtn);
}

function getProjectName() {
    return elements.projectsForm.project.value;
}

function renderProjects(projects) {
    showElement(elements.addProjectBtn);
    elements.projects.innerHTML = "";
    elements.form.project.innerHTML = "";
    let defaultProject = document.createElement("option");
    defaultProject.value = "Default";
    defaultProject.id = "default";
    defaultProject.textContent = "Default";
    elements.form.project.appendChild(defaultProject);



    projects.forEach(project => {
        let newProject = document.createElement("div");
        elements.projects.appendChild(newProject)
        newProject.setAttribute('data-id', project);
        newProject.classList.add("project");
        newProject.id = project;

        let projectTitle = document.createElement("p");
        projectTitle.textContent = project;
        newProject.appendChild(projectTitle);

        let buttonsDiv = document.createElement("div");
        buttonsDiv.classList.add("project-btn-div");
        newProject.appendChild(buttonsDiv);

        let editProjectBtn = document.createElement("a");
        editProjectBtn.classList.add("edit-project-btn", "project-btn");
        let editIcon = document.createElement("img");
        editIcon.classList.add("edit-project-icon", "project-icon")
        editIcon.src = editIconUrl;
        buttonsDiv.appendChild(editProjectBtn);
        editProjectBtn.appendChild(editIcon);

        let deleteProjectBtn = document.createElement("a");
        deleteProjectBtn.classList.add("delete-project-btn", "project-btn");
        let deleteIcon = document.createElement("img");
        deleteIcon.classList.add("delete-project-icon", "project-icon");
        deleteIcon.src = deleteIconUrl;
        buttonsDiv.appendChild(deleteProjectBtn);
        deleteProjectBtn.appendChild(deleteIcon);

        let projectOption = document.createElement("option");
        projectOption.value = project;
        projectOption.textContent = project;
        elements.form.project.appendChild(projectOption);

        elements.projectsForm.project.value = "";
        hideElement(elements.projectsForm);
    })
}

function toggleActiveProject() {
    let allProjects = document.querySelectorAll(".project");
    allProjects.forEach(project => project.classList.remove("project-selected"))
}



function editProjectName(project, id) {
    let editDiv = document.createElement("div");
    editDiv.classList.add("rename-project");
    editDiv.setAttribute('data-id', id);

    let input = document.createElement("input");
    input.classList.add("project-name-input");
    input.type = "text";

    let btnDiv = document.createElement("div");
    btnDiv.classList.add("rename-btn-div");

    let confirmBtn = document.createElement("button");
    confirmBtn.classList.add("save-edit-project", "save-btn");
    confirmBtn.textContent = "Save";

    let cancelBtn = document.createElement("button");
    cancelBtn.classList.add("cancel-edit-project", "cancel-btn");
    cancelBtn.textContent = "Cancel";


    editDiv.appendChild(input);
    editDiv.appendChild(btnDiv);
    btnDiv.appendChild(confirmBtn)
    btnDiv.appendChild(cancelBtn);

    input.value = id;
    project.replaceWith(editDiv);
}

function getNewProjectName() {
    let input = document.querySelector(".project-name-input");
    return input.value;
}




export { elements, showElement, hideElement, showForm, getFormValues, clearForm, renderTodos, crossTodoOut, prefillForm, changeFormToEdit, addProjectForm, getProjectName, renderProjects, toggleActiveProject, editProjectName, getNewProjectName};