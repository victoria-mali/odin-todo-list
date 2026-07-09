import "./styles.css";
import { loadTodos, getTodos, loadProjects, getProjects } from "./todos-object-manipulation.js";
import { renderTodos, renderProjects } from "./dom-manipulation.js";
import "./event-listeners.js";

loadProjects();
loadTodos();
renderProjects(getProjects());
renderTodos(getTodos());