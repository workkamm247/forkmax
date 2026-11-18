/**
 * SHREE RANG KRUPA ENTERPRISE — INDUSTRIAL EQUIPMENT SOLUTIONS
 * Interactive Engine & UI Controller // INDUSTRIAL EDITION
 */

// 1. Initialize Lucide Icons
function initIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// 2. Sticky Header Scroll Effect & Scrollspy
const header = document.getElementById('header');
const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
const sections = document.querySelectorAll('section[id]');

function handleScroll() {
  const scrollY = window.pageYOffset || document.documentElement.scrollTop;

  // Add scrolled class to header
  if (header) {
    if (scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  // Scrollspy: update active nav item
  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 120;
    const sectionId = current.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', handleScroll, { passive: true });

// 3. Mobile Navigation Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileDrawer = document.getElementById('mobileDrawer');

if (mobileMenuBtn && mobileDrawer) {
  function closeMobileDrawer() {
    mobileMenuBtn.classList.remove('open');
    mobileDrawer.classList.remove('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileDrawer.setAttribute('aria-hidden', 'true');
  }

  mobileMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = mobileMenuBtn.classList.toggle('open');
    mobileDrawer.classList.toggle('active', isOpen);
    mobileMenuBtn.setAttribute('aria-expanded', isOpen.toString());
    mobileDrawer.setAttribute('aria-hidden', (!isOpen).toString());
  });

  // Close mobile drawer when clicking any link inside
  const mobileLinks = mobileDrawer.querySelectorAll('a');
  mobileLinks.forEach((link) => {
    link.addEventListener('click', closeMobileDrawer);
  });

  // Close mobile drawer when clicking outside
  document.addEventListener('click', (e) => {
    if (mobileDrawer.classList.contains('active')) {
      if (!mobileDrawer.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        closeMobileDrawer();
      }
    }
  });

  // Close mobile drawer on Escape key (accessibility)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer.classList.contains('active')) {
      closeMobileDrawer();
      mobileMenuBtn.focus();
    }
  });
}

// 4. Reference 3 (Darnit2) Inspired Hero Machinery Showcase Switcher
const redFleetShowcase = [
  {
    counter: '01 / 04',
    capTag: 'FROM 7.0 TON CAPACITY',
    title: 'SHREE RANG KRUPA FX-7000R TELE-BOOM',
    sub: 'Heavy Rough-Terrain Telescopic Boom Forklift',
    cap: '7,000 KG',
    height: '7,500 MM',
    engine: 'Heavy Turbo Diesel',
    mast: 'Telescopic Extension',
    image: 'assets/images/fleet-model-telehandler.jpg'
  },
  {
    counter: '02 / 04',
    capTag: 'FROM 5.0 TON CAPACITY',
    title: 'SHREE RANG KRUPA FX-5000R PRO',
    sub: 'Heavy-Duty Industrial Diesel Workhorse',
    cap: '5,000 KG',
    height: '4,500 MM',
    engine: 'Turbocharged Diesel',
    mast: 'Triplex FFL',
    image: 'assets/images/shree-rang-krupa-hero-cinematic.jpg'
  },
  {
    counter: '03 / 04',
    capTag: 'FROM 3.5 TON CAPACITY',
    title: 'SHREE RANG KRUPA FX-3500R REACH',
    sub: 'High-Maneuverability Compact Reach Forklift',
    cap: '3,500 KG',
    height: '4,800 MM',
    engine: 'Direct Drive Powertrain',
    mast: 'Wide-View Triplex',
    image: 'assets/images/fleet-model-compact.jpg'
  },
  {
    counter: '04 / 04',
    capTag: 'FROM 16.0 TON CAPACITY',
    title: 'SHREE RANG KRUPA FX-16000R MULTI-TITAN',
    sub: 'Multi-Directional Side-Loader & Heavy Long-Load Mast',
    cap: '16,000 KG',
    height: '6,500 MM',
    engine: 'High-Displacement Commercial',
    mast: 'Failsafe Guided Mast',
    image: 'assets/images/fleet-model-sideloader.jpg'
  }
];

let activeFleetIndex = 1; // Default to FX-5000R (index 1)

function updateMachineryStage(index) {
  const model = redFleetShowcase[index];
  if (!model) return;

  const counterEl = document.getElementById('stageModelCounter');
  const capTagEl = document.getElementById('activeCapacityTag');
  const titleEl = document.getElementById('activeMachineTitle');
  const subEl = document.getElementById('activeMachineSub');
  const specCap = document.getElementById('specCap');
  const specHeight = document.getElementById('specHeight');
  const specEngine = document.getElementById('specEngine');
  const specMast = document.getElementById('specMast');
  const machineImg = document.getElementById('activeMachineImage');
  const subjectWrap = document.getElementById('machinerySubject');

  if (counterEl) counterEl.textContent = model.counter;
  if (capTagEl) capTagEl.textContent = model.capTag;
  if (titleEl) titleEl.textContent = model.title;
  if (subEl) subEl.textContent = model.sub;
  if (specCap) specCap.textContent = model.cap;
  if (specHeight) specHeight.textContent = model.height;
  if (specEngine) specEngine.textContent = model.engine;
  if (specMast) specMast.textContent = model.mast;

  if (machineImg && subjectWrap) {
    subjectWrap.style.opacity = '0.4';
    subjectWrap.style.transform = 'scale(0.97)';
    setTimeout(() => {
      machineImg.src = model.image;
      machineImg.alt = `${model.title} on Industrial Stage`;
      subjectWrap.style.opacity = '1';
      subjectWrap.style.transform = 'scale(1)';
    }, 180);
  }
}

const stagePrevBtn = document.getElementById('stagePrevBtn');
const stageNextBtn = document.getElementById('stageNextBtn');

if (stagePrevBtn && stageNextBtn) {
  stagePrevBtn.addEventListener('click', () => {
    activeFleetIndex = (activeFleetIndex - 1 + redFleetShowcase.length) % redFleetShowcase.length;
    updateMachineryStage(activeFleetIndex);
  });

  stageNextBtn.addEventListener('click', () => {
    activeFleetIndex = (activeFleetIndex + 1) % redFleetShowcase.length;
    updateMachineryStage(activeFleetIndex);
  });
}

// 5. Interactive Hotspot Inspection Pins (Click / Keyboard accessibility)
const hotspotPins = document.querySelectorAll('.hotspot-pin');
hotspotPins.forEach((pin) => {
  pin.addEventListener('click', (e) => {
    e.stopPropagation();
    // Toggle active state for mobile touch
    const popover = pin.querySelector('.hotspot-popover');
    if (popover) {
      const isVisible = window.getComputedStyle(popover).visibility === 'visible';
      popover.style.opacity = isVisible ? '0' : '1';
      popover.style.visibility = isVisible ? 'hidden' : 'visible';
      popover.style.transform = isVisible ? 'translateX(-50%) translateY(10px)' : 'translateX(-50%) translateY(0)';
    }
  });
});

// Close open hotspot tooltips when clicking anywhere else
document.addEventListener('click', () => {
  document.querySelectorAll('.hotspot-popover').forEach((pop) => {
    pop.style.opacity = '';
    pop.style.visibility = '';
    pop.style.transform = '';
  });
});

// 6. Equipment Section Tab Switcher
const eqTabBtns = document.querySelectorAll('.eq-tab-btn');
const eqPanes = document.querySelectorAll('.eq-pane');

eqTabBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const targetTabId = btn.getAttribute('data-tab');

    // Update active tab button
    eqTabBtns.forEach((b) => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');

    // Update visible pane
    eqPanes.forEach((pane) => {
      pane.classList.remove('active');
      if (pane.getAttribute('id') === targetTabId) {
        pane.classList.add('active');
      }
    });

    initIcons();
  });
});

// 7. Preselect Service in Enquiry Form
window.preselectService = function (serviceName) {
  const serviceSelect = document.getElementById('serviceRequired');
  if (serviceSelect) {
    serviceSelect.value = serviceName;
  }
};

// 8. Contact & Enquiry Form Validation & Submission
const enquiryForm = document.getElementById('enquiryForm');
const fullNameInput = document.getElementById('fullName');
const phoneInput = document.getElementById('phoneNumber');
const serviceSelect = document.getElementById('serviceRequired');
const messageInput = document.getElementById('messageText');
const submitBtn = document.getElementById('submitEnquiryBtn');
const btnText = document.getElementById('btnText');
const btnIcon = document.getElementById('btnIcon');
const successBox = document.getElementById('enquirySuccessBox');
const newEnquiryBtn = document.getElementById('newEnquiryBtn');

// Helper to set error
function setError(inputId, errorId, message) {
  const inputEl = document.getElementById(inputId);
  const errorEl = document.getElementById(errorId);
  if (errorEl) errorEl.textContent = message;
  if (inputEl) {
    if (message) {
      inputEl.style.borderColor = '#ff4d4d';
    } else {
      inputEl.style.borderColor = '';
    }
  }
}

// Phone input number restriction
if (phoneInput) {
  phoneInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
    if (e.target.value.length === 10) {
      setError('phoneNumber', 'phoneNumberError', '');
    }
  });
}

// Form Submission Handler
if (enquiryForm) {
  enquiryForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Validate Name
    const nameVal = fullNameInput.value.trim();
    if (!nameVal || nameVal.length < 2) {
      setError('fullName', 'fullNameError', 'Please enter your full name or company name (min 2 characters).');
      isValid = false;
    } else {
      setError('fullName', 'fullNameError', '');
    }

    // Validate Phone (10 digits)
    const phoneVal = phoneInput.value.trim();
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneVal)) {
      setError('phoneNumber', 'phoneNumberError', 'Please enter a valid 10-digit mobile number.');
      isValid = false;
    } else {
      setError('phoneNumber', 'phoneNumberError', '');
    }

    // Validate Service
    const serviceVal = serviceSelect.value;
    if (!serviceVal) {
      setError('serviceRequired', 'serviceRequiredError', 'Please select the required service.');
      isValid = false;
    } else {
      setError('serviceRequired', 'serviceRequiredError', '');
    }

    // Validate Message
    const msgVal = messageInput.value.trim();
    if (!msgVal || msgVal.length < 5) {
      setError('messageText', 'messageTextError', 'Please provide a brief message about your equipment requirements.');
      isValid = false;
    } else {
      setError('messageText', 'messageTextError', '');
    }

    if (!isValid) return;

    // UI Loading state
    submitBtn.disabled = true;
    if (btnText) btnText.textContent = 'TRANSMITTING ENQUIRY...';

    // Simulate instant frontend submission
    setTimeout(() => {
      enquiryForm.classList.add('hidden');
      if (successBox) {
        successBox.classList.remove('hidden');

        const successName = document.getElementById('successCustomerName');
        const successService = document.getElementById('successServiceName');
        const successPhone = document.getElementById('successPhone');
        const successWhatsAppLink = document.getElementById('successWhatsAppLink');

        if (successName) successName.textContent = nameVal;
        if (successService) successService.textContent = serviceVal;
        if (successPhone) successPhone.textContent = `+91 ${phoneVal}`;

        // Create pre-filled WhatsApp message URL
        if (successWhatsAppLink) {
          const waMessage = encodeURIComponent(
            `Hello SHREE RANG KRUPA ENTERPRISE, I just submitted an enquiry:\n*Name:* ${nameVal}\n*Phone:* ${phoneVal}\n*Service:* ${serviceVal}\n*Details:* ${msgVal}`
          );
          successWhatsAppLink.href = `https://wa.me/918780829875?text=${waMessage}`;
        }
      }

      submitBtn.disabled = false;
      if (btnText) btnText.textContent = 'SEND ENQUIRY';
      initIcons();
    }, 600);
  });
}

// Reset form for new submission
if (newEnquiryBtn) {
  newEnquiryBtn.addEventListener('click', () => {
    enquiryForm.reset();
    enquiryForm.classList.remove('hidden');
    if (successBox) successBox.classList.add('hidden');
  });
}

// 9. Smooth anchor navigation offset for sticky header
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetEl = document.querySelector(targetId);
    if (targetEl) {
      e.preventDefault();
      const headerOffset = 82;
      const elementPosition = targetEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Run once on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initIcons();
  handleScroll();
  updateMachineryStage(1); // Default to FX-5000R

  // Handle URL query parameters for contact form pre-population
  const urlParams = new URLSearchParams(window.location.search);
  const serviceParam = urlParams.get('service');
  const eqParam = urlParams.get('equipment');
  const partParam = urlParams.get('part');
  const sSelect = document.getElementById('serviceRequired');
  const mInput = document.getElementById('messageText');

  if (sSelect) {
    if (serviceParam) {
      for (let i = 0; i < sSelect.options.length; i++) {
        const val = sSelect.options[i].value.toLowerCase();
        const pVal = serviceParam.toLowerCase().replace(/\+/g, ' ');
        if (val.includes(pVal) || pVal.includes(val)) {
          sSelect.selectedIndex = i;
          break;
        }
      }
    } else if (eqParam) {
      sSelect.value = 'Diesel Forklift Rental';
      if (mInput && !mInput.value) {
        mInput.value = `Hello SHREE RANG KRUPA ENTERPRISE, I am interested in rental availability and quotation for: ${eqParam}.`;
      }
    } else if (partParam) {
      sSelect.value = 'Forklift Spare Parts';
      if (mInput && !mInput.value) {
        mInput.value = `Hello SHREE RANG KRUPA ENTERPRISE, I need pricing and stock availability for spare part category: ${partParam}.`;
      }
    }
  }
});
