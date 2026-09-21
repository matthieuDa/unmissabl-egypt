(() => {
  const form = document.querySelector('#contact-form');
  if (!form) return;
  const intent = form.elements.intent;
  const callFields = document.querySelector('#call-fields');
  const updateIntent = () => {
    const isCall = intent.value === 'call';
    callFields.classList.toggle('is-visible', isCall);
    form.elements.availability.disabled = !isCall;
  };
  if (new URLSearchParams(location.search).get('intent') === 'call') intent.value = 'call';
  intent.addEventListener('change', updateIntent);
  updateIntent();
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const isCall = data.get('intent') === 'call';
    const subject = `UNMISSABL — ${isCall ? 'Call request' : 'Egypt project'} — ${data.get('brand').trim()}`;
    const body = [
      'Hi Matthieu,', '',
      isCall ? 'I’d like to arrange a 15-minute call about the Egypt production.' : 'I’d like to discuss a project for the Egypt production.', '',
      `Name: ${data.get('name').trim()}`,
      `Brand / company: ${data.get('brand').trim()}`,
      `Email: ${data.get('email').trim()}`,
      ...(isCall && data.get('availability')?.trim() ? [`Preferred times & time zone: ${data.get('availability').trim()}`] : []), '',
      data.get('message').trim(), '',
      'Egypt production: October 16–25, 2026.'
    ].join('\n');
    location.href = `mailto:dalle.matthieu@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    document.querySelector('#email-note').textContent = 'Your brief is ready in your email app. Send it there to reach Matthieu. If no app opened, email dalle.matthieu@gmail.com directly.';
  });
  const copyButton = document.querySelector('#copy-email');
  copyButton.hidden = false;
  copyButton.addEventListener('click', async () => {
    const status = document.querySelector('#copy-status');
    try {
      await navigator.clipboard.writeText('dalle.matthieu@gmail.com');
      status.textContent = 'Email address copied.';
    } catch {
      status.textContent = 'dalle.matthieu@gmail.com — select and copy this address.';
    }
  });
})();
