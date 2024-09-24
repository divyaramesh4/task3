let projects = [];

document.getElementById('create-project-form').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const title = document.getElementById('project-title').value;
    const description = document.getElementById('project-description').value;
    const goal = document.getElementById('funding-goal').value;
    
    const newProject = {
        title,
        description,
        goal,
        raised: 0
    };
    
    projects.push(newProject);
    displayProjects();
    document.getElementById('create-project-form').reset();
    document.getElementById('create-project-section').style.display = 'none';
});

function displayProjects() {
    const projectContainer = document.getElementById('project-container');
    projectContainer.innerHTML = '';
    
    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        projectCard.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <p>Goal: $${project.goal}</p>
            <div class="progress-bar">
                <div class="progress-bar-fill" style="width: ${(project.raised / project.goal) * 100}%"></div>
            </div>
            <p>Raised: $${project.raised}</p>
            <form onsubmit="contribute(event, ${index})">
                <input type="number" placeholder="Contribution Amount" required>
                <button type="submit">Contribute</button>
            </form>
        `;
        
        projectContainer.appendChild(projectCard);
    });
}

function contribute(event, projectIndex) {
    event.preventDefault();
    
    const amount = event.target.querySelector('input').value;
    projects[projectIndex].raised += parseFloat(amount);
    
    displayProjects();
}

function showCreateProject() {
    document.getElementById('create-project-section').style.display = 'block';
}
