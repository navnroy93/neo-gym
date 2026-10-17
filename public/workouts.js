/**
 * NEO GYM - Workout Plans Page Logic
 * Interactive Men & Women Splits, Biceps Specialization, Accordions & Theme Sync
 */

// ==========================================
// 1. THEME INITIALIZATION
// ==========================================
function initTheme() {
  const savedTheme = localStorage.getItem('neo_gym_theme') || localStorage.getItem('smn_gym_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('neo_gym_theme', newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  const btn = document.getElementById('themeToggleBtn');
  if (!btn) return;
  const icon = btn.querySelector('i');
  if (icon) {
    if (theme === 'dark') {
      icon.className = 'fa-solid fa-sun';
      btn.title = 'Switch to Light Theme';
      btn.setAttribute('aria-label', 'Switch to Light Theme');
    } else {
      icon.className = 'fa-solid fa-moon';
      btn.title = 'Switch to Dark Theme';
      btn.setAttribute('aria-label', 'Switch to Dark Theme');
    }
  }
}

initTheme();

// ==========================================
// 2. MOBILE MENU DRAWER
// ==========================================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.addEventListener('click', () => {
    const isActive = navLinks.classList.toggle('active');
    mobileMenuBtn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    const icon = mobileMenuBtn.querySelector('i');
    if (icon) {
      if (isActive) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    }
  });

  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      navLinks.classList.remove('active');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    }
  });
}

// Scrolled Header Style
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (!navbar) return;
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ==========================================
// 3. PLAN SWITCHER TABS (MEN / WOMEN)
// ==========================================
let currentPlan = 'men';

function switchPlan(plan) {
  currentPlan = plan;
  const tabBtnMen = document.getElementById('tabBtnMen');
  const tabBtnWomen = document.getElementById('tabBtnWomen');
  const planMen = document.getElementById('planMen');
  const planWomen = document.getElementById('planWomen');

  if (!tabBtnMen || !tabBtnWomen || !planMen || !planWomen) return;

  if (plan === 'men') {
    tabBtnMen.classList.add('active');
    tabBtnMen.setAttribute('aria-selected', 'true');
    tabBtnWomen.classList.remove('active');
    tabBtnWomen.setAttribute('aria-selected', 'false');

    planMen.classList.add('active');
    planWomen.classList.remove('active');
  } else {
    tabBtnWomen.classList.add('active');
    tabBtnWomen.setAttribute('aria-selected', 'true');
    tabBtnMen.classList.remove('active');
    tabBtnMen.setAttribute('aria-selected', 'false');

    planWomen.classList.add('active');
    planMen.classList.remove('active');
  }
}

// ==========================================
// 4. DAY / CATEGORY ACCORDION TOGGLE
// ==========================================
function toggleDay(dayId) {
  const card = document.getElementById(dayId);
  if (!card) return;
  card.classList.toggle('open');
}

// ==========================================
// 5. WHATSAPP MODAL
// ==========================================
const waModal = document.getElementById('whatsAppModal');
const waText = document.getElementById('waCustomText');
const GYM_PHONE = '918892152766';

function openWhatsAppModal(presetMsg) {
  if (!waModal) return;
  waModal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  if (presetMsg && waText) {
    waText.value = presetMsg;
  } else if (waText && !waText.value) {
    waText.value = 'Hi! I am reviewing the NEO GYM Workout Plans and want to book my free workout session.';
  }
}

function closeWhatsAppModal() {
  if (!waModal) return;
  waModal.style.display = 'none';
  document.body.style.overflow = '';
}

function setWhatsAppMsg(msg) {
  if (waText) {
    waText.value = msg;
  }
}

function sendWhatsAppDirect() {
  const msg = (waText && waText.value.trim()) || 'Hi! I am contacting NEO GYM regarding training programs.';
  const url = `https://wa.me/${GYM_PHONE}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
  closeWhatsAppModal();
}

// Close modal on backdrop click
if (waModal) {
  waModal.addEventListener('click', (e) => {
    if (e.target === waModal) closeWhatsAppModal();
  });
}

// Escape key closes modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeWhatsAppModal();
});


// ============================================================
// 6. INTELLIGENT GYM ASSISTANT BOT (NEO FITNESS BOT)
// ============================================================
const botWindow = document.getElementById('botWindow');
const botMessages = document.getElementById('botMessages');
const botInput = document.getElementById('botInput');

function toggleGymBot() {
  if (!botWindow) return;
  const isHidden = botWindow.style.display === 'none' || botWindow.style.display === '';
  botWindow.style.display = isHidden ? 'flex' : 'none';
  if (isHidden && botInput) {
    setTimeout(() => botInput.focus(), 200);
  }
}

function openGymBot() {
  if (!botWindow) return;
  botWindow.style.display = 'flex';
  if (botInput) {
    setTimeout(() => botInput.focus(), 200);
  }
}

function askBotQuestion(question) {
  if (!botWindow || botWindow.style.display === 'none') {
    openGymBot();
  }
  addBotMessage(question, 'outgoing');
  processBotReply(question);
}

function handleBotSubmit(event) {
  event.preventDefault();
  if (!botInput) return;
  const question = botInput.value.trim();
  if (!question) return;

  addBotMessage(question, 'outgoing');
  botInput.value = '';
  processBotReply(question);
}

function addBotMessage(text, direction = 'incoming') {
  if (!botMessages) return;

  const msgDiv = document.createElement('div');
  msgDiv.className = `bot-msg ${direction}`;

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  msgDiv.innerHTML = `
    <div class="bot-bubble">${text}</div>
    <span class="msg-time">${timeStr}</span>
  `;

  botMessages.appendChild(msgDiv);
  botMessages.scrollTop = botMessages.scrollHeight;
}

// Knowledge Base Engine for NEO GYM
function processBotReply(userQuery) {
  const q = userQuery.toLowerCase().trim();
  let reply = '';

  // Show typing simulation
  const typingDiv = document.createElement('div');
  typingDiv.className = 'bot-msg incoming';
  typingDiv.id = 'botTyping';
  typingDiv.innerHTML = `
    <div class="bot-bubble" style="color: var(--text-muted); font-style: italic;">
      <i class="fa-solid fa-spinner fa-spin"></i> NEO Gym Assistant is typing...
    </div>
  `;
  botMessages.appendChild(typingDiv);
  botMessages.scrollTop = botMessages.scrollHeight;

  setTimeout(() => {
    const typingElem = document.getElementById('botTyping');
    if (typingElem) typingElem.remove();

    // 1. CHEST WORKOUT
    if (q.includes('chest') || q.includes('bench press') || q.includes('push up') || q.includes('pec') || q.includes('incline press')) {
      reply = `
        <strong>💥 Official NEO GYM Chest Training Protocol:</strong><br><br>
        <strong>• Men’s Chest Split (Day 1):</strong><br>
        1. Barbell Bench Press — 4 sets × 6–10 reps<br>
        2. Incline Dumbbell Press (30°) — 3 sets × 8–12 reps<br>
        3. Machine Chest Press — 3 sets × 10–12 reps<br>
        4. Cable Chest Fly — 3 sets × 12–15 reps<br>
        5. Push-ups (Finisher) — 2 sets × 10–15 reps<br><br>
        <strong>• Women’s Chest Split (Day 1):</strong><br>
        1. Dumbbell Bench Press — 3 sets × 8–12 reps<br>
        2. Incline Dumbbell Press — 3 sets × 8–12 reps<br>
        3. Machine Chest Press — 3 sets × 10–12 reps<br>
        4. Cable Chest Fly — 3 sets × 12–15 reps<br>
        5. Incline Push-ups — 2 sets × 8–15 reps<br><br>
        <em>💡 Form Cue: Retract scapulae, brace core, and control a 2-second negative eccentric lowering phase.</em><br>
        <button class="btn btn-sm btn-outline" style="margin-top:10px; width:100%;" onclick="toggleDay('m-day-1')">
          <i class="fa-solid fa-dumbbell"></i> View Chest Workout Card
        </button>
      `;
    }
    // 2. BICEPS WORKOUT (Dedicated Specialization)
    else if (q.includes('bicep') || q.includes('biceps') || q.includes('curl') || q.includes('arm') || q.includes('arms') || q.includes('hammer') || q.includes('preacher')) {
      reply = `
        <strong>💪 Official NEO GYM Biceps Specialization Protocol:</strong><br><br>
        Engineered for complete arm hypertrophy, peak contraction, and forearm density:<br><br>
        1. <strong>Standing Dumbbell Biceps Curl:</strong> 3 sets × 10–12 reps<br>
        2. <strong>EZ-Bar Curl:</strong> 3 sets × 8–12 reps<br>
        3. <strong>Incline Dumbbell Curl:</strong> 3 sets × 10–12 reps<br>
        4. <strong>Hammer Curl:</strong> 3 sets × 10–12 reps<br>
        5. <strong>Preacher Curl:</strong> 2 sets × 12–15 reps<br><br>
        <em>💡 Form Cue: Supinate wrists at the top of dumbbell curls, lock elbows at sides, and emphasize strict isolation without swinging.</em><br>
        <button class="btn btn-sm btn-outline" style="margin-top:10px; width:100%;" onclick="toggleDay('m-biceps')">
          <i class="fa-solid fa-bolt"></i> View Dedicated Biceps Workout
        </button>
      `;
    }
    // 3. SHOULDERS WORKOUT
    else if (q.includes('shoulder') || q.includes('deltoid') || q.includes('delt') || q.includes('lateral raise') || q.includes('overhead press') || q.includes('military press') || q.includes('face pull')) {
      reply = `
        <strong>🛡️ Official NEO GYM Shoulders Protocol (Day 2):</strong><br><br>
        <strong>• Men’s Shoulders:</strong><br>
        1. Seated Dumbbell Press — 3 sets × 8–10 reps<br>
        2. Dumbbell Lateral Raises — 4 sets × 12–15 reps<br>
        3. Reverse Pec Deck — 3 sets × 12–15 reps<br>
        4. Cable Lateral Raises — 3 sets × 12–15 reps<br>
        5. Dumbbell Front Raises — 2 sets × 10–12 reps<br><br>
        <strong>• Women’s Shoulders:</strong><br>
        1. Seated Dumbbell Press — 3 sets × 8–12 reps<br>
        2. Dumbbell Lateral Raises — 3 sets × 12–15 reps<br>
        3. Reverse Pec Deck — 3 sets × 12–15 reps<br>
        4. Cable Lateral Raises — 2 sets × 12–15 reps<br>
        5. Face Pulls — 3 sets × 12–15 reps<br>
        <button class="btn btn-sm btn-outline" style="margin-top:10px; width:100%;" onclick="toggleDay('m-day-2')">
          <i class="fa-solid fa-dumbbell"></i> Open Shoulders Plan
        </button>
      `;
    }
    // 4. BACK & LATS WORKOUT
    else if (q.includes('back') || q.includes('lat') || q.includes('lats') || q.includes('pulldown') || q.includes('cable row') || q.includes('rowing') || q.includes('rhomboid')) {
      reply = `
        <strong>🦅 Official NEO GYM Back & Lats Protocol (Day 3):</strong><br><br>
        <strong>• Men’s Back Split:</strong><br>
        1. Lat Pulldown — 4 sets × 8–12 reps<br>
        2. Seated Cable Row — 3 sets × 8–12 reps<br>
        3. Chest-Supported Dumbbell Row — 3 sets × 10–12 reps<br>
        4. Straight-Arm Cable Pulldown — 3 sets × 12–15 reps<br>
        5. Back Extensions — 2 sets × 12–15 reps<br><br>
        <strong>• Women’s Back Split:</strong><br>
        1. Lat Pulldown — 3 sets × 8–12 reps<br>
        2. Seated Cable Row — 3 sets × 8–12 reps<br>
        3. Single-Arm Dumbbell Row — 3 sets × 10–12 reps<br>
        4. Straight-Arm Cable Pulldown — 2 sets × 12–15 reps<br>
        5. Back Extensions — 2 sets × 12–15 reps<br>
        <button class="btn btn-sm btn-outline" style="margin-top:10px; width:100%;" onclick="toggleDay('m-day-3')">
          <i class="fa-solid fa-dumbbell"></i> Open Back & Lats Plan
        </button>
      `;
    }
    // 5. ABS & CORE WORKOUT
    else if (q.includes('abs') || q.includes('core') || q.includes('plank') || q.includes('crunch') || q.includes('six pack') || q.includes('belly') || q.includes('oblique')) {
      reply = `
        <strong>⚡ Official NEO GYM Abs & Core Protocol (Day 4):</strong><br><br>
        <strong>• Men’s Core Routine:</strong><br>
        1. Cable Crunches — 3 sets × 12–15 reps<br>
        2. Hanging Knee Raises — 3 sets × 10–15 reps<br>
        3. Plank Hold — 3 sets × 30–60 sec<br>
        4. Dead Bugs — 3 sets × 10 reps/side<br>
        5. Bicycle Crunches — 2 sets × 15 reps/side<br><br>
        <strong>• Women’s Core Routine:</strong><br>
        1. Cable Crunches — 3 sets × 12–15 reps<br>
        2. Reverse Crunches — 3 sets × 10–15 reps<br>
        3. Plank Hold — 3 sets × 30–45 sec<br>
        4. Dead Bugs — 3 sets × 10 reps/side<br>
        5. Side Plank — 2 sets × 20–40 sec/side<br>
        <button class="btn btn-sm btn-outline" style="margin-top:10px; width:100%;" onclick="toggleDay('m-day-4')">
          <i class="fa-solid fa-dumbbell"></i> Open Abs & Core Plan
        </button>
      `;
    }
    // 6. LEGS & GLUTES WORKOUT
    else if (q.includes('leg') || q.includes('legs') || q.includes('glute') || q.includes('glutes') || q.includes('quad') || q.includes('hamstring') || q.includes('squat') || q.includes('leg press') || q.includes('hip thrust') || q.includes('calf') || q.includes('calves')) {
      reply = `
        <strong>🔥 Official NEO GYM Legs & Lower Body Protocol (Day 5):</strong><br><br>
        <strong>• Men’s Lower Body:</strong><br>
        1. Barbell Squat — 4 sets × 6–10 reps<br>
        2. Romanian Deadlift — 3 sets × 8–12 reps<br>
        3. 45° Linear Leg Press — 3 sets × 10–12 reps<br>
        4. Leg Curls — 3 sets × 10–15 reps<br>
        5. Standing Calf Raises — 3 sets × 12–20 reps<br><br>
        <strong>• Women’s Legs & Glutes:</strong><br>
        1. Goblet or Barbell Squat — 3 sets × 8–12 reps<br>
        2. Barbell Hip Thrust — 4 sets × 8–12 reps<br>
        3. Romanian Deadlift — 3 sets × 8–12 reps<br>
        4. Bulgarian Split Squat — 2 sets × 8–10 reps/leg<br>
        5. Seated Leg Curls — 3 sets × 10–15 reps<br>
        6. Hip Abduction Machine — 2 sets × 12–20 reps<br>
        <button class="btn btn-sm btn-outline" style="margin-top:10px; width:100%;" onclick="toggleDay('m-day-5')">
          <i class="fa-solid fa-dumbbell"></i> Open Legs & Glutes Plan
        </button>
      `;
    }
    // 7. ALL WORKOUT PLANS / 5-DAY SPLIT / PDF
    else if (q.includes('workout') || q.includes('split') || q.includes('routine') || q.includes('program') || q.includes('pdf') || q.includes('exercise') || q.includes('5 day') || q.includes('training')) {
      reply = `
        <strong>📋 NEO GYM Master Training Splits & PDF Guide:</strong><br><br>
        Our training curriculum is structured into balanced 5-day splits plus dedicated specialization:<br>
        • <strong>Day 1:</strong> Chest & Upper Pectorals<br>
        • <strong>Day 2:</strong> Shoulders & Deltoids<br>
        • <strong>Day 3:</strong> Back & Lat Width<br>
        • <strong>Day 4:</strong> Abs & Deep Core Stability<br>
        • <strong>Day 5:</strong> Legs & Glute Power<br>
        • <strong>Specialization:</strong> Targeted 5-Exercise Biceps Protocol<br>
        • <strong>Days 6–7:</strong> Active Recovery & Joint Repair<br><br>
        <a href="assets/NEO_GYM_Workout_Plans.pdf" download class="btn btn-sm btn-glass" style="margin-top:6px; width:100%;">
          <i class="fa-solid fa-file-pdf"></i> Download Official PDF Guide
        </a>
      `;
    }
    // 8. TIMINGS & OPERATING HOURS
    else if (q.includes('time') || q.includes('timing') || q.includes('hour') || q.includes('open') || q.includes('close') || q.includes('schedule') || q.includes('batch') || q.includes('sunday')) {
      reply = `
        <strong>⏰ NEO GYM Operating Hours:</strong><br><br>
        • <strong>Mon – Sat (Morning Batch):</strong> 05:30 AM – 10:30 AM<br>
        • <strong>Mon – Sat (Evening Batch):</strong> 04:30 PM – 10:00 PM<br>
        • <strong>Sunday:</strong> Closed (Deep sanitization & scheduled recovery)<br><br>
        Members have full flexibility to train during either the morning or evening batch based on their daily schedule!
      `;
    }
    // 9. MEMBERSHIP, FEES, PRICING & OFFERS
    else if (q.includes('fee') || q.includes('cost') || q.includes('price') || q.includes('pricing') || q.includes('plan') || q.includes('charge') || q.includes('rate') || q.includes('month') || q.includes('package') || q.includes('offer') || q.includes('discount')) {
      reply = `
        <strong>💳 Transparent Membership Packages at NEO GYM:</strong><br><br>
        • <strong>1 Month Standard:</strong> ₹1,000 / month<br>
        • <strong>3 Months Transformation:</strong> ₹2,500 <em>(Save ₹500 • Includes initial fitness & diet chart)</em><br>
        • <strong>12 Months Annual VIP:</strong> ₹8,000 / year <em>(Complete 365 days • Includes 1-month pause feature)</em><br>
        • <strong>Personal Training (1-on-1):</strong> Tailored packages available with certified trainers.<br><br>
        Zero hidden admission or registration fees! Full access to cardio arena and heavy iron floor.<br>
        <button class="btn btn-sm btn-whatsapp" onclick="openWhatsAppModal('Hi! I want to confirm membership fees and current offers at NEO Gym.')">
          <i class="fa-brands fa-whatsapp"></i> Chat with Owner for Current Offers
        </button>
      `;
    }
    // 10. EQUIPMENT & MACHINERY
    else if (q.includes('equipment') || q.includes('machine') || q.includes('facilities') || q.includes('weight') || q.includes('dumbbell') || q.includes('barbell') || q.includes('treadmill') || q.includes('iron') || q.includes('shower') || q.includes('locker')) {
      reply = `
        <strong>🏋️ Heavy Iron Machinery & Floor Facilities:</strong><br><br>
        • <strong>Heavy Strength:</strong> 45° Linear leg press, Olympic power cages, flat/incline/decline benches, Smith machine.<br>
        • <strong>Cardio Zone:</strong> Motorized commercial treadmills, cross-trainers, spin cycles with heart-rate telemetry.<br>
        • <strong>Cable Decks:</strong> Dual functional cable stations, wide lat pulldowns, seated cable rows.<br>
        • <strong>Free Weights:</strong> Olympic barbells, calibrated cast iron plates, and dumbbell rack pairs up to 40kg+.<br>
        • <strong>Amenities:</strong> Clean wooden flooring, rubberized deadlift bays, locker storage, and clean showers.
      `;
    }
    // 11. PERSONAL COACHING & TRAINERS
    else if (q.includes('personal') || q.includes('trainer') || q.includes('trainers') || q.includes('coach') || q.includes('coaching') || q.includes('pt') || q.includes('guidance')) {
      reply = `
        <strong>🤝 1-on-1 Personal Coaching at NEO GYM:</strong><br><br>
        Accelerate your goals with certified floor coaches for:<br>
        • Rapid body recomposition & targeted fat loss<br>
        • Hypertrophy, strength, and progressive overload tracking<br>
        • Biomechanical joint-safe posture and lifting form correction<br>
        • Customized calorie and macronutrient roadmaps.<br><br>
        <button class="btn btn-sm btn-whatsapp" onclick="openWhatsAppModal('Hi! I am interested in 1-on-1 Personal Training packages at NEO Gym.')">
          <i class="fa-brands fa-whatsapp"></i> Inquire about PT with Head Coach
        </button>
      `;
    }
    // 12. FREE TRIAL & REGISTRATION
    else if (q.includes('trial') || q.includes('free') || q.includes('visit') || q.includes('demo') || q.includes('join') || q.includes('register') || q.includes('pass')) {
      reply = `
        <strong>🎟️ Claim Your Free 1-Day Trial Pass:</strong><br><br>
        Experience NEO GYM in person with zero commitment! Test our Olympic weights, cardio decks, and consult with our floor trainers.<br><br>
        <a href="index.html#register" class="btn btn-sm btn-primary" style="margin-top:6px; width:100%;">
          <i class="fa-solid fa-bolt"></i> Claim Free 1-Day Pass Now
        </a>
        <button class="btn btn-sm btn-whatsapp" style="margin-top:6px;" onclick="openWhatsAppModal('Hi! I would like to book my Free 1-Day Workout Pass at NEO Gym.')">
          <i class="fa-brands fa-whatsapp"></i> Book Trial via WhatsApp
        </button>
      `;
    }
    // 13. VIDEOS & STREAMING
    else if (q.includes('video') || q.includes('videos') || q.includes('watch') || q.includes('stream') || q.includes('playlist')) {
      reply = `
        <strong>📹 NEO GYM Video Streaming:</strong><br><br>
        Watch high-definition workout tutorials, athlete form checks, and training demonstrations directly on our website video player with continuous autoplay.<br>
        <a href="index.html#videos" class="btn btn-sm btn-outline" style="margin-top:10px; width:100%;">
          <i class="fa-solid fa-play"></i> Watch Workout Videos
        </a>
      `;
    }
    // 14. CONTACT, OWNER, PHONE & LOCATION
    else if (q.includes('contact') || q.includes('phone') || q.includes('number') || q.includes('mobile') || q.includes('owner') || q.includes('call') || q.includes('address') || q.includes('location') || q.includes('where')) {
      reply = `
        <strong>📞 NEO GYM Contact & Owner Desk:</strong><br><br>
        • <strong>Phone / Direct Call:</strong> <a href="tel:8892152766" style="color:var(--gold-primary); font-weight:bold;">+91 8892152766</a><br>
        • <strong>WhatsApp:</strong> Instant chat directly with the gym owner.<br>
        • <strong>Hours:</strong> Mon–Sat 5:30–10:30 AM & 4:30–10:00 PM<br><br>
        <button class="btn btn-sm btn-whatsapp" onclick="openWhatsAppModal()">
          <i class="fa-brands fa-whatsapp"></i> Chat with Owner on WhatsApp
        </button>
      `;
    }
    // 15. DIET & NUTRITION
    else if (q.includes('diet') || q.includes('food') || q.includes('nutrition') || q.includes('protein') || q.includes('supplement') || q.includes('weight loss') || q.includes('gain')) {
      reply = `
        <strong>🥗 Nutrition & Transformation Strategy:</strong><br><br>
        1. <strong>Protein Intake:</strong> 1.6g – 2.2g of protein per kg bodyweight daily.<br>
        2. <strong>Energy Balance:</strong> Mild caloric deficit for fat loss, slight surplus for muscle gain.<br>
        3. <strong>Hydration:</strong> 3–4 liters of water daily for joint lubrication and muscle fullness.<br><br>
        Our coaching staff provides customized diet templates tailored to your vegetarian or non-vegetarian preferences!
      `;
    }
    // 16. GENERAL GREETINGS
    else if (q.includes('hi') || q.includes('hello') || q.includes('hey') || q.includes('namaste') || q.includes('good morning') || q.includes('good evening')) {
      reply = `
        Welcome to <strong>NEO GYM</strong>! I am your virtual fitness AI assistant.<br><br>
        How can I help you today? You can ask about our <strong>workout plans (Chest, Biceps, Shoulders, Back, Legs), gym timings, membership fees, equipment, or 1-day free trial</strong>!
      `;
    }
    // 17. FALLBACK BEYOND WEBSITE INFORMATION (EXACT WORDING REQUESTED)
    else {
      reply = `
        Thank you for asking! For detailed inquiries regarding our owner and coaching desk is reachable directly on WhatsApp at +91 8892152766.<br><br>
        <button class="btn btn-sm btn-whatsapp" onclick="openWhatsAppModal('Hi! I have an inquiry for the NEO GYM owner and coaching desk: ${userQuery.replace(/'/g, "\\'")}')">
          <i class="fa-brands fa-whatsapp"></i> Chat with Owner on WhatsApp
        </button>
      `;
    }

    addBotMessage(reply, 'incoming');
  }, 350);
}
