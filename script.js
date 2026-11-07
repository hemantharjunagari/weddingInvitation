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
// 4. Background Wedding Melody Audio Player
// ----------------------------------------------------
function initMusicToggle() {
  const toggleBtn = document.getElementById("music-toggle");
  const musicIcon = document.getElementById("music-icon");
  const tooltip = document.getElementById("music-tooltip");
  const audio = document.getElementById("wedding-bg-audio");

  if (!toggleBtn || !audio) return;

  // Set low ambient background volume (25%)
  audio.volume = 0.25;

  let isPlaying = false;
  let wasPlayingBeforeHidden = false;
  let manualPause = false;

  function updateTooltip(playing) {
    if (!tooltip) return;
    if (playing) {
      const text = currentAppLang === "te" ? "సంగీతం ప్లే అవుతోంది" : "Melody Playing (Soft)";
      tooltip.innerHTML = `<span class="flex items-center gap-1.5"><i class="fa-solid fa-pause text-champagne-400"></i> ${text}</span>`;
    } else {
      const text = currentAppLang === "te" ? "సంగీతం వినండి" : "Tap for melody";
      tooltip.innerHTML = `<span class="flex items-center gap-1.5"><i class="fa-solid fa-volume-high text-champagne-400"></i> ${text}</span>`;
    }
  }

  function startMusic() {
    audio.volume = 0.25;
    audio.play().then(() => {
      isPlaying = true;
      manualPause = false;
      toggleBtn.classList.add("music-playing");
      if (musicIcon) {
        musicIcon.classList.remove("fa-music");
        musicIcon.classList.add("fa-pause");
      }
      updateTooltip(true);
      removeFirstInteractionListeners();
    }).catch((err) => {
      console.warn("Autoplay was prevented by browser policy:", err);
    });
  }

  function stopMusic(isManual = true) {
    audio.pause();
    isPlaying = false;
    if (isManual) {
      manualPause = true;
      wasPlayingBeforeHidden = false;
    }
    toggleBtn.classList.remove("music-playing");
    if (musicIcon) {
      musicIcon.classList.remove("fa-pause");
      musicIcon.classList.add("fa-music");
    }
    updateTooltip(false);
  }

  toggleBtn.addEventListener("click", () => {
    if (isPlaying) {
      stopMusic(true);
    } else {
      startMusic();
    }
  });

  audio.addEventListener("play", () => {
    isPlaying = true;
    toggleBtn.classList.add("music-playing");
    if (musicIcon) {
      musicIcon.classList.remove("fa-music");
      musicIcon.classList.add("fa-pause");
    }
    updateTooltip(true);
  });

  audio.addEventListener("pause", () => {
    if (!audio.seeking) {
      isPlaying = false;
      toggleBtn.classList.remove("music-playing");
      if (musicIcon) {
        musicIcon.classList.remove("fa-pause");
        musicIcon.classList.add("fa-music");
      }
      updateTooltip(false);
    }
  });

  // Stop music when the page is not being watched (tab switched, window minimized, phone locked)
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      if (isPlaying) {
        wasPlayingBeforeHidden = true;
        stopMusic(false); // Pause without marking manual pause
      }
    } else {
      if (wasPlayingBeforeHidden && !manualPause) {
        wasPlayingBeforeHidden = false;
        startMusic();
      }
    }
  });

  window.addEventListener("blur", () => {
    if (isPlaying) {
      wasPlayingBeforeHidden = true;
      stopMusic(false);
    }
  });

  window.addEventListener("focus", () => {
    if (wasPlayingBeforeHidden && !document.hidden && !manualPause) {
      wasPlayingBeforeHidden = false;
      startMusic();
    }
  });

  // Attempt autoplay immediately on page load
  startMusic();

  // If browser blocks autoplay until interaction, play on first user tap/scroll/click
  function handleFirstInteraction() {
    if (manualPause || isPlaying) return;
    removeFirstInteractionListeners();
    startMusic();
  }

  function removeFirstInteractionListeners() {
    window.removeEventListener("click", handleFirstInteraction);
    window.removeEventListener("touchstart", handleFirstInteraction);
    window.removeEventListener("scroll", handleFirstInteraction);
    window.removeEventListener("keydown", handleFirstInteraction);
  }

  window.addEventListener("click", handleFirstInteraction, { passive: true });
  window.addEventListener("touchstart", handleFirstInteraction, { passive: true });
  window.addEventListener("scroll", handleFirstInteraction, { passive: true });
  window.addEventListener("keydown", handleFirstInteraction, { passive: true });

  window.addEventListener("wedding_lang_changed", () => {
    updateTooltip(isPlaying);
  });
}

// ----------------------------------------------------
// 5. English / Telugu Language Toggle & Bilingual Dictionaries
// ----------------------------------------------------
let currentAppLang = "en";
let currentCarouselIndex = 0;

const CAROUSEL_CAPTIONS = {
  en: [
    {
      title: "Exchange of Lagna Patrika",
      sub: "Bride's parents presenting the auspicious Lagna Patrika to the groom's brother & sister-in-law"
    },
    {
      title: "Exchange of Lagna Patrika",
      sub: "Groom's brother & sister-in-law presenting the auspicious Lagna Patrika to the bride's parents"
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
      title: "Group Photo with Bride's Family",
      sub: "Joyful celebrations on stage with the bride's loving family"
    },
    {
      title: "Group Photo with Parents of Bride & Groom",
      sub: "A heartwarming portrait with the parents of both bride and groom"
    },
    {
      title: "Group Photo with Groom's Parents",
      sub: "Cherished celebrations and blessings with the groom's parents on stage"
    }
  ],
  te: [
    {
      title: "లగ్నపత్రిక సమర్పణ",
      sub: "వరుని అన్న, వదిన గార్లకు లగ్నపత్రిక అందజేస్తున్న వధువు తల్లిదండ్రులు"
    },
    {
      title: "లగ్నపత్రిక సమర్పణ",
      sub: "వధువు తల్లిదండ్రులకు లగ్నపత్రిక అందజేస్తున్న వరుని అన్న మరియు వదిన గార్లు"
    },
    {
      title: "పూలమాలలతో నూతన జంట",
      sub: "గణపతి ఆశీస్సులతో ఒక్కటవుతున్న లక్ష్మీ ప్రసన్న & ప్రవీణ్"
    },
    {
      title: "శాశ్వత బంధానికి నాంది",
      sub: "ఉంగరాలు మార్చుకున్న ఆనందకర వేళ"
    },
    {
      title: "ప్రేమానురాగాల కలయిక",
      sub: "జీవితాంతం తోడుంటామని ఒకరికొకరు ఇచ్చిన మాట"
    },
    {
      title: "పవిత్ర నిశ్చితార్థ ఉంగరాలు",
      sub: "మెహందీ చేతులలో ముచ్చటైన ఉంగరాల కానుక"
    },
    {
      title: "నూతన దంపతులు",
      sub: "చి॥ల॥సౌ॥ ఎ. లక్ష్మీ ప్రసన్న & చి॥ పి. ప్రవీణ్"
    },
    {
      title: "వధువు కుటుంబ సభ్యులతో సమూహ చిత్రం",
      sub: "వేదికపై వధువు కుటుంబ సభ్యులతో కలిసి ఆనందకర క్షణాలు"
    },
    {
      title: "వధూవరుల తల్లిదండ్రులతో సమూహ చిత్రం",
      sub: "వధూవరుల ఉభయ తల్లిదండ్రులతో కలిసి తీయించుకున్న ఆత్మీయ చిత్రం"
    },
    {
      title: "వరుని తల్లిదండ్రులతో సమూహ చిత్రం",
      sub: "వేదికపై వరుని తల్లిదండ్రులతో కలిసి దిగిన అందమైన జ్ఞాపకం"
    }
  ]
};

function updateCarouselCaptionDisplay() {
  const capTitle = document.getElementById("carousel-caption-title");
  const capSub = document.getElementById("carousel-caption-sub");
  const list = CAROUSEL_CAPTIONS[currentAppLang] || CAROUSEL_CAPTIONS.en;
  if (list && list[currentCarouselIndex]) {
    if (capTitle) capTitle.textContent = list[currentCarouselIndex].title;
    if (capSub) capSub.textContent = list[currentCarouselIndex].sub;
  }
}

const I18N = {
  en: {
    btnText: "తెలుగు",
    mobileBtnText: "Switch to తెలుగు",
    familyTag: '<i class="fa-solid fa-om text-champagne-600"></i> Arjunagari Family Wedding Invitation',
    greeting: "Smt. Aruna & Sri A. Mohan, APSRTC cordially solicit your gracious presence on the wedding celebrations of their elder daughter",
    slokaSub: "Seeking divine blessings of Lord Shiva & Goddess Parvati",
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
    navMoments: "Moments",

    // Invitation Section
    invBadge: "With Warm Regards",
    invHeading: "The Wedding Invitation",

    // Schedule Section
    schBadge: "Auspicious Occasions",
    schHeading: "Ceremonies & Celebrations",
    schDesc: "Join us across every cherished moment",
    ev1Date: "Thursday, 19th November 2026 • 10:00 AM",
    ev1Title: "Nalugu Ceremony (నలుగు)",
    ev1Desc: "Traditional auspicious turmeric purification and pre-wedding blessing ritual with family and loved ones.",
    ev1Loc: "SRL Kalyana Mandapam Premises",
    ev1Time: "10:00 AM onwards",
    ev1Dir: "Directions",
    ev2Date: "Thursday, 19th November 2026 • 7:00 PM Onwards",
    ev2Badge: "Grand Dinner",
    ev2Title: "Reception & Dinner (రిసెప్షన్ & విందు)",
    ev2Desc: "A grand evening celebration to welcome the guests, congratulate the couple, followed by a sumptuous traditional wedding feast.",
    ev2Loc: "Main Dining & Stage Hall",
    ev2Feast: "Traditional South Indian Feast",
    ev2Dir: "Directions",
    ev3Date: "Friday, 20th November 2026 • Early Morning",
    ev3Badge: "Sumuhurtham",
    ev3Title: "Wedding Ceremony (సుముహూర్తం)",
    ev3Desc: "The sacred marriage ceremony in Subha Lagnam between <strong>4:30 AM – 6:00 AM</strong> (Pushkara Kalam: 5:43 AM – 5:47 AM), tying of the Mangalsutra (Jeelakarra Bellam & Mangalya Dharana), and Saptapadi.",
    ev3Loc: "Kalyana Mandapam Stage",
    ev3Time: "4:30 AM to 6:00 AM",
    ev3Dir: "Directions",

    // Venue Section
    venBadge: "Destination",
    venHeading: "Wedding Venue & Map",
    venType: "Kalyana Mandapam",
    venName: "SRL Kalyana Mandapam",
    venAddress: "Tirupati Road, Venkatagiri, Tirupati District, Andhra Pradesh.",
    venMapBtn: "Open Google Maps",
    copyBtn: "Copy Address",

    // Moments Section
    momBadge: "Our Journey",
    momHeading: "Engagement Moments",
    momDesc: "Glimpses of love, tradition, and togetherness",
    momCountPhoto: "Photo",
    momCountOf: "of",

    // Footer
    ftNames: "Lakshmi Prasanna & Praveen",
    ftQuote: '"Two lives, two hearts, joined together in friendship, united forever in love."',
    ftDate: "19th & 20th November 2026 • Venkatagiri, Andhra Pradesh",
    ftCompliments: "With Best Compliments From: <strong>Near & Dear</strong>",
    ftFamily: "Arjunagari Family Wedding Invitation"
  },
  te: {
    btnText: "English",
    mobileBtnText: "Switch to English",
    familyTag: '<i class="fa-solid fa-om text-champagne-600"></i> అర్జునగారి వారి పెండ్లిపిలుపు',
    greeting: "శ్రీమతి అరుణ & శ్రీ అర్జునగారి మోహన్ (APSRTC) గార్ల జ్యేష్ఠ కుమార్తె వివాహ మహోత్సవ ఆహ్వానం",
    slokaSub: "పార్వతీ పరమేశ్వరుల దివ్య ఆశీస్సులతో...",
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
    navMoments: "మధుర క్షణాలు",

    // Invitation Section
    invBadge: "శుభ ఆహ్వానం",
    invHeading: "వివాహ ఆహ్వాన పత్రిక",

    // Schedule Section
    schBadge: "శుభకార్యాల వివరాలు",
    schHeading: "వివాహ మహోత్సవ కార్యక్రమాలు",
    schDesc: "ప్రతి మధుర క్షణంలో పాల్గొని నూతన వధూవరులను ఆశీర్వదించండి",
    ev1Date: "గురువారం, 19 నవంబర్ 2026 • ఉదయం 10:00 గంటలకు",
    ev1Title: "నలుగు కార్యక్రమము",
    ev1Desc: "బంధుమిత్రుల సమక్షంలో సాంప్రదాయబద్ధంగా జరిగే పసుపు కుంకుమల మంగళకర నలుగు వేడుక.",
    ev1Loc: "ఎస్.ఆర్.ఎల్. కళ్యాణమండప ప్రాంగణం",
    ev1Time: "ఉదయం 10:00 గంటల నుండి",
    ev1Dir: "రూట్ మ్యాప్",
    ev2Date: "గురువారం, 19 నవంబర్ 2026 • సాయంత్రం 7:00 గంటల నుండి",
    ev2Badge: "స్నేహ విందు",
    ev2Title: "రిసెప్షన్ & విందు (స్నేహసమ్మేళనం)",
    ev2Desc: "వధూవరులకు శుభాకాంక్షలు తెలుపుతూ, బంధుమిత్రులతో ఆత్మీయ కలయిక మరియు రుచికరమైన సాంప్రదాయ వివాహ భోజన విందు.",
    ev2Loc: "డైనింగ్ & స్టేజ్ హాల్",
    ev2Feast: "రుచికరమైన సాంప్రదాయ విందు భోజనం",
    ev2Dir: "రూట్ మ్యాప్",
    ev3Date: "శుక్రవారం, 20 నవంబర్ 2026 • ఉదయాత్పూర్వం",
    ev3Badge: "సుముహూర్తం",
    ev3Title: "మాంగల్యధారణ - పాణిగ్రహణ మహోత్సవం",
    ev3Desc: "శుభ లగ్నమందు <strong>ఉదయాత్పూర్వం 4:30 - 6:00 గంటల మధ్య</strong> (పుష్కరకాలం: 5:43 - 5:47 ని॥ల మధ్య) జీలకర్ర బెల్లం, మాంగల్యధారణ, సప్తపది వేదమంత్రోచ్ఛారణల మధ్య.",
    ev3Loc: "కళ్యాణమండప వేదిక",
    ev3Time: "ఉదయం 4:30 నుండి 6:00 గంటల వరకు",
    ev3Dir: "రూట్ మ్యాప్",

    // Venue Section
    venBadge: "కళ్యాణ వేదిక",
    venHeading: "వేదిక & మార్గదర్శిని (మ్యాప్)",
    venType: "కళ్యాణ మండపము",
    venName: "ఎస్.ఆర్.ఎల్. కళ్యాణమండపము",
    venAddress: "తిరుపతి రోడ్, వెంకటగిరి, తిరుపతి జిల్లా, ఆంధ్రప్రదేశ్.",
    venMapBtn: "గూగుల్ మ్యాప్స్ చూడండి",
    copyBtn: "చిరునామా కాపీ చేయండి",

    // Moments Section
    momBadge: "మధుర క్షణాలు",
    momHeading: "నిశ్చితార్థ వేడుక దృశ్యాలు",
    momDesc: "ప్రేమ, సాంప్రదాయం మరియు కుటుంబ బంధాల అందమైన జ్ఞాపకాలు",
    momCountPhoto: "ఫోటో",
    momCountOf: "/",

    // Footer
    ftNames: "లక్ష్మీ ప్రసన్న & ప్రవీణ్",
    ftQuote: '"రెండు మనసులు, రెండు జీవితాలు.. ఆలుమగలుగా ఒక్కటైన పవిత్ర బంధం."',
    ftDate: "19 & 20 నవంబర్ 2026 • వెంకటగిరి, ఆంధ్రప్రదేశ్",
    ftCompliments: "తమరాకను కోరు: <strong>బంధుమిత్రులు & కుటుంబ సభ్యులు</strong>",
    ftFamily: "అర్జునగారి వారి పెండ్లిపిలుపు"
  }
};

function setElText(id, text) {
  const el = document.getElementById(id);
  if (el && text !== undefined) el.textContent = text;
}

function setElHtml(id, html) {
  const el = document.getElementById(id);
  if (el && html !== undefined) el.innerHTML = html;
}

function applyLanguage(lang) {
  const data = I18N[lang];
  if (!data) return;
  currentAppLang = lang;

  setElText("lang-btn-text", data.btnText);
  setElText("m-lang-btn-text", data.mobileBtnText);

  setElHtml("hero-family-tag", data.familyTag);
  setElText("hero-greeting", data.greeting);
  setElText("hero-sloka-sub", data.slokaSub);

  setElText("hero-bride-title", data.brideTitle);
  setElText("hero-bride-name", data.brideName);
  setElText("hero-bride-sub", data.brideSub);

  setElText("hero-weds", data.weds);

  setElText("hero-groom-title", data.groomTitle);
  setElText("hero-groom-name", data.groomName);
  setElText("hero-groom-sub", data.groomSub);

  setElText("hero-date-badge", data.dateBadge);
  setElText("hero-muhurtham-badge", data.muhurthamBadge);
  setElText("hero-venue-badge", data.venueBadge);

  setElText("hero-cal-btn-text", data.calBtn);
  setElText("lbl-countdown-title", data.countdownTitle);

  setElText("lbl-days", data.lblDays);
  setElText("lbl-hours", data.lblHours);
  setElText("lbl-minutes", data.lblMins);
  setElText("lbl-seconds", data.lblSecs);

  setElText("nav-invitation", data.navInvitation);
  setElText("nav-schedule", data.navSchedule);
  setElText("nav-venue", data.navVenue);
  setElText("nav-moments", data.navMoments);

  setElText("m-nav-invitation", data.navInvitation);
  setElText("m-nav-schedule", data.navSchedule);
  setElText("m-nav-venue", data.navVenue);
  setElText("m-nav-moments", data.navMoments);

  // Invitation
  setElText("inv-badge", data.invBadge);
  setElText("inv-heading", data.invHeading);

  // Schedule
  setElText("sch-badge", data.schBadge);
  setElText("sch-heading", data.schHeading);
  setElText("sch-desc", data.schDesc);

  setElText("ev1-date", data.ev1Date);
  setElText("ev1-title", data.ev1Title);
  setElText("ev1-desc", data.ev1Desc);
  setElText("ev1-loc", data.ev1Loc);
  setElText("ev1-time", data.ev1Time);
  setElText("ev1-dir", data.ev1Dir);

  setElText("ev2-date", data.ev2Date);
  setElText("ev2-badge", data.ev2Badge);
  setElText("ev2-title", data.ev2Title);
  setElText("ev2-desc", data.ev2Desc);
  setElText("ev2-loc", data.ev2Loc);
  setElText("ev2-feast", data.ev2Feast);
  setElText("ev2-dir", data.ev2Dir);

  setElText("ev3-date", data.ev3Date);
  setElText("ev3-badge", data.ev3Badge);
  setElText("ev3-title", data.ev3Title);
  setElHtml("ev3-desc", data.ev3Desc);
  setElText("ev3-loc", data.ev3Loc);
  setElText("ev3-time", data.ev3Time);
  setElText("ev3-dir", data.ev3Dir);

  // Venue
  setElText("ven-badge", data.venBadge);
  setElText("ven-heading", data.venHeading);
  setElText("ven-type", data.venType);
  setElText("ven-name", data.venName);
  setElText("ven-address", data.venAddress);
  setElText("ven-map-btn-text", data.venMapBtn);
  setElText("copy-text", data.copyBtn);

  // Moments
  setElText("mom-badge", data.momBadge);
  setElText("mom-heading", data.momHeading);
  setElText("mom-desc", data.momDesc);
  setElText("mom-count-photo", data.momCountPhoto);
  setElText("mom-count-of", data.momCountOf);

  // Update carousel caption in new language
  updateCarouselCaptionDisplay();

  // Footer
  setElText("ft-names", data.ftNames);
  setElText("ft-quote", data.ftQuote);
  setElText("ft-date", data.ftDate);
  setElHtml("ft-compliments", data.ftCompliments);
  setElText("ft-family", data.ftFamily);

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

  window.dispatchEvent(new CustomEvent("wedding_lang_changed", { detail: { lang } }));
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
          copyText.textContent = currentAppLang === "te" ? "కాపీ చేయబడింది!" : "Copied to Clipboard!";
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
  let autoplayInterval = null;
  let isPlaying = true;

  function goToSlide(index) {
    if (index < 0) {
      currentCarouselIndex = totalSlides - 1;
    } else if (index >= totalSlides) {
      currentCarouselIndex = 0;
    } else {
      currentCarouselIndex = index;
    }

    track.style.transform = `translateX(-${currentCarouselIndex * 100}%)`;

    if (currentCounter) {
      currentCounter.textContent = currentCarouselIndex + 1;
    }

    updateCarouselCaptionDisplay();

    dots.forEach((dot, i) => {
      if (i === currentCarouselIndex) {
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
      goToSlide(currentCarouselIndex + 1);
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
      goToSlide(currentCarouselIndex - 1);
      if (isPlaying) startAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      goToSlide(currentCarouselIndex + 1);
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
        goToSlide(currentCarouselIndex + 1);
      } else {
        goToSlide(currentCarouselIndex - 1);
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
// 11. Fullscreen Photo Lightbox Modal
// ----------------------------------------------------
function initPhotoLightbox() {
  const lightbox = document.getElementById("photo-lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const closeBtn = document.getElementById("lightbox-close");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");

  if (!lightbox || !lightboxImg) return;

  const carouselImages = Array.from(document.querySelectorAll(".carousel-slide-item img"));
  let currentActiveIndex = -1;
  let isCarouselMode = false;

  function openLightbox(src, alt, captionText, index = -1) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || "Wedding photo";
    if (lightboxCaption) {
      lightboxCaption.textContent = captionText || alt || "";
      lightboxCaption.style.display = captionText || alt ? "block" : "none";
    }

    if (index >= 0 && carouselImages.length > 0) {
      isCarouselMode = true;
      currentActiveIndex = index;
      if (prevBtn) prevBtn.style.display = "flex";
      if (nextBtn) nextBtn.style.display = "flex";
    } else {
      isCarouselMode = false;
      currentActiveIndex = -1;
      if (prevBtn) prevBtn.style.display = "none";
      if (nextBtn) nextBtn.style.display = "none";
    }

    lightbox.classList.remove("hidden");
    // Trigger fade in animation
    requestAnimationFrame(() => {
      lightbox.classList.remove("opacity-0");
      lightbox.classList.add("opacity-100");
    });
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("opacity-100");
    lightbox.classList.add("opacity-0");
    setTimeout(() => {
      lightbox.classList.add("hidden");
      lightboxImg.src = "";
      document.body.style.overflow = "";
    }, 280);
  }

  function showLightboxIndex(idx) {
    if (carouselImages.length === 0) return;
    if (idx < 0) idx = carouselImages.length - 1;
    if (idx >= carouselImages.length) idx = 0;
    currentActiveIndex = idx;

    const targetImg = carouselImages[idx];
    if (!targetImg) return;

    let capText = targetImg.getAttribute("alt") || "";
    const list = CAROUSEL_CAPTIONS[currentAppLang] || CAROUSEL_CAPTIONS.en;
    if (list && list[idx]) {
      capText = `${list[idx].title} — ${list[idx].sub}`;
    }

    lightboxImg.style.opacity = "0.4";
    lightboxImg.src = targetImg.src;
    lightboxImg.alt = targetImg.alt || "Engagement photo";
    setTimeout(() => {
      lightboxImg.style.opacity = "1";
    }, 150);

    if (lightboxCaption) {
      lightboxCaption.textContent = capText;
      lightboxCaption.style.display = capText ? "block" : "none";
    }
  }

  // Attach click listener to all lightbox triggers
  document.querySelectorAll(".lightbox-trigger").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.stopPropagation();
      const img = el.tagName === "IMG" ? el : el.querySelector("img");
      if (!img) return;

      const idxAttr = el.getAttribute("data-index") || img.getAttribute("data-index");
      const captionAttr = el.getAttribute("data-caption") || img.getAttribute("data-caption") || img.getAttribute("alt");

      if (idxAttr !== null && idxAttr !== undefined) {
        const idx = parseInt(idxAttr, 10);
        let capText = captionAttr;
        const list = CAROUSEL_CAPTIONS[currentAppLang] || CAROUSEL_CAPTIONS.en;
        if (list && list[idx]) {
          capText = `${list[idx].title} — ${list[idx].sub}`;
        }
        openLightbox(img.src, img.alt, capText, idx);
      } else {
        openLightbox(img.src, img.alt, captionAttr, -1);
      }
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);

  // Close on backdrop click (click outside image)
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target.classList.contains("relative") && !lightboxImg.contains(e.target)) {
      closeLightbox();
    }
  });

  if (prevBtn) {
    prevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (isCarouselMode) showLightboxIndex(currentActiveIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (isCarouselMode) showLightboxIndex(currentActiveIndex + 1);
    });
  }

  // Keyboard navigation
  window.addEventListener("keydown", (e) => {
    if (lightbox.classList.contains("hidden")) return;
    if (e.key === "Escape") {
      closeLightbox();
    } else if (e.key === "ArrowLeft" && isCarouselMode) {
      showLightboxIndex(currentActiveIndex - 1);
    } else if (e.key === "ArrowRight" && isCarouselMode) {
      showLightboxIndex(currentActiveIndex + 1);
    }
  });

  // Touch swipe support in lightbox
  let lbStartX = 0;
  let lbEndX = 0;

  lightbox.addEventListener("touchstart", (e) => {
    lbStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener("touchend", (e) => {
    lbEndX = e.changedTouches[0].screenX;
    const diff = lbStartX - lbEndX;
    if (Math.abs(diff) > 40 && isCarouselMode) {
      if (diff > 0) {
        showLightboxIndex(currentActiveIndex + 1);
      } else {
        showLightboxIndex(currentActiveIndex - 1);
      }
    }
  }, { passive: true });
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
  initPhotoLightbox();
  initCopyAddress();
  initMobileNav();
});
