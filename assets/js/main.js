// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Scroll Reveal
const reveals = document.querySelectorAll(".reveal");
window.addEventListener("scroll", () => {
  reveals.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) {
      el.classList.add("active");
    }
  });
});

// Counter Animation
const counters = document.querySelectorAll('.counter');

function runCounter(counter) {
    const target = +counter.dataset.target;
    const suffix = counter.dataset.suffix || '';
    let current = 0;

    counter.innerText = 0; // reset before counting

    const increment = target / 80; // adjust speed

    function update() {
        current += increment;
        if (current < target) {
            counter.innerText = Math.ceil(current) + suffix;
            requestAnimationFrame(update);
        } else {
            counter.innerText = target + suffix;
        }
    }

    update();
}

/* Animate on scroll every time it's visible */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            runCounter(counter);
            // Don't unobserve if you want it to re-count when scrolled again
        }
    });
}, { threshold: 0.5 }); // triggers when 50% of element is visible

counters.forEach(counter => observer.observe(counter));

/* Animate again on click */
document.querySelectorAll('.metric-card').forEach(card => {
    card.addEventListener('click', () => {
        const counter = card.querySelector('.counter');
        runCounter(counter);
    });
});




// GitHub API Fetch
 const githubUsername = "Wilfred_lab_arch"; // <-- replace with your username
  const githubProjectsContainer = document.getElementById("github-projects");

  async function fetchGitHubProjects() {
    try {
      const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated`);
      const repos = await response.json();

      repos.forEach(repo => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
          <h3>${repo.name}</h3>
          <p>${repo.description ? repo.description : "No description provided."}</p>
          <a href="${repo.html_url}" target="_blank">View Repo</a>
        `;

        githubProjectsContainer.appendChild(card);
      });
    } catch (error) {
      console.error("Error fetching GitHub projects:", error);
      githubProjectsContainer.innerHTML = "<p>Failed to load projects.</p>";
    }
  }

  fetchGitHubProjects();