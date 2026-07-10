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
    cancelBtn: document.querySelector(".cancel-btn"),
    confirmBtn: document.querySelector(".confirm-btn"),
    addBtn: document.querySelector(".add-btn"),
    todoDiv: document.querySelector(".todo-list-div"),
    defaultProject: document.querySelector("#default"),
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

        const todoInfo = document.createElement("div");
        todoInfo.classList.add("todo-info");

        const todoLeftDiv = document.createElement("div");
        todoLeftDiv.classList.add("todo-left");

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
        toDoButtons.classList.add("todo-buttons");
        
        const toDoEditBtn = document.createElement("button");
        toDoEditBtn .classList.add("todo-edit-btn");
        toDoEditBtn .textContent = "Edit";

        const toDoDeleteBtn = document.createElement("button");
        toDoDeleteBtn.classList.add("todo-delete-btn");
        toDoDeleteBtn.textContent = "Delete";

        elements.todoDiv.appendChild(todoItem);
        todoItem.appendChild(todoInfo);
        todoInfo.appendChild(todoLeftDiv);
        todoLeftDiv.appendChild(checkbox);
        todoLeftDiv.appendChild(todoText);
        todoText.appendChild(todoTitle);
        todoText.appendChild(todoDesc);
        todoInfo.appendChild(toDoButtons);
        toDoButtons.appendChild(toDoEditBtn);
        toDoButtons.appendChild(toDoDeleteBtn);
    });


    elements.form.classList.add("visibility");
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
    item.appendChild(elements.form);
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
}

function getProjectName() {
    return elements.projectsForm.project.value;
}

function renderProjects(projects) {
    elements.projects.innerHTML = "";
   // elements.form.project.innerHTML = "";


    projects.forEach(project => {
        let newProject = document.createElement("div");
        elements.projects.appendChild(newProject)
        newProject.setAttribute('data-id', project);
        newProject.classList.add("project");
        newProject.id = project;

        let projectTitle = document.createElement("p");
        projectTitle.textContent = project;
        newProject.appendChild(projectTitle);

        let editProjectBtn = document.createElement("button");
        editProjectBtn.classList.add("edit-project-btn");
        editProjectBtn.textContent = "#";
        newProject.appendChild(editProjectBtn);

        let deleteProjectBtn = document.createElement("button");
        deleteProjectBtn.classList.add("delete-project-btn");
        deleteProjectBtn.textContent = "x";
        newProject.appendChild(deleteProjectBtn);

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

function filterTodos(todos, id) {
    return todos.filter(todo => 
        todo.project === id
    )}


function editProjectName(project, id) {
    let editDiv = document.createElement("div");
    editDiv.classList.add("rename-project");
    editDiv.setAttribute('data-id', id);

    let input = document.createElement("input");
    input.classList.add("project-name-input");

    let cancelBtn = document.createElement("button");
    cancelBtn.classList.add("cancel-edit-project");
    cancelBtn.textContent = "x";
    
    let confirmBtn = document.createElement("button");
    confirmBtn.classList.add("save-edit-project");
    confirmBtn.textContent = "✓";
    

    editDiv.appendChild(input);
    editDiv.appendChild(cancelBtn);
    editDiv.appendChild(confirmBtn);


    input.value = id;
    project.replaceWith(editDiv);
}

function getNewProjectName() {
    let input = document.querySelector(".project-name-input");
    console.log(input);
    return input.value;
}




export { elements, showElement, hideElement, showForm, getFormValues, clearForm, renderTodos, prefillForm, changeFormToEdit, addProjectForm, getProjectName, renderProjects, filterTodos, toggleActiveProject, editProjectName, getNewProjectName};