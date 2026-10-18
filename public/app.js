/**
 * NEO GYM — Premium Interactive Frontend Architecture
 * Features:
 * 1. Luxury Light/Dark Theme System (Default: Dark)
 * 2. Mobile Responsive Drawer & Sticky Header
 * 3. Verified Lead Registration with Backend Excel Persistence
 * 4. WhatsApp Direct Connect Modal (+91 8892152766)
 * 5. Intelligent NEO Gym Assistant Bot (Knowledge Base Engine)
 * 6. Sequential Continuous Workout Video Player
 * 7. Owner Workout Video Upload & Deletion (PIN Protected)
 * 8. Responsive Gallery Filters & Fullscreen Lightbox
 * 9. Luxury Animated Tab Favicon (Repetition Curl Motion)
 */

// Verified Gym Owner Contact Phone
const OWNER_PHONE = '918892152766';

// ============================================================
// 1. THEME SWITCHER (Default: Luxury Dark, Light Support)
// ============================================================
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

// ============================================================
// 2. STICKY NAVBAR & MOBILE NAVIGATION DRAWER
// ============================================================
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

// Navbar Scroll Effect & Apple Frosted Glass Scrollspy
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links .nav-item');

function updateActiveNav() {
  if (!navbar) return;
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  const scrollPos = window.scrollY + 140;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollPos >= top && scrollPos < top + height) {
      navItems.forEach(item => {
        if (item.getAttribute('href') === `#${id}`) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
window.addEventListener('DOMContentLoaded', updateActiveNav);
updateActiveNav();

// Mobile Hamburger Toggle
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

  // Close mobile nav when clicking any anchor link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });
  });
}

// Close mobile nav when clicking outside
document.addEventListener('click', (e) => {
  if (navLinks && navLinks.classList.contains('active')) {
    if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      navLinks.classList.remove('active');
      if (mobileMenuBtn) {
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    }
  }
});

// ============================================================
// 3. WHATSAPP CHAT MODAL
// ============================================================
const waModal = document.getElementById('waModal');
const waMessageText = document.getElementById('waMessageText');
const waCharCount = document.getElementById('waCharCount');

function openWhatsAppModal(presetMessage = '') {
  if (!waModal) return;
  waModal.style.display = 'flex';
  
  if (presetMessage) {
    waMessageText.value = presetMessage;
  } else if (!waMessageText.value.trim()) {
    waMessageText.value = 'Hello! I am interested in joining NEO GYM. Please share membership plans and schedule a free trial pass.';
  }

  handleWAMessageInput(waMessageText);
  setTimeout(() => waMessageText.focus(), 150);
}

function closeWhatsAppModal() {
  if (waModal) {
    waModal.style.display = 'none';
  }
}

if (waModal) {
  waModal.addEventListener('click', (e) => {
    if (e.target === waModal) {
      closeWhatsAppModal();
    }
  });
}

function handleWAMessageInput(textarea) {
  if (!textarea) return;
  let text = textarea.value;
  if (text.length > 1000) {
    textarea.value = text.substring(0, 1000);
    text = textarea.value;
  }
  if (waCharCount) {
    waCharCount.textContent = `${text.length} / 1000`;
  }
}

function setWAMessage(message) {
  if (!waMessageText) return;
  waMessageText.value = message;
  handleWAMessageInput(waMessageText);
  waMessageText.focus();
}

function sendWhatsAppMessage() {
  const message = waMessageText.value.trim();
  if (!message) {
    alert('Please enter a message before sending.');
    waMessageText.focus();
    return;
  }

  const encodedMsg = encodeURIComponent(message);
  const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  const targetUrl = isMobile
    ? `https://api.whatsapp.com/send?phone=${OWNER_PHONE}&text=${encodedMsg}`
    : `https://web.whatsapp.com/send?phone=${OWNER_PHONE}&text=${encodedMsg}`;

  window.open(targetUrl, '_blank', 'noopener,noreferrer');
  closeWhatsAppModal();
}

// Plan selection helper from cards
function selectPlan(planName) {
  const planSelect = document.getElementById('preferredPlan');
  const registerSection = document.getElementById('register');
  
  if (planSelect) {
    // Look for option containing or starting with planName
    let matched = false;
    for (let opt of planSelect.options) {
      if (opt.value.toLowerCase().includes(planName.toLowerCase()) || planName.toLowerCase().includes(opt.value.toLowerCase())) {
        planSelect.value = opt.value;
        matched = true;
        break;
      }
    }
    if (!matched) {
      planSelect.value = planName;
    }
  }
  
  if (registerSection) {
    registerSection.scrollIntoView({ behavior: 'smooth' });
    const nameInput = document.getElementById('fullName');
    if (nameInput) {
      setTimeout(() => nameInput.focus(), 600);
    }
  }
}

// ============================================================
// 4. USER REGISTRATION & BACKEND EXCEL SYNC
// ============================================================
async function handleRegistration(event) {
  event.preventDefault();

  const nameInput = document.getElementById('fullName');
  const phoneInput = document.getElementById('mobileNo');
  const emailInput = document.getElementById('emailAddr');
  const goalSelect = document.getElementById('fitnessGoal');
  const planSelect = document.getElementById('preferredPlan');
  
  const submitBtn = document.getElementById('registerSubmitBtn');
  const btnText = submitBtn.querySelector('.btn-text');
  const spinner = submitBtn.querySelector('.spinner');
  const statusDiv = document.getElementById('formStatus');

  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const email = emailInput.value.trim();
  const goal = goalSelect ? goalSelect.value : 'General Fitness';
  const plan = planSelect ? planSelect.value : '1 Month Standard';

  // Validation
  if (!name) {
    showFormStatus('Please enter your full name.', 'error');
    nameInput.focus();
    return;
  }

  const cleanPhone = phone.replace(/[^0-9]/g, '');
  if (cleanPhone.length < 10) {
    showFormStatus('Please enter a valid 10-digit mobile number.', 'error');
    phoneInput.focus();
    return;
  }

  // Loading state
  submitBtn.disabled = true;
  btnText.style.display = 'none';
  spinner.style.display = 'inline-block';
  statusDiv.style.display = 'none';

  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        phone: cleanPhone,
        email,
        goal,
        plan
      })
    });

    const result = await response.json();

    if (result.success) {
      showFormStatus(`
        <strong>🎉 Welcome to NEO GYM, ${name}!</strong><br>
        Your registration has been saved to our member records.<br>
        Our training desk will reach out to you at <strong>${cleanPhone}</strong> to schedule your free trial workout session.<br>
        <div style="margin-top:14px;">
          <button type="button" class="btn btn-sm btn-whatsapp" onclick="openWhatsAppModal('Hi! I just registered on the NEO Gym website. Name: ${encodeURIComponent(name)}, Mobile: ${cleanPhone}, Selected Plan: ${encodeURIComponent(plan)}')">
            <i class="fa-brands fa-whatsapp"></i> Confirm With Owner on WhatsApp
          </button>
        </div>
      `, 'success');

      // Clear input fields
      nameInput.value = '';
      phoneInput.value = '';
      emailInput.value = '';
    } else {
      showFormStatus(`Registration Error: ${result.message || 'Please check your inputs.'}`, 'error');
    }
  } catch (error) {
    console.error('Registration fetch error:', error);
    showFormStatus(`
      Unable to reach server. You can register directly via WhatsApp with the owner: 
      <a href="javascript:void(0)" onclick="openWhatsAppModal('Hi! I want to register at NEO Gym. Name: ${encodeURIComponent(name)}, Mobile: ${cleanPhone}')" style="color:var(--gold-primary); text-decoration:underline; font-weight:bold; margin-left:4px;">
        Click here to message on WhatsApp
      </a>
    `, 'error');
  } finally {
    submitBtn.disabled = false;
    btnText.style.display = 'inline-block';
    spinner.style.display = 'none';
  }
}

function showFormStatus(htmlMessage, type = 'success') {
  const statusDiv = document.getElementById('formStatus');
  if (!statusDiv) return;
  statusDiv.className = `form-status ${type}`;
  statusDiv.innerHTML = htmlMessage;
  statusDiv.style.display = 'block';
  statusDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ============================================================
// 5. INTELLIGENT GYM ASSISTANT BOT (NEO FITNESS BOT)
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
        <a href="workouts.html" class="btn btn-sm btn-outline" style="margin-top:10px; width:100%;">
          <i class="fa-solid fa-dumbbell"></i> View Complete 5-Day Workout Plans
        </a>
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
        <a href="workouts.html" class="btn btn-sm btn-outline" style="margin-top:10px; width:100%;">
          <i class="fa-solid fa-bolt"></i> View Dedicated Biceps Workout
        </a>
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
        <a href="workouts.html" class="btn btn-sm btn-outline" style="margin-top:10px; width:100%;">
          <i class="fa-solid fa-dumbbell"></i> Open Shoulders Plan
        </a>
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
        <a href="workouts.html" class="btn btn-sm btn-outline" style="margin-top:10px; width:100%;">
          <i class="fa-solid fa-dumbbell"></i> Open Back & Lats Plan
        </a>
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
        <a href="workouts.html" class="btn btn-sm btn-outline" style="margin-top:10px; width:100%;">
          <i class="fa-solid fa-dumbbell"></i> Open Abs & Core Plan
        </a>
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
        <a href="workouts.html" class="btn btn-sm btn-outline" style="margin-top:10px; width:100%;">
          <i class="fa-solid fa-dumbbell"></i> Open Legs & Glutes Plan
        </a>
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
        You can explore every day's sets, reps, and cues online or download the official PDF guide:<br>
        <a href="workouts.html" class="btn btn-sm btn-outline" style="margin-top:10px; width:100%;">
          <i class="fa-solid fa-dumbbell"></i> View Interactive Workout Plans
        </a>
        <a href="assets/NEO_GYM_Workout_Plans.pdf" download class="btn btn-sm btn-glass" style="margin-top:6px; width:100%;">
          <i class="fa-solid fa-file-pdf"></i> Download Official PDF
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
    // 15. BMI CALCULATOR & BODY COMPOSITION
    else if (q.includes('bmi') || q.includes('body mass') || q.includes('weight check') || q.includes('composition') || q.includes('meter') || q.includes('gauge') || q.includes('ideal weight')) {
      reply = `
        <strong>⚡ NEO Athletic BMI & Speedometer Gauge:</strong><br><br>
        Calculate your Body Mass Index and healthy target weight instantly with our live interactive meter gauge!<br><br>
        • <strong>Underweight:</strong> &lt; 18.5 (Mass building & calorie surplus recommended)<br>
        • <strong>Normal:</strong> 18.5 – 24.9 (Optimal athletic symmetry & progressive overload)<br>
        • <strong>Overweight:</strong> 25.0 – 29.9 (Metabolic conditioning & hypertrophy recommended)<br>
        • <strong>Obesity:</strong> 30.0+ (Structured cardio & trainer-guided calorie deficit)<br><br>
        <a href="index.html#bmiCalculatorWidget" class="btn btn-sm btn-primary" style="margin-top:6px; width:100%;">
          <i class="fa-solid fa-gauge-high"></i> Try Live Athletic BMI Calculator
        </a>
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

// ============================================================
// 6. WORKOUT VIDEOS & SEQUENTIAL PLAYLIST SYSTEM
// ============================================================
let gymVideos = [];
let currentVideoIdx = 0;

const gymVideoPlayer = document.getElementById('gymVideoPlayer');
const videoScreenCard = document.querySelector('.video-screen-card');
const playPauseBtn = document.getElementById('playPauseBtn');
const centerPlayBtn = document.getElementById('centerPlayBtn');
const videoProgressBar = document.getElementById('videoProgressBar');
const videoTimeDisplay = document.getElementById('videoTimeDisplay');
const currentVideoTitle = document.getElementById('currentVideoTitle');
const currentVideoDesc = document.getElementById('currentVideoDesc');
const videoCategoryBadge = document.getElementById('videoCategoryBadge');
const sequenceBadge = document.getElementById('sequenceBadge');
const currentVideoDate = document.getElementById('currentVideoDate');
const playlistItemsList = document.getElementById('playlistItemsList');
const playlistCount = document.getElementById('playlistCount');
const volumeMuteBtn = document.getElementById('volumeMuteBtn');
const volumeSlider = document.getElementById('volumeSlider');

// Fetch Playlist on page load
async function fetchGymVideos() {
  try {
    const res = await fetch('/api/videos');
    const data = await res.json();
    if (data.success && data.videos && data.videos.length > 0) {
      gymVideos = data.videos;
      renderPlaylist();
      loadVideo(0, false);
    }
  } catch (err) {
    console.error('Failed to load videos from server:', err);
  }
}

// Render playlist drawer
function renderPlaylist() {
  if (!playlistItemsList) return;
  playlistItemsList.innerHTML = '';
  if (playlistCount) {
    playlistCount.textContent = `${gymVideos.length} Video${gymVideos.length > 1 ? 's' : ''}`;
  }

  gymVideos.forEach((vid, index) => {
    const item = document.createElement('div');
    item.className = `playlist-item ${index === currentVideoIdx ? 'active' : ''}`;
    item.onclick = (e) => {
      if (e.target.closest('.playlist-delete-btn')) return;
      currentVideoIdx = index;
      loadVideo(currentVideoIdx, true);
    };

    const isUploaded = !vid.isDefault;

    item.innerHTML = `
      <div class="playlist-thumb-wrap">
        <img src="${vid.thumbnail || 'assets/gym_interior_1.jpg'}" alt="${vid.title}" class="playlist-thumb" loading="lazy">
        <div class="playlist-play-icon">
          <i class="fa-solid ${index === currentVideoIdx ? 'fa-chart-simple' : 'fa-play'}"></i>
        </div>
      </div>
      <div class="playlist-info">
        <h5>${vid.title}</h5>
        <span>${vid.category || 'Workout'} • ${vid.uploadedAt || 'Official'}</span>
      </div>
      ${isUploaded ? `
        <button class="playlist-delete-btn" onclick="deleteVideo('${vid.id}')" title="Delete Uploaded Video" aria-label="Delete video">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      ` : ''}
    `;

    playlistItemsList.appendChild(item);
  });
}

// Load Video by Index
function loadVideo(index, autoPlay = false) {
  if (gymVideoPlayer) gymVideoPlayer.muted = true;
  if (!gymVideos || gymVideos.length === 0) return;
  if (!gymVideoPlayer) return;

  currentVideoIdx = (index + gymVideos.length) % gymVideos.length;
  const vid = gymVideos[currentVideoIdx];

  gymVideoPlayer.src = vid.src;
  gymVideoPlayer.load();

  if (currentVideoTitle) currentVideoTitle.textContent = vid.title;
  if (currentVideoDesc) currentVideoDesc.textContent = vid.description || '';
  if (videoCategoryBadge) videoCategoryBadge.textContent = vid.category || 'Workout Session';
  if (sequenceBadge) sequenceBadge.innerHTML = `<i class="fa-solid fa-repeat"></i> Auto-Sequence: Video ${currentVideoIdx + 1} of ${gymVideos.length}`;
  if (currentVideoDate) currentVideoDate.textContent = vid.uploadedAt || 'Official NEO Workout';

  // Update playlist active item
  if (playlistItemsList) {
    const items = playlistItemsList.querySelectorAll('.playlist-item');
    items.forEach((el, idx) => {
      if (idx === currentVideoIdx) {
        el.classList.add('active');
        const icon = el.querySelector('.playlist-play-icon i');
        if (icon) icon.className = 'fa-solid fa-chart-simple';
      } else {
        el.classList.remove('active');
        const icon = el.querySelector('.playlist-play-icon i');
        if (icon) icon.className = 'fa-solid fa-play';
      }
    });
  }

  if (autoPlay) {
    gymVideoPlayer.play().then(() => {
      updatePlayState(true);
    }).catch(err => {
      console.warn('AutoPlay restricted by browser policies:', err);
      updatePlayState(false);
    });
  } else {
    updatePlayState(false);
  }
}

// Play / Pause Toggle
function togglePlayPause() {
  if (!gymVideoPlayer) return;
  if (gymVideoPlayer.paused || gymVideoPlayer.ended) {
    gymVideoPlayer.play();
    updatePlayState(true);
  } else {
    gymVideoPlayer.pause();
    updatePlayState(false);
  }
}

function updatePlayState(isPlaying) {
  if (playPauseBtn) {
    playPauseBtn.innerHTML = isPlaying ? '<i class="fa-solid fa-pause"></i>' : '<i class="fa-solid fa-play"></i>';
    playPauseBtn.title = isPlaying ? 'Pause Video' : 'Play Video';
    playPauseBtn.setAttribute('aria-label', isPlaying ? 'Pause Video' : 'Play Video');
  }
  if (videoScreenCard) {
    if (isPlaying) {
      videoScreenCard.classList.add('is-playing');
    } else {
      videoScreenCard.classList.remove('is-playing');
    }
  }
}

// Continuous Sequential Playback: Auto-advance to next video when current ends
if (gymVideoPlayer) {
  gymVideoPlayer.addEventListener('ended', () => {
    console.log('[AUTO-SEQUENCE] Workout video concluded. Advancing to next tutorial...');
    nextVideo(true);
  });

  gymVideoPlayer.addEventListener('play', () => updatePlayState(true));
  gymVideoPlayer.addEventListener('pause', () => updatePlayState(false));

  gymVideoPlayer.addEventListener('timeupdate', () => {
    if (!gymVideoPlayer.duration) return;
    const progress = (gymVideoPlayer.currentTime / gymVideoPlayer.duration) * 100;
    if (videoProgressBar) {
      videoProgressBar.style.width = `${progress}%`;
    }
    if (videoTimeDisplay) {
      videoTimeDisplay.textContent = `${formatTime(gymVideoPlayer.currentTime)} / ${formatTime(gymVideoPlayer.duration)}`;
    }
  });

  gymVideoPlayer.addEventListener('click', togglePlayPause);
}

// Previous & Next Video
function prevVideo(autoPlay = true) {
  loadVideo(currentVideoIdx - 1, autoPlay);
}

function nextVideo(autoPlay = true) {
  loadVideo(currentVideoIdx + 1, autoPlay);
}

// Seek video timeline
function seekVideo(event) {
  const container = document.getElementById('videoProgressContainer');
  if (!container || !gymVideoPlayer || !gymVideoPlayer.duration) return;
  const rect = container.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const percent = Math.max(0, Math.min(1, clickX / rect.width));
  gymVideoPlayer.currentTime = percent * gymVideoPlayer.duration;
}

// Volume & Mute
function changeVolume(val) {
  if (!gymVideoPlayer) return;
  gymVideoPlayer.volume = parseFloat(val);
  gymVideoPlayer.muted = (parseFloat(val) === 0);
  updateVolumeIcon();
}

function toggleMute() {
  if (!gymVideoPlayer) return;
  gymVideoPlayer.muted = !gymVideoPlayer.muted;
  if (!gymVideoPlayer.muted && gymVideoPlayer.volume === 0) {
    gymVideoPlayer.volume = 0.5;
    if (volumeSlider) volumeSlider.value = 0.5;
  }
  updateVolumeIcon();
}

function updateVolumeIcon() {
  if (!volumeMuteBtn || !gymVideoPlayer) return;
  const icon = volumeMuteBtn.querySelector('i');
  if (!icon) return;
  if (gymVideoPlayer.muted || gymVideoPlayer.volume === 0) {
    icon.className = 'fa-solid fa-volume-xmark';
  } else if (gymVideoPlayer.volume < 0.5) {
    icon.className = 'fa-solid fa-volume-low';
  } else {
    icon.className = 'fa-solid fa-volume-high';
  }
}

// Fullscreen Toggle
function toggleFullscreen() {
  if (!gymVideoPlayer) return;
  if (!document.fullscreenElement) {
    if (gymVideoPlayer.requestFullscreen) {
      gymVideoPlayer.requestFullscreen();
    } else if (gymVideoPlayer.webkitRequestFullscreen) {
      gymVideoPlayer.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Keyboard shortcuts for video player (when not in form input)
document.addEventListener('keydown', (e) => {
  const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
  if (['input', 'textarea', 'select'].includes(activeTag)) return;

  if (e.code === 'Space') {
    // Only intercept space if video is visible in viewport or focused
    const rect = gymVideoPlayer ? gymVideoPlayer.getBoundingClientRect() : null;
    if (rect && rect.top >= -200 && rect.bottom <= window.innerHeight + 200) {
      e.preventDefault();
      togglePlayPause();
    }
  } else if (e.code === 'KeyM') {
    toggleMute();
  } else if (e.code === 'KeyF') {
    toggleFullscreen();
  }
});

// ============================================================
// 7. OWNER VIDEO UPLOAD MODAL & API
// ============================================================
const uploadModal = document.getElementById('uploadModal');
const ownerUploadForm = document.getElementById('ownerUploadForm');
const uploadStatusBanner = document.getElementById('uploadStatusBanner');
const uploadSubmitBtn = document.getElementById('uploadSubmitBtn');

function openUploadModal() {
  if (!uploadModal) return;
  uploadModal.style.display = 'flex';
  if (uploadStatusBanner) uploadStatusBanner.style.display = 'none';
  const pinInput = document.getElementById('ownerPinInput');
  if (pinInput) {
    pinInput.value = '';
    setTimeout(() => pinInput.focus(), 200);
  }
}

function closeUploadModal() {
  if (!uploadModal) return;
  uploadModal.style.display = 'none';
  if (ownerUploadForm) ownerUploadForm.reset();
  if (uploadStatusBanner) uploadStatusBanner.style.display = 'none';
}

if (uploadModal) {
  uploadModal.addEventListener('click', (e) => {
    if (e.target === uploadModal) {
      closeUploadModal();
    }
  });
}

async function handleVideoUpload(event) {
  event.preventDefault();

  const pin = document.getElementById('ownerPinInput').value.trim();
  const title = document.getElementById('videoTitleInput').value.trim();
  const category = document.getElementById('videoCategorySelect').value;
  const description = document.getElementById('videoDescInput').value.trim();
  const fileInput = document.getElementById('videoFileInput');

  if (!fileInput.files || fileInput.files.length === 0) {
    showUploadStatus('Please choose a video file (.mp4, .webm, .mov) to upload.', 'error');
    return;
  }

  const file = fileInput.files[0];

  const formData = new FormData();
  formData.append('ownerPin', pin);
  formData.append('title', title);
  formData.append('category', category);
  formData.append('description', description);
  formData.append('videoFile', file);

  const btnText = uploadSubmitBtn.querySelector('.btn-text');
  const spinner = uploadSubmitBtn.querySelector('.spinner');
  uploadSubmitBtn.disabled = true;
  btnText.style.display = 'none';
  spinner.style.display = 'inline-block';
  showUploadStatus('Uploading video to NEO Gym server... Please wait.', 'success');

  try {
    const response = await fetch('/api/upload-video', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();

    if (result.success) {
      showUploadStatus(`
        <strong>✅ Video Uploaded Successfully!</strong><br>
        "${title}" has been placed at the top of the workout playlist.
      `, 'success');

      gymVideos = result.videos || gymVideos;
      renderPlaylist();
      currentVideoIdx = 0;
      loadVideo(0, true);

      setTimeout(() => {
        closeUploadModal();
      }, 1500);
    } else {
      showUploadStatus(result.message || 'Upload failed. Invalid Owner PIN.', 'error');
    }
  } catch (error) {
    console.error('Video upload error:', error);
    showUploadStatus('Server error during video upload. Please check network connection.', 'error');
  } finally {
    uploadSubmitBtn.disabled = false;
    btnText.style.display = 'inline-block';
    spinner.style.display = 'none';
  }
}

function showUploadStatus(msg, type = 'error') {
  if (!uploadStatusBanner) return;
  uploadStatusBanner.className = `form-status ${type}`;
  uploadStatusBanner.innerHTML = msg;
  uploadStatusBanner.style.display = 'block';
}

// Delete video function for owner
async function deleteVideo(videoId) {
  const pin = prompt('Owner Action: Enter Owner Security PIN to delete this video:');
  if (!pin) return;

  try {
    const res = await fetch(`/api/videos/${videoId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ownerPin: pin })
    });
    const data = await res.json();
    if (data.success) {
      alert('Video removed from sequence.');
      gymVideos = data.videos;
      renderPlaylist();
      loadVideo(0, true);
    } else {
      alert(data.message || 'Failed to delete video. Invalid PIN.');
    }
  } catch (err) {
    console.error('Delete error:', err);
    alert('Error deleting video.');
  }
}

fetchGymVideos();

// ============================================================
// 8. GALLERY FILTERS & LIGHTBOX
// ============================================================
function filterGallery(category, btnElement) {
  const buttons = document.querySelectorAll('.gallery-filter-btn');
  buttons.forEach(b => b.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');

  const items = document.querySelectorAll('.gallery-item');
  items.forEach(item => {
    const itemCat = item.getAttribute('data-category');
    if (category === 'all' || itemCat === category) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

const lightboxModal = document.getElementById('lightboxModal');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');

function openLightbox(src, caption) {
  if (!lightboxModal) return;
  lightboxImg.src = src;
  lightboxCaption.textContent = caption || '';
  lightboxModal.style.display = 'flex';
}

function closeLightbox(e) {
  if (e && e.target !== lightboxModal && !e.target.classList.contains('lightbox-close')) return;
  if (lightboxModal) {
    lightboxModal.style.display = 'none';
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
    closeWhatsAppModal();
    closeUploadModal();
  }
});

// ============================================================
// 9. ANIMATED BROWSER TAB FAVICON (LUXURY DUMBBELL REPS)
// ============================================================
function initAnimatedFavicon() {
  try {
    document.querySelectorAll("link[rel*='icon']").forEach(el => {
      if (el.id !== 'dynamicFavicon') {
        el.remove();
      }
    });

    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;

    function renderFrame() {
      frame = (frame + 1) % 40;
      const progress = frame / 40;
      
      const yLift = -Math.sin(progress * Math.PI * 2) * 3.5;
      const angleDeg = Math.sin(progress * Math.PI * 2) * 26;

      ctx.clearRect(0, 0, 32, 32);

      // Rounded luxury gold & obsidian badge
      const r = 8;
      ctx.beginPath();
      ctx.moveTo(r, 0);
      ctx.lineTo(32 - r, 0);
      ctx.quadraticCurveTo(32, 0, 32, r);
      ctx.lineTo(32, 32 - r);
      ctx.quadraticCurveTo(32, 32, 32 - r, 32);
      ctx.lineTo(r, 32);
      ctx.quadraticCurveTo(0, 32, 0, 32 - r);
      ctx.lineTo(0, r);
      ctx.quadraticCurveTo(0, 0, r, 0);
      ctx.closePath();

      const grad = ctx.createLinearGradient(0, 0, 32, 32);
      grad.addColorStop(0, '#d4af37');
      grad.addColorStop(1, '#b38717');
      ctx.fillStyle = grad;
      ctx.fill();

      // Dumbbell in center with tilt & curl motion
      ctx.save();
      ctx.translate(16, 16 + yLift);
      ctx.rotate((angleDeg * Math.PI) / 180);

      // Dumbbell Bar (Obsidian core)
      ctx.fillStyle = '#07080a';
      ctx.fillRect(-8, -2, 16, 4);

      // Left weights
      ctx.fillRect(-10, -5, 2.5, 10);
      ctx.fillRect(-13.5, -7, 2.5, 14);

      // Right weights
      ctx.fillRect(7.5, -5, 2.5, 10);
      ctx.fillRect(11, -7, 2.5, 14);

      ctx.restore();

      const dataUri = canvas.toDataURL('image/png');
      const oldLink = document.getElementById('dynamicFavicon');
      const newLink = document.createElement('link');
      newLink.id = 'dynamicFavicon';
      newLink.rel = 'icon';
      newLink.type = 'image/png';
      newLink.href = dataUri;

      if (oldLink && oldLink.parentNode) {
        oldLink.parentNode.replaceChild(newLink, oldLink);
      } else {
        document.head.appendChild(newLink);
      }
    }

    setInterval(renderFrame, 120);
    renderFrame();
  } catch (err) {
    console.warn('Animated favicon not supported on this browser:', err);
  }
}

if (document.readyState === 'complete') {
  initAnimatedFavicon();
} else {
  window.addEventListener('load', initAnimatedFavicon);
}

// ============================================================
// 10. REAL-TIME GYM BATCH STATUS TRACKER
// ============================================================
function updateLiveGymStatus() {
  const statusElem = document.getElementById('liveStatusText');
  if (!statusElem) return;

  const now = new Date();
  const day = now.getDay(); // 0 is Sunday
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTimeVal = hours * 60 + minutes;

  const morningStart = 5 * 60 + 30; // 05:30
  const morningEnd = 10 * 60 + 30;  // 10:30
  const eveningStart = 16 * 60 + 30; // 16:30
  const eveningEnd = 22 * 60;        // 22:00
  const sunStart = 6 * 60;           // 06:00
  const sunEnd = 12 * 60;            // 12:00

  let statusText = 'FACILITY ACTIVE • DAILY TRAINING BATCHES OPEN';

  if (day === 0) {
    if (currentTimeVal >= sunStart && currentTimeVal < sunEnd) {
      statusText = 'FACILITY OPEN • SUNDAY SESSION ACTIVE';
    } else {
      statusText = 'DOORS REOPEN MONDAY AT 05:30 AM';
    }
  } else {
    if (currentTimeVal >= morningStart && currentTimeVal < morningEnd) {
      statusText = 'FACILITY OPEN • MORNING BATCH ACTIVE';
    } else if (currentTimeVal >= eveningStart && currentTimeVal < eveningEnd) {
      statusText = 'FACILITY OPEN • EVENING BATCH ACTIVE';
    } else if (currentTimeVal < morningStart) {
      statusText = 'MORNING BATCH OPENS AT 05:30 AM';
    } else if (currentTimeVal >= morningEnd && currentTimeVal < eveningStart) {
      statusText = 'AFTERNOON BREAK • REOPENS AT 04:30 PM';
    } else {
      statusText = 'EVENING CONCLUDED • REOPENS AT 05:30 AM';
    }
  }

  statusElem.textContent = statusText;
}

updateLiveGymStatus();
setInterval(updateLiveGymStatus, 60000);

console.log('NEO GYM Web Platform Initialized. Built by Discipline. Defined by Strength.');



// ============================================================
// 11. ATHLETIC BMI CALCULATOR & SPEEDOMETER GAUGE
// ============================================================
let currentBmiGender = 'male';
window._suggestedBmiGoal = 'Muscle Building & Strength';

function selectBmiGender(gender) {
  currentBmiGender = gender;
  const maleBtn = document.getElementById('bmiMaleBtn');
  const femaleBtn = document.getElementById('bmiFemaleBtn');
  if (maleBtn && femaleBtn) {
    if (gender === 'male') {
      maleBtn.classList.add('active');
      maleBtn.setAttribute('aria-checked', 'true');
      femaleBtn.classList.remove('active');
      femaleBtn.setAttribute('aria-checked', 'false');
    } else {
      femaleBtn.classList.add('active');
      femaleBtn.setAttribute('aria-checked', 'true');
      maleBtn.classList.remove('active');
      maleBtn.setAttribute('aria-checked', 'false');
    }
  }
  calculateBMI();
}

function getBmiGaugeAngle(bmi) {
  if (bmi <= 16) {
    return Math.max(-90, -90 + (bmi - 14) * 9);
  } else if (bmi <= 18.5) {
    return -72 + ((bmi - 16) / 2.5) * 27;
  } else if (bmi <= 25) {
    return -45 + ((bmi - 18.5) / 6.5) * 45;
  } else if (bmi <= 30) {
    return 0 + ((bmi - 25) / 5) * 38;
  } else if (bmi <= 35) {
    return 38 + ((bmi - 30) / 5) * 27;
  } else {
    return Math.min(90, 65 + ((bmi - 35) / 5) * 25);
  }
}

function calculateBMI() {
  const heightInput = document.getElementById('bmiHeight');
  const weightInput = document.getElementById('bmiWeight');

  const needle = document.getElementById('bmiNeedleGroup');
  const numberVal = document.getElementById('bmiNumberVal');
  const statusPill = document.getElementById('bmiStatusPill');
  const guidance = document.getElementById('bmiGuidanceText');

  if (!heightInput || !weightInput) return;

  const heightVal = heightInput.value.trim();
  const weightVal = weightInput.value.trim();

  // If blank, maintain ready resting state
  if (!heightVal || !weightVal) {
    if (numberVal) numberVal.textContent = '--';
    if (statusPill) {
      statusPill.textContent = 'Ready';
      statusPill.className = 'bmi-status-pill empty';
    }
    if (guidance) {
      guidance.innerHTML = 'Enter your height &amp; weight to calculate athletic BMI.';
    }
    if (needle) {
      needle.style.transform = 'rotate(-90deg)';
    }
    window._suggestedBmiGoal = 'Muscle Building & Strength';
    return;
  }

  const heightCm = parseFloat(heightVal);
  const weightKg = parseFloat(weightVal);

  if (isNaN(heightCm) || heightCm <= 0 || isNaN(weightKg) || weightKg <= 0) {
    if (numberVal) numberVal.textContent = '--';
    if (statusPill) {
      statusPill.textContent = 'Invalid';
      statusPill.className = 'bmi-status-pill empty';
    }
    if (guidance) {
      guidance.innerHTML = 'Please enter valid positive numbers for height &amp; weight.';
    }
    return;
  }

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  const bmiFormatted = bmi.toFixed(1);

  // Healthy target weight range (BMI 18.5 - 24.9)
  const minHealthyWeight = (18.5 * heightM * heightM).toFixed(1);
  const maxHealthyWeight = (24.9 * heightM * heightM).toFixed(1);

  let category = 'Normal';
  let pillClass = 'normal';
  let guidanceHtml = '';
  let suggestedGoal = 'Muscle Building & Strength';

  if (bmi < 18.5) {
    category = 'Underweight';
    pillClass = 'underweight';
    guidanceHtml = 'Below standard mass. Ideal weight for ' + Math.round(heightCm) + ' cm: <strong>' + minHealthyWeight + ' – ' + maxHealthyWeight + ' kg</strong>';
    suggestedGoal = 'Muscle Building & Strength';
  } else if (bmi < 25.0) {
    category = 'Normal';
    pillClass = 'normal';
    guidanceHtml = 'Optimal athletic range. Ideal weight for ' + Math.round(heightCm) + ' cm: <strong>' + minHealthyWeight + ' – ' + maxHealthyWeight + ' kg</strong>';
    suggestedGoal = 'Muscle Building & Strength';
  } else if (bmi < 30.0) {
    category = 'Overweight';
    pillClass = 'overweight';
    guidanceHtml = 'Above target range. Ideal weight for ' + Math.round(heightCm) + ' cm: <strong>' + minHealthyWeight + ' – ' + maxHealthyWeight + ' kg</strong>';
    suggestedGoal = 'Weight Loss & Fat Burn';
  } else {
    category = 'Obesity';
    pillClass = 'obese';
    guidanceHtml = 'High risk zone. Target weight for ' + Math.round(heightCm) + ' cm: <strong>' + minHealthyWeight + ' – ' + maxHealthyWeight + ' kg</strong>';
    suggestedGoal = 'Weight Loss & Fat Burn';
  }

  if (numberVal) numberVal.textContent = bmiFormatted;

  if (statusPill) {
    statusPill.textContent = category;
    statusPill.className = 'bmi-status-pill ' + pillClass;
  }

  if (guidance) {
    guidance.innerHTML = guidanceHtml;
  }

  // Update needle angle with smooth physical rotation
  const angle = getBmiGaugeAngle(bmi);
  if (needle) {
    needle.style.transform = 'rotate(' + angle.toFixed(1) + 'deg)';
  }

  window._suggestedBmiGoal = suggestedGoal;
}

function calculateBMIExplicit() {
  calculateBMI();
  const numberVal = document.getElementById('bmiNumberVal');
  if (numberVal) {
    numberVal.style.transform = 'scale(1.2)';
    setTimeout(() => {
      numberVal.style.transform = 'scale(1)';
    }, 250);
  }
}

let _bmiDebounceTimer = null;
function liveUpdateBMI() {
  clearTimeout(_bmiDebounceTimer);
  _bmiDebounceTimer = setTimeout(calculateBMI, 80);
}

function clearBMI() {
  const heightInput = document.getElementById('bmiHeight');
  const weightInput = document.getElementById('bmiWeight');
  const ageInput = document.getElementById('bmiAge');

  if (heightInput) heightInput.value = '';
  if (weightInput) weightInput.value = '';
  if (ageInput) ageInput.value = '';

  selectBmiGender('male');
  calculateBMI();
}

function syncBmiToRegistration() {
  const goalSelect = document.getElementById('fitnessGoal');
  if (goalSelect && window._suggestedBmiGoal) {
    goalSelect.value = window._suggestedBmiGoal;
    goalSelect.scrollIntoView({ behavior: 'smooth', block: 'center' });
    goalSelect.focus();
    goalSelect.style.borderColor = 'var(--gold-primary)';
    goalSelect.style.boxShadow = '0 0 0 3px var(--gold-muted)';
    setTimeout(() => {
      goalSelect.style.borderColor = '';
      goalSelect.style.boxShadow = '';
    }, 1800);
  }
}

// Initialize BMI calculator on load
document.addEventListener('DOMContentLoaded', () => {
  calculateBMI();
});
setTimeout(calculateBMI, 400);
