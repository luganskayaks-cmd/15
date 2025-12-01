// Анимация появления элементов при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Наблюдаем за всеми элементами с анимацией
document.querySelectorAll('.feature-card, .case-study, .offering-card, .methodology-card, .stat-item, .visual-box, .logo-item, .faq-item').forEach(el => {
    observer.observe(el);
});

// Плавная прокрутка к якорям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Анимация чисел в статистике
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + (element.textContent.includes('+') ? '+' : '');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber) {
                const value = statNumber.textContent;
                if (value.includes('%')) {
                    const num = parseInt(value);
                    animateValue(statNumber, 0, num, 2000);
                } else if (value.includes('x')) {
                    const num = parseFloat(value);
                    animateValue(statNumber, 0, num * 10, 2000);
                } else if (value.includes('+')) {
                    const num = parseInt(value);
                    animateValue(statNumber, 0, num, 2000);
                }
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(el => {
    statsObserver.observe(el);
});

// Дополнительные интерактивные эффекты
document.addEventListener('DOMContentLoaded', function() {
    // Анимация FAQ при клике
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
        });
    });
    
    // Инициализация всех ответов FAQ как скрытых
    document.querySelectorAll('.faq-answer').forEach(answer => {
        answer.style.display = 'none';
    });
});
