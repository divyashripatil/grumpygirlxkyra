const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwgJKUcD14aem-Sehk1udvk9bzL78VF2dzlwr1opd2J_-xbA8IG-Miw5nlbPHiC540/exec';

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const data = req.body;

  // Always log to Vercel (recoverable from dashboard)
  console.log('=== KYRA APPLICATION ===');
  console.log('ref:      ', data.ref);
  console.log('name:     ', data.name);
  console.log('phone:    ', data.phone);
  console.log('location: ', data.location);
  console.log('pickup:   ', data.pickup);
  console.log('instagram:', data.instagram);
  console.log('food:     ', data.food);
  console.log('drink:    ', data.drink);
  console.log('notes:    ', data.notes);
  console.log('story:    ', data.story);
  console.log('paymentId:', data.paymentId);
  console.log('time:     ', new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));
  console.log('========================');

  // Write to Google Sheets server-side — no CORS, always works
  try {
    await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(data),
    });
    console.log('Sheets: saved OK');
  } catch (err) {
    console.error('Sheets: FAILED —', err.message);
  }

  res.status(200).json({ ok: true });
};
