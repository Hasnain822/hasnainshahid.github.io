function showSidebar() {
    document.querySelector('.sidebar').classList.add('active');
    document.addEventListener('click', handleOutsideClick);
}

function hideSidebar() {
    document.querySelector('.sidebar').classList.remove('active');
    document.removeEventListener('click', handleOutsideClick);
}

// Close on link click inside sidebar
document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', hideSidebar);
});

// Close when clicked outside sidebar
function handleOutsideClick(e) {
    const sidebar = document.querySelector('.sidebar');
    const menuBtn = document.querySelector('.menu-button'); // to avoid closing when menu button clicked
    if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
        hideSidebar();
    }
}

let lastScrollY = window.scrollY;
let timeout = null;
const nav = document.querySelector("nav");

function hideNav() {
    nav.style.transform = "translateY(-100%)";
}

function showNav() {
    nav.style.transform = "translateY(0)";
}

window.addEventListener("scroll", () => {
    clearTimeout(timeout);

    if (window.scrollY <= 50) {
        showNav(); // If at top, always show nav
    } else if (window.scrollY > lastScrollY) {
        hideNav(); // Scrolling down
    } else {
        showNav(); // Scrolling up
    }

    lastScrollY = window.scrollY;
});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navigation a");

window.addEventListener("scroll", () => {
    let activeClass = null;

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const isHalfVisible = rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;

        if (isHalfVisible) {
            // Use the first class as identifier (e.g., "about", "projects", etc.)
            activeClass = section.classList[0];
        }
    });

    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (href) {
            const cleanHref = href.replace("#", "");
            if (cleanHref === activeClass) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        }
    });
});

const cards = document.querySelectorAll('.card');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animate');
            }, index * 200);
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});
cards.forEach(card => observer.observe(card));

const skills = document.querySelectorAll('.skill-level');
const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skill = entry.target;
            const target = parseInt(skill.dataset.skill);
            skill.style.width = target + '%';

            // Count-up percentage animation
            let current = 0;
            const speed = 15;

            const counter = setInterval(() => {
                if (current >= target) {
                    clearInterval(counter);
                    skill.textContent = target + '%';
                } else {
                    current++;
                    skill.textContent = current + '%';
                }
            }, speed);

            skillObserver.unobserve(skill);
        }
    });
}, {
    threshold: 0.6
});
skills.forEach(skill => {
    skillObserver.observe(skill);
});
