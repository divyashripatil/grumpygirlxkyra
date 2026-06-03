const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzDyxb4HpVTWJnaEGZggA6-sMsj-BEDybsFlHwvSvpsIIMubgWIbD1-JiweryeHXsIC8g/exec';

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const data = req.body;
  const time = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  // ── PERMANENT VERCEL LOG (structured, easy to grep/parse) ───────────────
  // This is ALWAYS written. Pull from Vercel → Logs → filter "KYRA_SUB" any time.
  console.log('KYRA_SUB', JSON.stringify({
    time,
    ref:       data.ref       || '',
    name:      data.name      || '',
    phone:     data.phone     || '',
    location:  data.location  || '',
    pickup:    data.pickup    || '',
    instagram: data.instagram || '',
    food:      data.food      || '',
    drink:     data.drink     || '',
    notes:     data.notes     || '',
    story:     data.story     || '',
    paymentId: data.paymentId || '',
  }));

  // ── HUMAN-READABLE LOG (for visual scan in Vercel dashboard) ─────────────
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

  // ── GOOGLE SHEETS VIA APPS SCRIPT (server-side, 3 attempts) ─────────────
  const payload = JSON.stringify(data);

  const postToSheet = () => fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    redirect: 'follow',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: payload,
  });

  let sheetsOk = false;
  let sheetsError = '';

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await postToSheet();
      const text = await response.text();
      if (response.ok) {
        console.log(`Sheets: saved OK ✓ (attempt ${attempt}) — ${text.slice(0, 120)}`);
        sheetsOk = true;
        break;
      } else {
        console.log(`Sheets: attempt ${attempt} failed (${response.status}) — retrying…`);
        sheetsError = `HTTP ${response.status}`;
      }
    } catch (err) {
      console.log(`Sheets: attempt ${attempt} error — ${err.message} — retrying…`);
      sheetsError = err.message;
      // short wait before retry
      await new Promise(r => setTimeout(r, 600 * attempt));
    }
  }

  if (!sheetsOk) {
    console.error('Sheets: ALL 3 ATTEMPTS FAILED —', sheetsError);
    console.error('RECOVER FROM KYRA_SUB LOG ABOVE ↑');
  }

  // Always 200 — Vercel log is the safety net
  res.status(200).json({ ok: true, sheetsOk });
};
