/* ========== NAV + HAMBURGER ========== */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        const open = hamburger.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');

        if (!navLinks) return;

        if (open) {
            // show menu with animation
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.gap = '12px';
            navLinks.style.background = 'linear-gradient(180deg, rgba(0,0,0,0.42), rgba(0,0,0,0.28))';
            navLinks.style.position = 'absolute';
            navLinks.style.right = '18px';
            navLinks.style.top = '64px';
            navLinks.style.padding = '12px';
            navLinks.style.borderRadius = '10px';
            // trigger tiny delay for CSS transition if needed
            setTimeout(() => navLinks.classList.add('visible-menu'), 10);
        } else {
            // hide with transition
            navLinks.classList.remove('visible-menu');
            setTimeout(() => navLinks.style.display = 'none', 260);
        }
    });
}

/* when resizing, ensure nav state is consistent */
window.addEventListener('resize', () => {
    if (!navLinks) return;
    if (window.innerWidth > 980) {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = '';
        navLinks.classList.remove('visible-menu');
    } else if (!hamburger || !hamburger.classList.contains('open')) {
        navLinks.style.display = 'none';
    }
});

/* optional: close menu when clicking a link (mobile) */
document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
        if (hamburger && hamburger.classList.contains('open')) {
            hamburger.classList.remove('open');
            navLinks.classList.remove('visible-menu');
            navLinks.style.display = 'none';
        }
    });
});

/* ========== FORM ========== */
function submitForm(e) {
    e.preventDefault();
    alert('💅 Thanks! Your booking request has been received. We will contact you to confirm. 💖');
    e.target.reset();
}

/* ========== SCROLL REVEAL ========== */
const reveals = document.querySelectorAll('.reveal');
const revealOnScroll = () => {
    const trigger = window.innerHeight * 0.85;
    reveals.forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.top < trigger) el.classList.add('visible');
    });
};
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

/* ========== PARTICLES (simple lightweight) ========== */
const canvas = document.getElementById('particles');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    const particles = [];
    const count = Math.floor((w * h) / 90000); // scale with screen

    function rand(min, max) { return Math.random() * (max - min) + min; }

    function makeParticles() {
        particles.length = 0;
        for (let i = 0; i < count; i++) {
            particles.push({
                x: rand(0, w),
                y: rand(0, h),
                r: rand(0.7, 2.4),
                vx: rand(-0.15, 0.15),
                vy: rand(-0.1, 0.2),
                alpha: rand(0.08, 0.28),
                glow: rand(8, 36)
            });
        }
    }
    makeParticles();

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        makeParticles();
    }
    window.addEventListener('resize', resize);

    function draw() {
        ctx.clearRect(0, 0, w, h);
        for (const p of particles) {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < -10) p.x = w + 10;
            if (p.x > w + 10) p.x = -10;
            if (p.y < -10) p.y = h + 10;
            if (p.y > h + 10) p.y = -10;

            ctx.beginPath();
            ctx.fillStyle = `rgba(255,62,191,${p.alpha})`;
            ctx.shadowColor = 'rgba(255,62,191,0.35)';
            ctx.shadowBlur = p.glow;
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
        }
        requestAnimationFrame(draw);
    }
    draw();
}

/* ========== NAV LINK SMOOTH SCROLL (optional) ========== */
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.length > 1) {
            e.preventDefault();
            const el = document.querySelector(href);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});







// Auto-fill booking form when clicking "Book This Style"
document.querySelectorAll('.btn-book').forEach(btn => {
    btn.addEventListener('click', e => {
        const style = e.target.closest('.nail-card').dataset.style;
        const serviceSelect = document.getElementById('service');
        if (serviceSelect) {
            serviceSelect.value = "🎨 Nail Art"; // auto-select base service
        }
        alert(`💅 You've selected "${style}". Go to the booking section to confirm! 💖`);
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    });
});