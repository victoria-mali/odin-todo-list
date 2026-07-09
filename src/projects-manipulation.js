let projects = [];

function createProject(name) {
  projects.push(name);
  saveProjects();
  console.log(projects);
}

function deleteProject(id) {
    const itemIndex = projects.findIndex(x => x === id);
    projects.splice(itemIndex, 1);
    saveProjects();
    console.log(projects);
}

function renameProject(newName, id) {
    const projectItemIndex = projects.findIndex(x => x === id);
    projects.splice(projectItemIndex, 1, newName);
    console.log(projects);
    saveProjects();
}


//localStorage functions
function saveProjects() {
  localStorage.setItem("projects", JSON.stringify(projects));
}

function loadProjects() {
  const stored = localStorage.getItem("projects");
  let parsed = stored ? JSON.parse(stored) : [];
  projects = parsed;
}

function getProjects() {
  return  projects;
}


export {projects, createProject, deleteProject, renameProject, saveProjects, loadProjects, getProjects};