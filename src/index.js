import "./styles.css";
import { loadTodos, getTodos } from "./todos-object-manipulation.js";
import { loadProjects, getProjects } from "./projects-manipulation.js";
import { renderTodos, renderProjects } from "./dom-manipulation.js";
import "./event-listeners.js";


loadProjects();
loadTodos();
renderProjects(getProjects());
renderTodos(getTodos());