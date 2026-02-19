/**
 * Booking page: 6-step wizard.
 * Steps 1-4: Form. Step 5: Intro. Step 6: Calendly + Submit.
 * Submit disabled until user schedules in Calendly (event_scheduled).
 */
(function () {
  var TOTAL_STEPS = 6;
  var form = document.getElementById('intakeForm');
  var wizard = document.getElementById('bookingWizard');
  var backBtn = document.getElementById('wizardBack');
  var nextBtn = document.getElementById('wizardNext');
  var stepper = document.getElementById('wizardStepper');
  var successEl = document.getElementById('bookingSuccess');
  var submitBtn = document.getElementById('bookingSubmitBtn');

  if (!form || !wizard) return;

  var currentStep = 1;
  var calendlyInitialized = false;

  function initCalendlyWidget() {
    if (calendlyInitialized) return;
    var container = document.querySelector('.calendly-inline-widget') || document.getElementById('calendlyContainer');
    if (!container) return;
    if (window.Calendly && window.Calendly.initInlineWidget) {
      var prefill = {};
      try {
        var nameVal = form.querySelector('[name="name"]');
        var emailVal = form.querySelector('[name="email"]');
        var phoneVal = form.querySelector('[name="phone"]');
        if (nameVal && nameVal.value) prefill.name = nameVal.value;
        if (emailVal && emailVal.value) prefill.email = emailVal.value;
        if (phoneVal && phoneVal.value) prefill.customAnswers = { a1: phoneVal.value };
      } catch (e) { /* ignore */ }
      window.Calendly.initInlineWidget({
        url: 'https://calendly.com/marketingvictor/free-discovery-call?hide_gdpr_banner=1&primary_color=1a393b',
        parentElement: container,
        prefill: prefill
      });
      calendlyInitialized = true;
      listenForCalendlyScheduled();
    } else {
      setTimeout(initCalendlyWidget, 150);
    }
  }

  function listenForCalendlyScheduled() {
    window.addEventListener('message', function (e) {
      if (e.data && e.data.event === 'calendly.event_scheduled' && submitBtn) {
        submitBtn.disabled = false;
      }
    });
  }

  function getStepEl(step) {
    return form.querySelector('.booking-step[data-step="' + step + '"]');
  }

  function validateStep(step) {
    var el = getStepEl(step);
    if (!el) return true;
    var required = el.querySelectorAll('[required]');
    for (var i = 0; i < required.length; i++) {
      var field = required[i];
      if (field.type === 'radio') {
        var name = field.name;
        if (!form.querySelector('input[name="' + name + '"]:checked')) return false;
      } else if (field.type === 'checkbox') {
        var name = field.name;
        if (!form.querySelector('input[name="' + name + '"]:checked')) return false;
      } else if (!field.value || !field.value.trim()) {
        return false;
      }
    }
    if (step === 3) {
      if (!form.querySelector('input[name="services"]:checked')) return false;
    }
    return true;
  }

  function goToStep(step) {
    if (step < 1 || step > TOTAL_STEPS) return;
    var prevEl = getStepEl(currentStep);
    var nextEl = getStepEl(step);
    if (prevEl) prevEl.classList.remove('is-active');
    if (nextEl) nextEl.classList.add('is-active');
    currentStep = step;

    var dots = stepper.querySelectorAll('.booking-stepper-dot');
    dots.forEach(function (dot, i) {
      var dotStep = i + 1;
      dot.classList.remove('is-active', 'is-complete');
      if (dotStep < step) dot.classList.add('is-complete');
      else if (dotStep === step) dot.classList.add('is-active');
    });

    backBtn.disabled = step === 1;

    if (step === TOTAL_STEPS) {
      nextBtn.style.display = 'none';
      if (submitBtn) submitBtn.disabled = true;
      requestAnimationFrame(function () { initCalendlyWidget(); });
    } else {
      nextBtn.style.display = 'inline-flex';
      nextBtn.textContent = 'Next';
      nextBtn.type = 'button';
    }
  }

  backBtn.addEventListener('click', function () {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  });

  nextBtn.addEventListener('click', function () {
    if (currentStep < TOTAL_STEPS) {
      if (!validateStep(currentStep)) {
        var first = getStepEl(currentStep).querySelector('[required]');
        if (first) first.focus();
        return;
      }
      goToStep(currentStep + 1);
    }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (submitBtn && submitBtn.disabled) return;

    var formData = new FormData(form);
    var data = {};
    var services = [];
    form.querySelectorAll('input[name="services"]:checked').forEach(function (cb) {
      services.push(cb.value);
    });
    data.services = services.join(', ');
    formData.forEach(function (value, key) {
      if (key !== 'services') {
        data[key] = value;
      }
    });

    var emailBody = 'New Strategy Call Application\n\n' +
      'CONTACT\nName: ' + data.name + '\nEmail: ' + data.email + '\nPhone: ' + data.phone + '\nInstagram: ' + (data.instagram || 'Not provided') + '\n\n' +
      'BUSINESS\nMarket: ' + data.market + '\nTransactions: ' + data.transactions + '\nAvg Price: ' + data.avg_price + '\nExperience: ' + data.experience + '\n\n' +
      'SOCIAL MEDIA\nPosting: ' + data.currently_posting + '\nFollowers: ' + (data.followers || 'N/A') + '\nStruggle: ' + data.struggle + '\n\n' +
      'SERVICES & BUDGET\nInterested: ' + data.services + '\nBudget: ' + data.budget + '\n\n' +
      'TIMELINE & GOALS\nTimeline: ' + data.timeline + '\nGoal: ' + data.goal + '\nAdditional: ' + (data.additional || 'None') + '\n\nReferral: ' + (data.referral || 'N/A');

    var formSubmitUrl = 'https://formsubmit.co/ajax/0c6c10402bb826c76d34da7b0334bd8e';
    fetch(formSubmitUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        message: emailBody,
        _subject: 'New Strategy Call Application from ' + data.name,
        _template: 'box'
      })
    }).then(function (r) { return r.json(); }).then(function () { })
      .catch(function () { });

    form.style.display = 'none';
    successEl.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  goToStep(1);
})();
