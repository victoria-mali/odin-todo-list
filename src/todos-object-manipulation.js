let toDoList = [];

class Todo {
    constructor({title, description, project = "Default", dueDate, priority, notes, done = false, id}) {
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
}

function deleteTodo(id) {
    const itemIndex = toDoList.findIndex(x => x.id === id);
    toDoList.splice(itemIndex, 1);
    saveTodos();
}

function checkTodo(id) {
  const itemIndex = toDoList.findIndex(x => x.id === id);
  toDoList[itemIndex].toggleDone();
  saveTodos();
}

function retrieveTodo(id) {
  const itemIndex = toDoList.findIndex(x => x.id === id);
  saveTodos();
  return toDoList[itemIndex];
}

function replaceTodo(id, newValues) {
  const itemIndex = toDoList.findIndex(x => x.id === id);
  toDoList.splice(itemIndex, 1, new Todo(newValues));
}

function filterTodos(todos, id) {
    return todos.filter(todo => 
        todo.project === id
    )}


function reassignProject(oldName, newName) {
  toDoList.forEach(todo => {
    if (todo.project === oldName) todo.project = newName;
  });
  saveTodos();
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


export { toDoList, loadTodos, getTodos, createTodo, deleteTodo, checkTodo, retrieveTodo, replaceTodo, reassignProject, filterTodos };