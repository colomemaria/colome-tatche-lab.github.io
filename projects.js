// Configuration
const GITHUB_ORG = 'colomemaria';
const GITHUB_API_URL = `https://api.github.com/orgs/${GITHUB_ORG}/repos`;

// Fetch repositories from GitHub API
async function fetchRepositories() {
    try {
        const response = await fetch(`${GITHUB_API_URL}?per_page=100&sort=updated`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const repos = await response.json();
        return repos;
    } catch (error) {
        console.error('Error fetching repositories:', error);
        throw error;
    }
}

// Create a project card element
function createProjectCard(repo) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    // Project title with link
    const title = document.createElement('h3');
    const link = document.createElement('a');
    link.href = repo.html_url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = repo.name;
    title.appendChild(link);
    
    // Description
    const description = document.createElement('p');
    description.className = 'description';
    description.textContent = repo.description || 'No description available';
    
    // Metadata (stars, forks, language)
    const meta = document.createElement('div');
    meta.className = 'meta';
    
    if (repo.stargazers_count > 0) {
        const stars = document.createElement('span');
        stars.innerHTML = `⭐ ${repo.stargazers_count}`;
        meta.appendChild(stars);
    }
    
    if (repo.forks_count > 0) {
        const forks = document.createElement('span');
        forks.innerHTML = `🔀 ${repo.forks_count}`;
        meta.appendChild(forks);
    }
    
    // Language badge
    if (repo.language) {
        const language = document.createElement('span');
        language.className = 'language';
        language.textContent = repo.language;
        meta.appendChild(language);
    }
    
    // Assemble card
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(meta);
    
    return card;
}

// Display repositories
function displayRepositories(repos) {
    const container = document.getElementById('projects-container');
    const loading = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    
    // Hide loading
    loading.style.display = 'none';
    
    // Filter out this website repository and archived repos
    const filteredRepos = repos.filter(repo => 
        !repo.archived && repo.name !== 'colome-tatche-lab.github.io'
    );
    
    // Sort by stars, then by update date
    filteredRepos.sort((a, b) => {
        if (b.stargazers_count !== a.stargazers_count) {
            return b.stargazers_count - a.stargazers_count;
        }
        return new Date(b.updated_at) - new Date(a.updated_at);
    });
    
    // Create and append cards
    filteredRepos.forEach(repo => {
        const card = createProjectCard(repo);
        container.appendChild(card);
    });
}

// Handle errors
function displayError() {
    const loading = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    
    loading.style.display = 'none';
    errorElement.style.display = 'block';
}

// Initialize
async function init() {
    try {
        const repos = await fetchRepositories();
        displayRepositories(repos);
    } catch (error) {
        displayError();
    }
}

// Run when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
