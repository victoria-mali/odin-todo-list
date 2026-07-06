const toDoList = [];

class ToDo {
    constructor(title, description, dueDate, priority, notes, id) {
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