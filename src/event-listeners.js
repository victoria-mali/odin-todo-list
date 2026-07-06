import "./todos-object-manipulation.js";
import { elements } from "./dom-manipulation.js";

elements.addBtn.addEventListener('click', (e) => {
    elements.form.classList.toggle("visibility");
    elements.addBtn.classList.toggle("visibility");
})

elements.cancelBtn.addEventListener('click', (e) => {
    elements.form.classList.toggle("visibility");
    elements.addBtn.classList.toggle("visibility");
})

elements.confirmBtn.addEventListener('click', (e) => {
    event.preventDefault();
    
})