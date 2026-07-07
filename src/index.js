import "./styles.css";
import { loadTodos, getTodos, } from "./todos-object-manipulation.js";
import { renderTodos } from "./dom-manipulation.js";
import "./event-listeners.js";


loadTodos();
renderTodos(getTodos());

