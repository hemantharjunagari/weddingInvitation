// Wedding Details Configuration - Arjunagari Family Invitation
const WEDDING_CONFIG = {
  couple: "Lakshmi Prasanna & Praveen",
  title: "Wedding of Chi.La.Sou. A. Lakshmi Prasanna & Chi. P. Praveen (Arjunagari Family)",
  description: "Arjunagari Family cordially invites you with family & friends to celebrate the wedding ceremonies of Chi.La.Sou. A. Lakshmi Prasanna (Prasanna Lakshmi) with Chi. P. Praveen at SRL Kalyana Mandapam, Venkatagiri.",
  location: "SRL Kalyana Mandapam, Tirupati Road, Venkatagiri, Tirupati District, Andhra Pradesh",
  
  // Muhurtham Date (Main Target for Countdown)
  muhurthamDateISO: "2026-11-20T04:30:00+05:30",
  muhurthamEndDateISO: "2026-11-20T12:00:00+05:30",
  targetDate: new Date("2026-11-20T04:30:00+05:30").getTime(),

  // Reception Date
  receptionDateISO: "2026-11-19T19:00:00+05:30",
  receptionEndDateISO: "2026-11-19T22:30:00+05:30"
};

// ----------------------------------------------------
// 1. Live Countdown Timer (Targeting Sumuhurtham)
// ----------------------------------------------------
function initCountdown() {
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  function update() {
    const now = new Date().getTime();
    const distance = WEDDING_CONFIG.targetDate - now;

    if (distance < 0) {
      if (daysEl) daysEl.textContent = "00";
      if (hoursEl) hoursEl.textContent = "00";
      if (minutesEl) minutesEl.textContent = "00";
      if (secondsEl) secondsEl.textContent = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, "0");
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, "0");
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  update();
  setInterval(update, 1000);
}

// ----------------------------------------------------
// 2. Add to Calendar (Google Calendar & .ics Download)
// ----------------------------------------------------
function initCalendarButton() {
  const btn = document.getElementById("add-to-cal-btn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const startDate = new Date(WEDDING_CONFIG.muhurthamDateISO);
    const endDate = new Date(WEDDING_CONFIG.muhurthamEndDateISO);

    const formatGoogleDate = (d) => d.toISOString().replace(/-|:|\.\d\d\d/g, "");
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      WEDDING_CONFIG.title
    )}&dates=${formatGoogleDate(startDate)}/${formatGoogleDate(
      endDate
    )}&details=${encodeURIComponent(
      WEDDING_CONFIG.description
    )}&location=${encodeURIComponent(WEDDING_CONFIG.location)}`;

    const icsData = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Arjunagari Family Wedding Invitation//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `SUMMARY:${WEDDING_CONFIG.title}`,
      `DESCRIPTION:${WEDDING_CONFIG.description}`,
      `LOCATION:${WEDDING_CONFIG.location}`,
      `DTSTART:${formatGoogleDate(startDate)}`,
      `DTEND:${formatGoogleDate(endDate)}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const openGCal = confirm(
      "Click 'OK' to add to Google Calendar, or 'Cancel' to download the .ics file for Apple/Outlook Calendar."
    );

    if (openGCal) {
      window.open(gCalUrl, "_blank");
    } else {
      const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "Lakshmi-Prasanna-Praveen-Wedding.ics";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  });
}

// ----------------------------------------------------
// 3. Falling Petals Animation
// ----------------------------------------------------
function initPetals() {
  const canvas = document.getElementById("petals-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const petalCount = 26;
  const petals = [];
  const petalColors = [
    "rgba(246, 219, 214, 0.7)", // soft blush
    "rgba(238, 189, 180, 0.6)", // rose petal
    "rgba(252, 248, 240, 0.8)", // jasmine cream
    "rgba(220, 190, 135, 0.5)", // champagne gold
    "rgba(206, 218, 205, 0.5)"  // soft sage
  ];

  for (let i = 0; i < petalCount; i++) {
    petals.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 8 + 8,
      speedX: Math.random() * 1.2 - 0.6,
      speedY: Math.random() * 1.2 + 0.8,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 2 - 1,
      color: petalColors[Math.floor(Math.random() * petalColors.length)]
    });
  }

  function drawPetal(x, y, size, rotation, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(size / 2, -size / 2, size, -size / 4, size, size / 2);
    ctx.bezierCurveTo(size / 2, size, 0, size, 0, 0);
    ctx.fill();
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (const p of petals) {
      p.x += p.speedX;
      p.y += p.speedY;
      p.rotation += p.rotationSpeed;

      if (p.y > height + 20) {
        p.y = -20;
        p.x = Math.random() * width;
      }
      if (p.x > width + 20) p.x = -20;
      if (p.x < -20) p.x = width + 20;

      drawPetal(p.x, p.y, p.size, p.rotation, p.color);
    }
    requestAnimationFrame(animate);
  }

  animate();
}

// ----------------------------------------------------
// 4. Background Ambient Melodic Chimes (Web Audio API)
// ----------------------------------------------------
function initMusicToggle() {
  const toggleBtn = document.getElementById("music-toggle");
  const musicIcon = document.getElementById("music-icon");
  const tooltip = document.getElementById("music-tooltip");

  if (!toggleBtn) return;

  let isPlaying = false;
  let audioCtx = null;
  let synthInterval = null;

  // Auspicious Carnatic / Kalyani pentatonic notes (Mohanam / Kalyani scale)
  const notes = [
    261.63, // Sa (C4)
    293.66, // Ri (D4)
    329.63, // Ga (E4)
    392.00, // Pa (G4)
    440.00, // Dha (A4)
    523.25, // Sa (C5)
    587.33  // Ri (D5)
  ];

  function playChime() {
    if (!audioCtx || !isPlaying) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      const note = notes[Math.floor(Math.random() * notes.length)];
      osc.type = "sine";
      osc.frequency.setValueAtTime(note, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.035, audioCtx.currentTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 3.2);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 3.3);
    } catch (e) {
      console.warn("Audio chime error:", e);
    }
  }

  function startMusic() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    isPlaying = true;
    toggleBtn.classList.add("music-playing");
    musicIcon.classList.remove("fa-music");
    musicIcon.classList.add("fa-pause");
    tooltip.innerHTML = '<span class="flex items-center gap-1.5"><i class="fa-solid fa-pause text-champagne-400"></i> Melody Playing</span>';

    playChime();
    synthInterval = setInterval(() => {
      playChime();
      if (Math.random() > 0.45) {
        setTimeout(playChime, 450);
      }
    }, 1900);
  }

  function stopMusic() {
    isPlaying = false;
    toggleBtn.classList.remove("music-playing");
    musicIcon.classList.remove("fa-pause");
    musicIcon.classList.add("fa-music");
    tooltip.innerHTML = '<span class="flex items-center gap-1.5"><i class="fa-solid fa-volume-high text-champagne-400"></i> Tap for melody</span>';
    if (synthInterval) clearInterval(synthInterval);
  }

  toggleBtn.addEventListener("click", () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  });
}

// ----------------------------------------------------
// 5. English / Telugu Language Toggle
// ----------------------------------------------------
const I18N = {
  en: {
    btnText: "తెలుగు",
    mobileBtnText: "Switch to తెలుగు",
    familyTag: '<i class="fa-solid fa-om text-champagne-600"></i> Arjunagari Family Wedding Invitation',
    greeting: "Smt. Aruna & Sri A. Mohan, APSRTC cordially solicit your gracious presence on the wedding celebrations of their elder daughter",
    brideTitle: "Chi.La.Sou.",
    brideName: "A. Lakshmi Prasanna",
    brideSub: "(Prasanna Lakshmi), B.E.",
    weds: "weds",
    groomTitle: "Chi.",
    groomName: "P. Praveen",
    groomSub: "B.Tech.",
    dateBadge: "20th November 2026, Friday",
    muhurthamBadge: "Muhurtham: 4:30 AM – 6:00 AM",
    venueBadge: "SRL Kalyana Mandapam, Venkatagiri",
    calBtn: "Add to Calendar",
    countdownTitle: "Counting down every auspicious moment to the Sumuhurtham",
    lblDays: "Days",
    lblHours: "Hours",
    lblMins: "Mins",
    lblSecs: "Secs",
    navInvitation: "The Invitation",
    navSchedule: "Ceremonies",
    navVenue: "Venue & Map",
    navMoments: "Moments"
  },
  te: {
    btnText: "English",
    mobileBtnText: "Switch to English",
    familyTag: '<i class="fa-solid fa-om text-champagne-600"></i> అర్జునగారి వారి పెండ్లిపిలుపు',
    greeting: "శ్రీమతి అరుణ & శ్రీ అర్జునగారి మోహన్ (APSRTC) గార్ల జ్యేష్ఠ కుమార్తె వివాహ మహోత్సవ ఆహ్వానం",
    brideTitle: "చి॥ల॥సౌ॥",
    brideName: "ఎ. లక్ష్మీ ప్రసన్న",
    brideSub: "(ప్రసన్న లక్ష్మి) B.E.",
    weds: "కళ్యాణం",
    groomTitle: "చి॥",
    groomName: "పి. ప్రవీణ్",
    groomSub: "B.Tech.",
    dateBadge: "20-11-2026, శుక్రవారం",
    muhurthamBadge: "సుముహూర్తం: ఉ॥ 4.30 - 6.00 గం॥ల మధ్య",
    venueBadge: "ఎస్.ఆర్.ఎల్. కళ్యాణమండపము, వెంకటగిరి",
    calBtn: "క్యాలెండర్‌లో జోడించండి",
    countdownTitle: "సుముహూర్త శుభ ఘడియల కోసం ఎదురుచూపులు",
    lblDays: "రోజులు",
    lblHours: "గంటలు",
    lblMins: "నిమిషాలు",
    lblSecs: "సెకన్లు",
    navInvitation: "ఆహ్వాన పత్రిక",
    navSchedule: "శుభకార్యాలు",
    navVenue: "కళ్యాణ వేదిక",
    navMoments: "మధుర క్షణాలు"
  }
};

function applyLanguage(lang) {
  const data = I18N[lang];
  if (!data) return;

  const btnText = document.getElementById("lang-btn-text");
  const mBtnText = document.getElementById("m-lang-btn-text");
  if (btnText) btnText.textContent = data.btnText;
  if (mBtnText) mBtnText.textContent = data.mobileBtnText;

  const familyTag = document.getElementById("hero-family-tag");
  if (familyTag) familyTag.innerHTML = data.familyTag;

  const greeting = document.getElementById("hero-greeting");
  if (greeting) greeting.textContent = data.greeting;

  const brideTitle = document.getElementById("hero-bride-title");
  if (brideTitle) brideTitle.textContent = data.brideTitle;

  const brideName = document.getElementById("hero-bride-name");
  if (brideName) brideName.textContent = data.brideName;

  const brideSub = document.getElementById("hero-bride-sub");
  if (brideSub) brideSub.textContent = data.brideSub;

  const weds = document.getElementById("hero-weds");
  if (weds) weds.textContent = data.weds;

  const groomTitle = document.getElementById("hero-groom-title");
  if (groomTitle) groomTitle.textContent = data.groomTitle;

  const groomName = document.getElementById("hero-groom-name");
  if (groomName) groomName.textContent = data.groomName;

  const groomSub = document.getElementById("hero-groom-sub");
  if (groomSub) groomSub.textContent = data.groomSub;

  const dateBadge = document.getElementById("hero-date-badge");
  if (dateBadge) dateBadge.textContent = data.dateBadge;

  const muhurthamBadge = document.getElementById("hero-muhurtham-badge");
  if (muhurthamBadge) muhurthamBadge.textContent = data.muhurthamBadge;

  const venueBadge = document.getElementById("hero-venue-badge");
  if (venueBadge) venueBadge.textContent = data.venueBadge;

  const calBtnText = document.getElementById("hero-cal-btn-text");
  if (calBtnText) calBtnText.textContent = data.calBtn;

  const cdTitle = document.getElementById("lbl-countdown-title");
  if (cdTitle) cdTitle.textContent = data.countdownTitle;

  const lDays = document.getElementById("lbl-days");
  if (lDays) lDays.textContent = data.lblDays;
  const lHours = document.getElementById("lbl-hours");
  if (lHours) lHours.textContent = data.lblHours;
  const lMins = document.getElementById("lbl-minutes");
  if (lMins) lMins.textContent = data.lblMins;
  const lSecs = document.getElementById("lbl-seconds");
  if (lSecs) lSecs.textContent = data.lblSecs;

  const navInv = document.getElementById("nav-invitation");
  if (navInv) navInv.textContent = data.navInvitation;
  const navSch = document.getElementById("nav-schedule");
  if (navSch) navSch.textContent = data.navSchedule;
  const navVen = document.getElementById("nav-venue");
  if (navVen) navVen.textContent = data.navVenue;
  const navMom = document.getElementById("nav-moments");
  if (navMom) navMom.textContent = data.navMoments;

  const mNavInv = document.getElementById("m-nav-invitation");
  if (mNavInv) mNavInv.textContent = data.navInvitation;
  const mNavSch = document.getElementById("m-nav-schedule");
  if (mNavSch) mNavSch.textContent = data.navSchedule;
  const mNavVen = document.getElementById("m-nav-venue");
  if (mNavVen) mNavVen.textContent = data.navVenue;
  const mNavMom = document.getElementById("m-nav-moments");
  if (mNavMom) mNavMom.textContent = data.navMoments;

  const enSection = document.getElementById("content-english");
  const teSection = document.getElementById("content-telugu");

  if (lang === "te") {
    document.documentElement.classList.add("lang-te");
    document.documentElement.setAttribute("lang", "te");
    if (enSection) enSection.classList.add("hidden");
    if (teSection) teSection.classList.remove("hidden");
  } else {
    document.documentElement.classList.remove("lang-te");
    document.documentElement.setAttribute("lang", "en");
    if (teSection) teSection.classList.add("hidden");
    if (enSection) enSection.classList.remove("hidden");
  }

  try {
    localStorage.setItem("wedding_lang_pref", lang);
  } catch (e) {}
}

function initLanguageToggle() {
  const btn = document.getElementById("lang-toggle-btn");
  const mobileBtn = document.getElementById("lang-toggle-btn-mobile");

  let currentLang = "en";
  try {
    const saved = localStorage.getItem("wedding_lang_pref");
    if (saved === "te" || saved === "en") {
      currentLang = saved;
    }
  } catch (e) {}

  applyLanguage(currentLang);

  function toggle() {
    currentLang = currentLang === "en" ? "te" : "en";
    applyLanguage(currentLang);
  }

  if (btn) btn.addEventListener("click", toggle);
  if (mobileBtn) mobileBtn.addEventListener("click", toggle);
}

// ----------------------------------------------------
// 8. Copy Address to Clipboard
// ----------------------------------------------------
function initCopyAddress() {
  const copyBtn = document.getElementById("copy-address-btn");
  const copyText = document.getElementById("copy-text");

  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(WEDDING_CONFIG.location).then(() => {
        if (copyText) {
          const original = copyText.textContent;
          copyText.textContent = "Copied to Clipboard!";
          setTimeout(() => {
            copyText.textContent = original;
          }, 2000);
        }
      });
    });
  }
}

// ----------------------------------------------------
// 9. Mobile Navigation
// ----------------------------------------------------
function initMobileNav() {
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });
  }
}

// ----------------------------------------------------
// 10. Engagement Photos Carousel
// ----------------------------------------------------
function initCarousel() {
  const track = document.getElementById("carousel-track");
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");
  const dots = document.querySelectorAll(".carousel-dot");
  const currentCounter = document.getElementById("carousel-current");
  const playToggleBtn = document.getElementById("carousel-play-toggle");
  const playIcon = document.getElementById("carousel-play-icon");
  const playText = document.getElementById("carousel-play-text");

  if (!track || dots.length === 0) return;

  const totalSlides = dots.length;
  let currentIndex = 0;
  let autoplayInterval = null;
  let isPlaying = true;

  const CAPTIONS = [
    {
      title: "Sacred Blessings with Family & Elders",
      sub: "Auspicious beginnings with family prayers and rituals"
    },
    {
      title: "Seeking Blessings from Beloved Parents",
      sub: "Cherished moments of gratitude, joy, and blessings"
    },
    {
      title: "Blessed Beginnings in Flower Garlands",
      sub: "Lakshmi Prasanna & Praveen with Lord Ganesha's blessings"
    },
    {
      title: "A Joyful Promise of Forever",
      sub: "Playful and happy moments with the engagement rings"
    },
    {
      title: "Together in Love & Laughter",
      sub: "A shared look, a lifetime of companionship"
    },
    {
      title: "The Sacred Rings",
      sub: "Beautiful henna hands holding the sacred bond of love"
    },
    {
      title: "The Happy Couple",
      sub: "Chi.La.Sou. A. Lakshmi Prasanna & Chi. P. Praveen"
    },
    {
      title: "Family Celebrations on Stage",
      sub: "Lakshmi Prasanna & Praveen surrounded by loving parents and siblings"
    },
    {
      title: "Together with Beloved Family",
      sub: "Warm smiles and sweet memories with family elders"
    },
    {
      title: "Cherished Family Gathering",
      sub: "A heartwarming group portrait of both families celebrating together"
    }
  ];

  function goToSlide(index) {
    if (index < 0) {
      currentIndex = totalSlides - 1;
    } else if (index >= totalSlides) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    if (currentCounter) {
      currentCounter.textContent = currentIndex + 1;
    }

    const capTitle = document.getElementById("carousel-caption-title");
    const capSub = document.getElementById("carousel-caption-sub");
    if (capTitle && CAPTIONS[currentIndex]) capTitle.textContent = CAPTIONS[currentIndex].title;
    if (capSub && CAPTIONS[currentIndex]) capSub.textContent = CAPTIONS[currentIndex].sub;

    dots.forEach((dot, i) => {
      if (i === currentIndex) {
        dot.className = "carousel-dot w-8 h-2.5 rounded-full bg-champagne-500 transition-all duration-300";
      } else {
        dot.className = "carousel-dot w-2.5 h-2.5 rounded-full bg-champagne-200 hover:bg-champagne-300 transition-all duration-300";
      }
    });
  }

  function startAutoplay() {
    if (autoplayInterval) clearInterval(autoplayInterval);
    isPlaying = true;
    if (playIcon) playIcon.className = "fa-solid fa-pause";
    if (playText) playText.textContent = "Pause";
    autoplayInterval = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 4500);
  }

  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
    isPlaying = false;
    if (playIcon) playIcon.className = "fa-solid fa-play";
    if (playText) playText.textContent = "Play";
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      goToSlide(currentIndex - 1);
      if (isPlaying) startAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      goToSlide(currentIndex + 1);
      if (isPlaying) startAutoplay();
    });
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const idx = parseInt(e.currentTarget.getAttribute("data-index"), 10);
      goToSlide(idx);
      if (isPlaying) startAutoplay();
    });
  });

  if (playToggleBtn) {
    playToggleBtn.addEventListener("click", () => {
      if (isPlaying) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    });
  }

  // Touch Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        goToSlide(currentIndex + 1);
      } else {
        goToSlide(currentIndex - 1);
      }
      if (isPlaying) startAutoplay();
    }
  }, { passive: true });

  // Pause on mouse hover
  const container = track.closest(".relative");
  if (container) {
    container.addEventListener("mouseenter", () => {
      if (autoplayInterval) clearInterval(autoplayInterval);
    });
    container.addEventListener("mouseleave", () => {
      if (isPlaying) startAutoplay();
    });
  }

  goToSlide(0);
  startAutoplay();
}

// ----------------------------------------------------
// App Initialization
// ----------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  initCountdown();
  initCalendarButton();
  initPetals();
  initMusicToggle();
  initLanguageToggle();
  initCarousel();
  initCopyAddress();
  initMobileNav();
});
