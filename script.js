/**
 * PORTFOLIO JAVASCRIPT
 * Professional interactive features, theme toggler, animations & form handling
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     1. THEME SWITCHER (Dark / Light Mode)
     ========================================== */
  const themeBtn = document.getElementById('theme-btn');
  const themeIcon = document.getElementById('theme-icon');
  const htmlRoot = document.documentElement;

  // Check saved theme or user preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'dark'); // Default to modern dark

  applyTheme(initialTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      showToast('Mavzu o\'zgartirildi', `${newTheme === 'dark' ? 'Qorong\'i' : 'Yorug\''} rejim yoqildi`, 'info');
    });
  }

  function applyTheme(theme) {
    htmlRoot.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (themeIcon) {
      if (theme === 'dark') {
        themeIcon.className = 'fa-solid fa-moon';
      } else {
        themeIcon.className = 'fa-solid fa-sun';
      }
    }
  }

  /* ==========================================
     2. MOBILE NAVIGATION MENU
     ========================================== */
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('open');
    });

    // Close menu when clicking nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('open');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('open')) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('open');
      }
    });
  }

  /* ==========================================
     3. STICKY HEADER & ACTIVE SCROLL SPY
     ========================================== */
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Header shadow and padding
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll Spy for nav links
    let currentId = '';
    sections.forEach(sec => {
      const sectionTop = sec.offsetTop - 120;
      const sectionHeight = sec.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });

    // Back to top button visibility
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
      if (scrollY > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  // Back to top click
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==========================================
     4. TYPING TEXT ANIMATION
     ========================================== */
  const typingElement = document.getElementById('typing-text');
  if (typingElement) {
    const roles = [
      'Frontend Dasturchiman',
      'React & Next.js Mutaxassisiman',
      'UI/UX Dizayn Ishqiboziman',
      'Zamonaviy Veb Yaratuvchisiman'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function typeEffect() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
      } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 90;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        typingSpeed = 1800; // Pause at end of word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400; // Pause before new word
      }

      setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();
  }

  /* ==========================================
     5. STATS ANIMATED COUNTER
     ========================================== */
  const statsSection = document.querySelector('.stats-bar');
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsCounted = false;

  if (statsSection && statNumbers.length > 0) {
    const statsObserver = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !statsCounted) {
        statsCounted = true;
        statNumbers.forEach(stat => {
          const target = +stat.getAttribute('data-target');
          const duration = 1500;
          const step = Math.ceil(target / (duration / 25));
          let count = 0;

          const timer = setInterval(() => {
            count += step;
            if (count >= target) {
              stat.textContent = target;
              clearInterval(timer);
            } else {
              stat.textContent = count;
            }
          }, 25);
        });
      }
    }, { threshold: 0.3 });

    statsObserver.observe(statsSection);
  }

  /* ==========================================
     6. PROJECTS FILTER
     ========================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  /* ==========================================
     7. PROJECT DETAILS MODAL
     ========================================== */
  const projectDetails = {
    1: {
      title: 'Smart Analytics Dashboard',
      category: 'Veb Ilova / Frontend',
      tags: ['React', 'Next.js', 'Chart.js', 'Tailwind CSS', 'REST API'],
      previewClass: 'preview-1',
      icon: 'fa-chart-line',
      desc: 'Ushbu loyiha kompaniyalar va sotuvchilar uchun mo\'ljallangan keng qamrovli boshqaruv paneli (Dashboard) hisoblanadi. Unda real vaqt rejimida savdo ko\'rsatkichlari, tushumlar, foydalanuvchilar faolligi va vizual diagrammalar jamlangan.',
      features: [
        'Real vaqt statistikasi va interaktiv grafiklar (Chart.js)',
        'Dark va Light rejim to\'liq qo\'llab-quvvatlanadi',
        'Ma\'lumotlarni Excel va PDF formatda yuklab olish',
        'Moslashuvchan (Responsive) mobil va planshet ko\'rinishi'
      ],
      liveUrl: 'https://example.com',
      codeUrl: 'https://github.com'
    },
    2: {
      title: 'ModaHub Onlayn Do\'kon',
      category: 'E-Commerce / Fullstack',
      tags: ['Next.js 14', 'Tailwind CSS', 'Stripe API', 'Zustand', 'PostgreSQL'],
      previewClass: 'preview-2',
      icon: 'fa-cart-shopping',
      desc: 'Kiyim-kechak va aksessuarlar savdosi uchun zamonaviy internet-do\'kon platformasi. Saytda mahsulotlar katalogi, qidiruv, narx va o\'lcham bo\'yicha qulay filtrlash hamda xavfsiz onlayn to\'lov tizimi mavjud.',
      features: [
        'Tezkor qidiruv va ko\'p bosqichli filtrlash tizimi',
        'Foydalanuvchi savatchasi va saqlangan mahsulotlar (Wishlist)',
        'Stripe to\'lov shlyuzi integratsiyasi',
        'Buyurtmalar tarixi bilan shaxsiy profil'
      ],
      liveUrl: 'https://example.com',
      codeUrl: 'https://github.com'
    },
    3: {
      title: 'Klinika va Tibbiy Xizmatlar Sayti',
      category: 'Frontend / Landing Page',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Google Maps API'],
      previewClass: 'preview-3',
      icon: 'fa-laptop-medical',
      desc: 'Zamonaviy xususiy klinika uchun tayyorlangan ko\'p tarmoqli veb-sayt. Foydalanuvchilar barcha shifokorlar malakasi, xizmatlar narxi bilan tanishib, onlayn qabulga yozilishlari mumkin.',
      features: [
        'Onlayn shifokor qabuliga yozilish shakli (Form)',
        'Barcha tibbiyot yo\'nalishlari bo\'yicha batafsil narxlar jadvali',
        'Klinika manzili va yo\'nalishni ko\'rsatuvchi interaktiv xarita',
        'Mijozlarning fikrlari karuseli'
      ],
      liveUrl: 'https://example.com',
      codeUrl: 'https://github.com'
    },
    4: {
      title: 'TaskFlow Vazifalar Boshqaruvi',
      category: 'Veb Ilova / Productivity',
      tags: ['React.js', 'HTML5 Drag & Drop', 'LocalStorage', 'CSS Modules'],
      previewClass: 'preview-4',
      icon: 'fa-list-check',
      desc: 'Shaxsiy unumdorlik va jamoaviy vazifalarni nazorat qilish uchun Kanban doskasi. Vazifalarni "Bajarilishi kerak", "Jarayonda" va "Bajarildi" ustunlari o\'rtasida sudrab o\'tkazish mumkin.',
      features: [
        'Silliq Drag & Drop vositasi yordamida kartalarni ko\'chirish',
        'Vazifalarni LocalStorage-da saqlash (sahifa yangilansa ham yo\'qolmaydi)',
        'Muddat (Deadline) va muhimlik darajalarini belgilash',
        'Vazifalarni qidirish va teglash tizimi'
      ],
      liveUrl: 'https://example.com',
      codeUrl: 'https://github.com'
    },
    5: {
      title: 'CryptoPay Hamyon Ilovasi',
      category: 'UI/UX Dizayn',
      tags: ['Figma', 'Mobile App UI', 'Design System', 'AutoLayout'],
      previewClass: 'preview-5',
      icon: 'fa-wallet',
      desc: 'Foydalanuvchilarga qulay, shaffof va zamonaviy Neobank hamda kripto hamyon ilovasi dizayni. Foydalanish tajribasi (UX) soddalashtirilgan va bir necha soniyada pul o\'tkazish imkonini beradi.',
      features: [
        '30+ dan ortiq yuqori sifatli mobil ekranlar va prototip',
        'To\'liq Design System (ranglar, shriftlar, komponentlar)',
        'Foydalanuvchi tadqiqoti (User Research) va Wireframe bosqichlari',
        'iOS va Android yo\'riqnomalariga to\'liq moslik'
      ],
      liveUrl: 'https://figma.com',
      codeUrl: 'https://behance.net'
    },
    6: {
      title: 'Ob-Havo va Prognoz Ilovasi',
      category: 'API Integratsiya / Frontend',
      tags: ['JavaScript (ES6)', 'OpenWeather API', 'Geolocation API', 'CSS Grid'],
      previewClass: 'preview-6',
      icon: 'fa-cloud-sun-rain',
      desc: 'Dunyoning istalgan shahri bo\'yicha aniq va batafsil ob-havo ma\'lumotlarini taqdim etuvchi interaktiv veb-ilova. Shaharni avtomatik aniqlash va qidiruv imkoniyati mavjud.',
      features: [
        'Geolokatsiya orqali hozirgi turgan joy ob-havosini avtomatik chiqarish',
        'Kelgusi 7 kunlik ob-havo harorati va namlik darajasi',
        'Ob-havo holatiga mos ravishda o\'zgaruvchi dinamik fon va animatsiyalar',
        'Dunyodagi har qanday shaharni tezkor qidirish'
      ],
      liveUrl: 'https://example.com',
      codeUrl: 'https://github.com'
    }
  };

  const modal = document.getElementById('project-modal');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalClose = document.getElementById('modal-close');
  const modalBody = document.getElementById('modal-body');
  const detailBtns = document.querySelectorAll('.project-details-btn');

  detailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      const project = projectDetails[id];
      if (project) {
        openModal(project);
      }
    });
  });

  function openModal(item) {
    if (!modal || !modalBody) return;

    modalBody.innerHTML = `
      <div class="modal-header-visual ${item.previewClass}">
        <i class="fa-solid ${item.icon}"></i>
      </div>
      <span class="project-badge" style="position: static; display: inline-block; margin-bottom: 0.8rem;">${item.category}</span>
      <h3 class="modal-title">${item.title}</h3>
      <div class="modal-tags">
        ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>
      <p class="modal-desc">${item.desc}</p>
      
      <h4 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 0.6rem; color: var(--text-main);">Asosiy Imkoniyatlar:</h4>
      <ul class="modal-features-list">
        ${item.features.map(f => `<li><i class="fa-solid fa-circle-check"></i> ${f}</li>`).join('')}
      </ul>

      <div class="modal-actions">
        <a href="${item.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
          <i class="fa-solid fa-arrow-up-right-from-square"></i> Jonli Ko'rish
        </a>
        <a href="${item.codeUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
          <i class="fa-brands fa-github"></i> Manba Kodi
        </a>
      </div>
    `;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  /* ==========================================
     8. CONTACT FORM VALIDATION & SUBMISSION
     ========================================== */
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('user-name');
      const emailInput = document.getElementById('user-email');
      const messageInput = document.getElementById('user-message');

      const nameError = document.getElementById('name-error');
      const emailError = document.getElementById('email-error');
      const messageError = document.getElementById('message-error');

      let isValid = true;

      // Reset errors
      if (nameError) nameError.textContent = '';
      if (emailError) emailError.textContent = '';
      if (messageError) messageError.textContent = '';

      // Validate Name
      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        if (nameError) nameError.textContent = 'Iltimos, ismingizni to\'liq kiriting (kamida 2 belgi)';
        nameInput.focus();
        isValid = false;
      }

      // Validate Email / Telegram
      const emailVal = emailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isTelegram = emailVal.startsWith('@') && emailVal.length > 2;

      if (!emailVal || (!emailRegex.test(emailVal) && !isTelegram)) {
        if (emailError) emailError.textContent = 'Iltimos, to\'g\'ri email yoki @username kiriting';
        if (isValid) emailInput.focus();
        isValid = false;
      }

      // Validate Message
      if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
        if (messageError) messageError.textContent = 'Xabaringiz kamida 10 ta belgidan iborat bo\'lishi kerak';
        if (isValid) messageInput.focus();
        isValid = false;
      }

      if (!isValid) return;

      // Simulate sending with spinner
      const btnText = submitBtn.querySelector('.btn-text');
      const btnSpinner = submitBtn.querySelector('.btn-spinner');

      if (btnText && btnSpinner) {
        btnText.classList.add('hidden');
        btnSpinner.classList.remove('hidden');
        submitBtn.disabled = true;
      }

      setTimeout(() => {
        if (btnText && btnSpinner) {
          btnText.classList.remove('hidden');
          btnSpinner.classList.add('hidden');
          submitBtn.disabled = false;
        }

        // Success notification
        showToast(
          'Muvaffaqiyatli yuborildi!',
          'Xabaringiz qabul qilindi. Tez orada siz bilan bog\'lanaman!',
          'success'
        );

        contactForm.reset();
      }, 1200);
    });
  }

  /* ==========================================
     9. CV DOWNLOAD SIMULATION
     ========================================== */
  const cvBtn = document.getElementById('cv-download-btn');
  if (cvBtn) {
    cvBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast(
        'CV Yuklab Olish',
        'Rezyume fayli tayyorlanmoqda. Namunaviy CV yuklash boshlandi.',
        'info'
      );
    });
  }

  /* ==========================================
     10. TOAST NOTIFICATIONS HELPER
     ========================================== */
  function showToast(title, message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconClass = 'fa-solid fa-circle-info';
    if (type === 'success') iconClass = 'fa-solid fa-circle-check';
    if (type === 'error') iconClass = 'fa-solid fa-circle-exclamation';

    toast.innerHTML = `
      <div class="toast-icon"><i class="${iconClass}"></i></div>
      <div class="toast-content">
        <h4 class="toast-title">${title}</h4>
        <p class="toast-message">${message}</p>
      </div>
    `;

    container.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.classList.add('show');
    }, 50);

    // Auto remove after 4.5 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (container.contains(toast)) {
          container.removeChild(toast);
        }
      }, 400);
    }, 4500);
  }

  /* ==========================================
     11. FOOTER CURRENT YEAR
     ========================================== */
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

});
