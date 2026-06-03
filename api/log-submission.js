module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const data = req.body;

  // This logs to Vercel's function logs — always recoverable from dashboard
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

  res.status(200).json({ ok: true });
};
