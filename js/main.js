(function () {
  const form        = document.getElementById('loginForm');
  const emailInput  = document.getElementById('loginEmail');
  const passInput   = document.getElementById('loginPassword');
  const emailError  = document.getElementById('emailError');
  const passError   = document.getElementById('passwordError');
  const submitBtn   = document.getElementById('submitBtn');
  const errorBanner = document.getElementById('loginErrorBanner');
  const toggleBtn   = document.getElementById('togglePassword');
  const eyeIcon     = document.getElementById('eyeIcon');
  const eyeOffIcon  = document.getElementById('eyeOffIcon');

  // Toggle password visibility
  toggleBtn.addEventListener('click', function () {
    const isPassword = passInput.type === 'password';
    passInput.type = isPassword ? 'text' : 'password';
    eyeIcon.style.display    = isPassword ? 'none'  : 'block';
    eyeOffIcon.style.display = isPassword ? 'block' : 'none';
    toggleBtn.setAttribute('aria-label', isPassword ? 'Скрыть пароль' : 'Показать пароль');
  });

  // Clear field error on input
  emailInput.addEventListener('input', function () {
    emailInput.classList.remove('error');
    emailError.textContent = '';
    emailError.classList.remove('visible');
    errorBanner.classList.remove('visible');
  });

  passInput.addEventListener('input', function () {
    passInput.classList.remove('error');
    passError.textContent = '';
    passError.classList.remove('visible');
    errorBanner.classList.remove('visible');
  });

  function showFieldError(input, errorEl, msg) {
    input.classList.add('error');
    errorEl.textContent = msg;
    errorEl.classList.add('visible');
  }

  function validate() {
    let ok = true;
    if (!emailInput.value.trim()) {
      showFieldError(emailInput, emailError, 'Введите логин или email');
      ok = false;
    }
    if (!passInput.value) {
      showFieldError(passInput, passError, 'Введите пароль');
      ok = false;
    }
    return ok;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    errorBanner.classList.remove('visible');

    if (!validate()) return;

    // Loading state
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');

    // fetch('/api/login', { method: 'POST', body: JSON.stringify({...}) })
    setTimeout(function () {
      submitBtn.disabled = false;
      submitBtn.classList.remove('loading');

      // Show error
      errorBanner.textContent = 'Неверный логин или пароль';
      errorBanner.classList.add('visible');
      passInput.value = '';
      passInput.focus();
    }, 1200);
  });
})();