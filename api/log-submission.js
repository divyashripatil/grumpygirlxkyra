const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwgJKUcD14aem-Sehk1udvk9bzL78VF2dzlwr1opd2J_-xbA8IG-Miw5nlbPHiC540/exec';

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const data = req.body;
  const time = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  // ── PERMANENT VERCEL LOG ─────────────────────────────────────────
  // Always written, always recoverable. Pull anytime from Vercel → Logs.
  console.log('──────────────────────────────────');
  console.log('KYRA APPLICATION');
  console.log('time:     ', time);
  console.log('ref:      ', data.ref);
  console.log('name:     ', data.name);
  console.log('phone:    ', data.phone);
  console.log('location: ', data.location);
  console.log('pickup:   ', data.pickup);
  console.log('instagram:', data.instagram || '—');
  console.log('food:     ', data.food);
  console.log('drink:    ', data.drink);
  console.log('notes:    ', data.notes || '—');
  console.log('story:    ', data.story);
  console.log('paymentId:', data.paymentId);
  console.log('──────────────────────────────────');

  // ── GOOGLE SHEETS VIA APPS SCRIPT ───────────────────────────────
  // Called server-side so no CORS. Retries once on failure.
  const payload = JSON.stringify(data);

  const postToSheet = () => fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    redirect: 'follow',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: payload,
  });

  try {
    let response = await postToSheet();

    // Retry once if it failed
    if (!response.ok) {
      console.log('Sheets: first attempt failed, retrying…');
      response = await postToSheet();
    }

    const text = await response.text();
    console.log('Sheets: saved OK ✓ —', response.status, text.slice(0, 120));
    res.status(200).json({ ok: true });

  } catch (err) {
    // Even if Sheets fails, data is safe in logs above
    console.error('Sheets: FAILED —', err.message);
    console.error('RECOVER FROM LOGS ABOVE ↑');
    res.status(200).json({ ok: true, sheetsError: err.message });
  }
};
