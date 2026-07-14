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
  const todo = new Todo({...values, id: crypto.randomUUID()});
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
  console.log(toDoList);
}

function retrieveTodo(id) {
  const itemIndex = toDoList.findIndex(x => x.id === id);
  saveTodos();
  return toDoList[itemIndex];
}

function replaceTodo(id, newValues) {
  const itemIndex = toDoList.findIndex(x => x.id === id);
  toDoList.splice(itemIndex, 1, new Todo({...newValues, id}));
  saveTodos();
  console.log(toDoList);
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

const sampleTodos = [{"title":"Buy groceries","description":"","project":"Default","dueDate":"2026-07-15","priority":"Medium","notes":"","done":false,"id":"d1b0cfbe-8a02-4d61-8cad-7f603d33c08d"},{"title":"Reply to Sarah's email","description":"She asked about rescheduling Thursday's call","project":"Default","dueDate":"2026-07-17","priority":"High","notes":"","done":true,"id":"288fa799-f639-4a42-ad07-547eeeb483ef"},{"title":"Paint the living room","description":"Two coats, let dry overnight between each","project":"Home","dueDate":"2026-07-18","priority":"Medium","notes":"Buy painter's tape and drop cloths first","done":false,"id":"b752f379-7966-4d30-b5ec-bbf044835c54"},{"title":"Fix the leaky faucet","description":"","project":"Home","dueDate":"2026-07-16","priority":"High","notes":"Need a new washer, check under the sink for the size","done":false,"id":"a0a25857-6738-4279-b947-46aa174640ec"},{"title":"Update resume","description":"Add the freelance project from last spring","project":"Job search","dueDate":"2026-07-21","priority":"Low","notes":"","done":false,"id":"b3eb7f80-f4a0-4ad8-9f13-0015f2d49017"}]

function saveTodos() {
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
}

function loadTodos() {
  const stored = localStorage.getItem("toDoList");
  let parsed = stored ? JSON.parse(stored) : sampleTodos;

  let convertedObjects = parsed.map((object) => new Todo (object));
  toDoList = convertedObjects;
}

function getTodos() {
  return toDoList;
}


export { toDoList, loadTodos, getTodos, createTodo, deleteTodo, checkTodo, retrieveTodo, replaceTodo, reassignProject, filterTodos };