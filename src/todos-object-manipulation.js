import { filterTodos } from "./dom-manipulation.js";

let toDoList = [];

class Todo {
    constructor({title, description, project = null, dueDate, priority, notes, done = false, id}) {
        this.title = title;
        this.description = description;
        this.project = project,
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.done = done;
        this.id = id;
    }
     toggleDone() {
     this.done = !this.done;
     }
}


function createTodo(values) {
  const todo = new Todo(values);
  toDoList.push(todo);
  saveTodos();
  console.log(toDoList);
}

function deleteTodo(id) {
    const itemIndex = toDoList.findIndex(x => x.id === id);
    toDoList.splice(itemIndex, 1);
    saveTodos();
    console.log(toDoList);
}

function checkTodo(id) {
  const itemIndex = toDoList.findIndex(x => x.id === id);
  console.log(typeof id, typeof toDoList[0].id)
  toDoList[itemIndex].toggleDone();
  console.log(itemIndex)
  saveTodos();
  console.log(toDoList);
}

function retrieveTodo(id) {
  const itemIndex = toDoList.findIndex(x => x.id === id);
  saveTodos();
  return toDoList[itemIndex];
}

function replaceTodo(id, newValues) {
  const itemIndex = toDoList.findIndex(x => x.id === id);
  toDoList.splice(itemIndex, 1, newValues);
  saveTodos();
  console.log(toDoList);
}

function changeTodoProperty(newName, id) {
    let projectTodos = filterTodos(toDoList, id);
    console.log(projectTodos);
    projectTodos.forEach(project => {
    project.project = newName;
    const todoItemIndex = toDoList.findIndex(x => x.project === id);
    toDoList.splice(todoItemIndex, 1, project);
    })
}



//localStorage functions
function saveTodos() {
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
}

function loadTodos() {
  const stored = localStorage.getItem("toDoList");
  let parsed = stored ? JSON.parse(stored) : [];

  let convertedObjects = parsed.map((object) => new Todo (object));
  toDoList = convertedObjects;
}

function getTodos() {
  return toDoList;
}


export { toDoList, loadTodos, getTodos, createTodo, deleteTodo, checkTodo, retrieveTodo, replaceTodo, changeTodoProperty };