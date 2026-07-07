const toDoList = [];

class Todo {
    constructor({title, description, dueDate, priority, notes, id}) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.done = false;
        this.id = id;
    }
     toggleDone() {
     this.done = !this.done;
     }
}

function createTodo(values) {
  const todo = new Todo(values);
  toDoList.push(todo);
  console.log(toDoList);
}

function deleteTodo(id) {
    const itemIndex = toDoList.findIndex(x => x.id === id);
    toDoList.splice(itemIndex, 1);
    console.log(toDoList);
}

function checkTodo(id) {
  const itemIndex = toDoList.findIndex(x => x.id === id);
  toDoList[itemIndex].toggleDone();
console.log(toDoList);
}

export { toDoList, createTodo, deleteTodo, checkTodo };