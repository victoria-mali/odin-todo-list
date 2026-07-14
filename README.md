# Todo List App

A vanilla JavaScript todo list app built as part of [The Odin Project](https://www.theodinproject.com/) Full Stack JavaScript curriculum. The focus of the project is practising **ES modules**, **bundling with Webpack**, and **object-oriented design** following SOLID principles.

## Features

- **Create, edit, and delete todos** — each with a title, description, due date, priority, and notes
- **Organize todos into projects** — group related tasks and filter the list by project
- **Mark todos complete** with a checkbox that visibly crosses the item out
- **Persistent storage** — todos and projects are saved to `localStorage` and survive a page refresh
- **Sample data on first visit** — new users see example todos instead of a blank page

## Tech Stack

- **JavaScript (ES6 modules)** — the app is split into small modules with explicit `import` / `export`
- **Webpack** — bundles the JS, CSS, HTML, and image assets into a `dist/` build
- **date-fns** — formats due dates for display
- **HTML & CSS**
- **`localStorage`** — for persistence between visits

## Design & Principles

- **Object-oriented model** — todos are `Todo` class instances with their own data and behaviour (e.g. `toggleDone()`), so the class is a single source of truth for what a todo *is*.
- **Separation of concerns** — the code is split by responsibility rather than crammed into one file:
  - `todos-object-manipulation.js` — todo data and logic (create, edit, delete, toggle, save/load)
  - `projects-manipulation.js` — project data and logic
  - `dom-manipulation.js` — rendering and DOM element references
  - `event-listeners.js` — wires user interactions to the data and rendering functions
  - `index.js` — entry point that loads saved data and does the first render
- **Event delegation** — one click listener on each list container handles all its (dynamically created) items, instead of adding a listener per item.
