(() => {
  'use strict';

  const diyaMessages = [
    {
      title: 'The first light — your smile',
      message: 'I hope you never underestimate the way your smile can change an ordinary day. Even in the middle of a hundred little things, the thought of you brings a little warmth into my world. Keep finding reasons to smile, my love — and never feel you have to smile when you need a moment to yourself.'
    },
    {
      title: 'A light for your beautiful heart',
      message: 'One of my favourite things is the way you care — in the little details, the thoughtful words, and the love you give so naturally. I hope the world is just as gentle with your heart as you are with the people you love.'
    },
    {
      title: 'A light for your strength',
      message: 'I see how much you carry, how much you try, and how determined you are even when a day feels heavy. But remember, you do not have to be strong every minute. You deserve rest, softness, help, and all the patience you so often give others.'
    },
    {
      title: 'A light for your dreams',
      message: 'Please keep dreaming big, Pari. I hope you walk towards every ambition with that same determination, and I hope you never make yourself smaller to fit anyone else’s expectations. I will always be cheering for the person you are becoming.'
    },
    {
      title: 'A light that feels like home',
      message: 'With you, even the simplest things feel a little more meaningful. A conversation, a quiet evening, a silly joke, a plan for someday — you make the idea of home feel less like a place and more like a person I get to choose, again and again.'
    },
    {
      title: 'A light for our little things',
      message: 'I want the grand celebrations, of course, but I also want the ordinary days: chai, errands, random photographs, sleepy calls, laughter over nothing, and the little rituals only we understand. Those are the moments I want to keep collecting with you.'
    },
    {
      title: 'A light for everything ahead',
      message: 'There are so many places we have not seen, plans we have not made, and memories waiting somewhere in our future. I hope we keep making room for each other’s dreams while building a few shared ones of our own.'
    },
    {
      title: 'A light for the team we are',
      message: 'When life gets loud, I hope you remember that you have a teammate. Not someone who expects you to be cheerful every day, but someone who wants to listen, learn, laugh, plan, and stand beside you through all the changing seasons.'
    },
    {
      title: 'The ninth light — my favourite choice',
      message: 'Nine months, countless little moments, and one simple wish: may we keep choosing each other with kindness, keep growing without losing ourselves, and keep making a home in one another. I am grateful for this chapter, and excited for all the pages still waiting for us.'
    }
  ];

  const diyaGrid = document.getElementById('diyaGrid');
  const diyaCount = document.getElementById('diyaCount');
  const diyaProgress = document.getElementById('diyaProgress');
  const allLitMessage = document.getElementById('allLitMessage');
  const diyaDialog = document.getElementById('diyaDialog');
  const dialogTitle = document.getElementById('dialogTitle');
  const dialogMessage = document.getElementById('dialogMessage');
  const dialogEyebrow = document.getElementById('dialogEyebrow');
  const dialogClose = document.getElementById('dialogClose');
  const dialogDone = document.getElementById('dialogDone');
  const lit = new Set();

  function buildDiyas() {
    diyaMessages.forEach((item, index) => {
      const number = index + 1;
      const button = document.createElement('button');
      button.className = 'diya-button';
      button.type = 'button';
      button.setAttribute('aria-label', `Light diya ${number}: ${item.title}`);
      button.setAttribute('aria-pressed', 'false');
      button.innerHTML = `
        <span class="diya-art" aria-hidden="true">
          <span class="diya-flame"></span>
          <span class="diya-bowl"></span>
          <span class="diya-number">${number}</span>
        </span>
        <span class="diya-label">${number === 1 ? 'A little joy' : number === 4 ? 'Your dreams' : number === 5 ? 'Our home' : number === 9 ? 'Always us' : 'A little light'}</span>
      `;
      button.addEventListener('click', () => lightDiya(number, button));
      diyaGrid.appendChild(button);
    });
  }

  function lightDiya(number, button) {
    if (!lit.has(number)) {
      lit.add(number);
      button.classList.add('lit');
      button.setAttribute('aria-pressed', 'true');
    }
    const item = diyaMessages[number - 1];
    dialogEyebrow.textContent = `diya ${number} · a little light for you`;
    dialogTitle.textContent = item.title;
    dialogMessage.textContent = item.message;
    if (typeof diyaDialog.showModal === 'function') {
      diyaDialog.showModal();
    } else {
      alert(`${item.title}\n\n${item.message}`);
    }
    updateDiyaProgress();
  }

  function updateDiyaProgress() {
    const count = lit.size;
    diyaCount.textContent = String(count);
    diyaProgress.style.width = `${(count / 9) * 100}%`;
    if (count === 9) {
      allLitMessage.hidden = false;
    }
  }

  function closeDialog() {
    if (diyaDialog.open) diyaDialog.close();
  }
  dialogClose.addEventListener('click', closeDialog);
  dialogDone.addEventListener('click', closeDialog);
  diyaDialog.addEventListener('click', (event) => {
    if (event.target === diyaDialog) closeDialog();
  });
  diyaDialog.addEventListener('close', () => {
    if (lit.size === 9) {
      allLitMessage.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest' });
    }
  });

  // Accessible photo lightbox.
  const photoDialog = document.getElementById('photoDialog');
  const lightboxImage = document.getElementById('lightboxImage');
  const photoDialogClose = document.getElementById('photoDialogClose');
  document.querySelectorAll('[data-full]').forEach((button) => {
    button.addEventListener('click', () => {
      lightboxImage.src = button.dataset.full;
      const source = button.querySelector('img');
      lightboxImage.alt = source ? source.alt : 'Expanded photograph';
      if (typeof photoDialog.showModal === 'function') photoDialog.showModal();
    });
  });
  function closePhotoDialog() {
    if (photoDialog.open) photoDialog.close();
    lightboxImage.src = '';
  }
  photoDialogClose.addEventListener('click', closePhotoDialog);
  photoDialog.addEventListener('click', (event) => {
    if (event.target === photoDialog) closePhotoDialog();
  });

  // Mobile navigation.
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  menuToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    menuToggle.textContent = open ? '×' : '☰';
  });
  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
      menuToggle.textContent = '☰';
    });
  });

  // Header treatment and page progress.
  const header = document.querySelector('.site-header');
  const progressFill = document.getElementById('progressFill');
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 45);
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    progressFill.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Scroll reveal; reduced-motion users see content immediately.
  const revealEls = document.querySelectorAll('.reveal');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  // Gentle fireworks canvas, active only while the night chapter is in view.
  const canvas = document.getElementById('fireworksCanvas');
  const nightSection = document.getElementById('us');
  const ctx = canvas.getContext ? canvas.getContext('2d') : null;
  let particles = [];
  let fireworksActive = false;
  let rafId = 0;
  let lastBurst = 0;
  const colors = ['#f7d79b', '#f4b5c7', '#d8c6f0', '#ffdfbc', '#f4a8a1'];

  function resizeCanvas() {
    if (!ctx) return;
    const rect = nightSection.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(rect.width * ratio);
    canvas.height = Math.floor(rect.height * ratio);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function burst() {
    if (!ctx) return;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    const x = Math.random() * w;
    const y = 55 + Math.random() * Math.min(330, h * 0.5);
    const color = colors[Math.floor(Math.random() * colors.length)];
    const count = 22 + Math.floor(Math.random() * 17);
    for (let i = 0; i < count; i += 1) {
      const angle = (Math.PI * 2 * i) / count;
      const speed = 0.55 + Math.random() * 1.65;
      particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 45 + Math.random() * 32, max: 77, color, size: 1 + Math.random() * 1.3 });
    }
  }

  function animateFireworks(timestamp) {
    if (!ctx || !fireworksActive || reduceMotion) return;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    ctx.clearRect(0, 0, w, h);
    if (timestamp - lastBurst > 1550 + Math.random() * 1050) {
      burst();
      lastBurst = timestamp;
    }
    particles = particles.filter((particle) => particle.life > 0);
    particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vy += 0.012;
      particle.vx *= 0.994;
      particle.life -= 1;
      ctx.globalAlpha = Math.max(0, particle.life / particle.max);
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    rafId = window.requestAnimationFrame(animateFireworks);
  }

  if (ctx && !reduceMotion && 'IntersectionObserver' in window) {
    const fireObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        fireworksActive = entry.isIntersecting;
        if (fireworksActive && !rafId) {
          resizeCanvas();
          rafId = window.requestAnimationFrame(animateFireworks);
        } else if (!fireworksActive && rafId) {
          window.cancelAnimationFrame(rafId);
          rafId = 0;
          ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        }
      });
    }, { threshold: 0.04 });
    fireObserver.observe(nightSection);
    window.addEventListener('resize', resizeCanvas, { passive: true });
  }

  buildDiyas();
})();
