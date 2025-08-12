// Enhanced loading screen with multiple effects
window.addEventListener("load", () => {
  // Simulate loading time for dramatic effect
  setTimeout(() => {
    document.getElementById("loading").classList.add("hidden");

    // Trigger entrance animations for main content
    setTimeout(() => {
      document.querySelector(
        ".section.active .section-content"
      ).style.animation = "slideIn 1s ease-out";
    }, 300);
  }, 5500); // 5.5 seconds total loading time
});

// Create particle explosion effect (optional enhancement)
function createParticleExplosion() {
  const particles = document.createElement("div");
  particles.className = "loading-particles";

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";

    const angle = (Math.PI * 2 * i) / 50;
    const distance = 150 + Math.random() * 100;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    particle.style.setProperty("--dx", dx + "px");
    particle.style.setProperty("--dy", dy + "px");
    particle.style.left = "50%";
    particle.style.top = "50%";
    particle.style.animationDelay = Math.random() * 2 + "s";

    particles.appendChild(particle);
  }

  document.getElementById("loading").appendChild(particles);
}

// Create matrix-like effect (optional)
function createMatrixEffect() {
  const matrix = document.createElement("div");
  matrix.className = "loading-matrix";

  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789</>{}[];:";

  for (let i = 0; i < 20; i++) {
    const column = document.createElement("div");
    column.className = "matrix-column";

    let columnText = "";
    for (let j = 0; j < 20; j++) {
      columnText += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    column.textContent = columnText;
    column.style.left = Math.random() * 100 + "%";
    column.style.animationDelay = Math.random() * 4 + "s";
    column.style.animationDuration = 2 + Math.random() * 3 + "s";

    matrix.appendChild(column);
  }

  document.getElementById("loading").appendChild(matrix);
}

 //Audio feedback (optional - uncomment to add sound)

        function playLoadingSound() {
            // Create a simple beep sound using Web Audio API
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        }
        

// Generate wireframe background
function createWireframe() {
  const wireframe = document.getElementById("wireframe");
  const lines = 50;

  for (let i = 0; i < lines; i++) {
    const line = document.createElement("div");
    line.className = "line";

    const isHorizontal = Math.random() > 0.5;
    const position = Math.random() * 100;
    const length = Math.random() * 40 + 20;

    if (isHorizontal) {
      line.style.height = "1px";
      line.style.width = length + "%";
      line.style.top = position + "%";
      line.style.left = Math.random() * (100 - length) + "%";
    } else {
      line.style.width = "1px";
      line.style.height = length + "%";
      line.style.left = position + "%";
      line.style.top = Math.random() * (100 - length) + "%";
    }

    line.style.animationDelay = Math.random() * 4 + "s";
    wireframe.appendChild(line);
  }
}

window.addEventListener("resize", () => location.reload());

// Navigation functionality
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".section");
const indicator = document.querySelector(".nav-indicator");

function updateIndicator(activeLink) {
  const linkRect = activeLink.getBoundingClientRect();
  const navRect = activeLink.closest(".navbar").getBoundingClientRect();
  const offset = linkRect.top - navRect.top + linkRect.height / 2 - 8;
  indicator.style.top = offset + "px";
}
function fixIndicator(activeLink) {
  
}
function showSection(targetId) {
  sections.forEach((section) => {
    section.classList.remove("active");
  });

  const targetSection = document.getElementById(targetId);
  if (targetSection) {
    targetSection.classList.add("active");
  }
}

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetSection = link.getAttribute("data-section");

    // Update active states
    navLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");

    // Update indicator
    updateIndicator(link);

    // Show section
    showSection(targetSection);

    // Update URL without reload
    history.pushState(null, null, `#${targetSection}`);
  });
});

// Handle browser back/forward
window.addEventListener("popstate", () => {
  const hash = window.location.hash.substring(1) || "about";
  const targetLink = document.querySelector(`[data-section="${hash}"]`);

  if (targetLink) {
    navLinks.forEach((l) => l.classList.remove("active"));
    targetLink.classList.add("active");
    updateIndicator(targetLink);
    showSection(hash);
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  createWireframe();

  // Add optional loading effects
  // createParticleExplosion(); // Uncomment for particle explosion
  // createMatrixEffect(); // Uncomment for matrix rain effect
  // playLoadingSound(); // Uncomment for audio feedback

  // Handle initial hash and set up default state
  const initialHash = window.location.hash.substring(1) || "about";
  
  // Ensure the correct section is active
  showSection(initialHash);
  
  // Update navigation active states
  navLinks.forEach((l) => l.classList.remove("active"));
  const targetLink = document.querySelector(`[data-section="${initialHash}"]`);
  if (targetLink) {
    targetLink.classList.add("active");
    updateIndicator(targetLink);
  }
});

// Resize handler
window.addEventListener("resize", () => {
  const activeLink = document.querySelector(".nav-link.active");
  if (activeLink) {
    updateIndicator(activeLink);
  }
});

// Add some interactive particles on mouse move
let mouseX = 0,
  mouseY = 0;
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Performance optimization: use requestAnimationFrame for smooth animations
function animate() {
  // Add any continuous animations here
  requestAnimationFrame(animate);
}
animate();

// Food diary
// Note section for each day
// local storage to save data
// Be able to note breakfast, lunch, dinner, snacks, Drinks, Vitamins/Supplements
// Date for each added
//
