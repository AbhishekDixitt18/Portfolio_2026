

window.addEventListener("load", () => {

    const animations = [
        { selector: ".top-tags", class: "from-top", delay: 0 },
        { selector: ".left h1", class: "from-left", delay: 0.3 },
        { selector: ".desc", class: "from-left", delay: 0.6 },
        { selector: ".live-line", class: "from-bottom", delay: 0.9 },
        { selector: ".buttons", class: "zoom-in", delay: 1.2 },
        { selector: ".site-link", class: "from-bottom", delay: 1.5 },
        { selector: ".right", class: "from-right", delay: 0.6 },
        { selector: ".stats", class: "from-bottom", delay: 1.8 },
    ];

    animations.forEach(item => {
        const el = document.querySelector(item.selector);
        if (el) {
            el.style.animationDelay = `${item.delay}s`;
            el.classList.add(item.class);
        }
    });

    // ===== HIDE INTRO =====
    setTimeout(() => {
        const intro = document.getElementById("intro");
        const site = document.getElementById("real-site");

        intro.classList.add("smooth-out");

        setTimeout(() => {
            intro.style.display = "none";
            site.style.display = "block";
            requestAnimationFrame(() => {
                site.classList.add("site-ready");
            });
            initScrollAnimations(); 
        }, 1200);
    }, 3800);
});


// ===============================
// SCROLL REVEAL (SECTIONS)
// ===============================
function initScrollAnimations() {
    const elements = document.querySelectorAll(
        ".slide-in-left, .slide-in-right, .slide-in-up"
    );

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translate(0)";
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 }
    );

    elements.forEach(el => observer.observe(el));
}


// ===============================

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".ul-list li");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.clientHeight;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navItems.forEach(item => {
        item.classList.remove("active");

        const link = item.querySelector("a");
        if (link && link.getAttribute("href") === `#${current}`) {
            item.classList.add("active");
        }
    });
});

// ===============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            window.scrollTo({
                top: target.offsetTop - 120,
                behavior: "smooth"
            });
        }
    });
});

// ===============================
// CONTACT FORM HANDLER
// ===============================
const contactForm = document.getElementById("contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn ? submitBtn.innerHTML : '';

        const nameInput = contactForm.querySelector('[name="user_name"]');
        const emailInput = contactForm.querySelector('[name="user_email"]');
        const messageInput = contactForm.querySelector('[name="message"]');

        const name = nameInput ? nameInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const message = messageInput ? messageInput.value.trim() : '';

        if (!name || !email || !message) return;

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        }

        let statusBox = document.getElementById("form-status");
        if (!statusBox) {
            statusBox = document.createElement("div");
            statusBox.id = "form-status";
            contactForm.appendChild(statusBox);
        }

        setTimeout(() => {
            if (submitBtn) {
                submitBtn.style.background = 'linear-gradient(135deg, #059669, #047857)';
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            }

            statusBox.className = "form-status-success";
            statusBox.innerHTML = `<i class="fas fa-check-circle"></i> Thank you, <strong>${name}</strong>! Your message has been sent successfully.`;
            statusBox.style.display = "block";

            const mailtoUri = `mailto:sharmaabhidixit@gmail.com?subject=Portfolio%20Contact%20from%20${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0A%0AFrom:%20${encodeURIComponent(name)}%20(${encodeURIComponent(email)})`;
            window.location.href = mailtoUri;

            setTimeout(() => {
                contactForm.reset();
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    submitBtn.innerHTML = originalBtnText;
                }

                setTimeout(() => {
                    if (statusBox) statusBox.style.display = "none";
                }, 4000);
            }, 2500);
        }, 600);
    });
}



