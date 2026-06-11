const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzDyxb4HpVTWJnaEGZggA6-sMsj-BEDybsFlHwvSvpsIIMubgWIbD1-JiweryeHXsIC8g/exec';
const SEAT_CAP = 30;
const TEST_NAMES = ['Test Submission', 'Live Pipeline Test', 'Divyashri test'];

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // ── SEAT CAP CHECK ────────────────────────────────────────────────────────
  try {
    const sheetRes = await fetch(`${APPS_SCRIPT_URL}?action=read`, { redirect: 'follow' });
    const sheetData = await sheetRes.json();
    if (sheetData.rows && sheetData.rows.length > 1) {
      const [headers, ...rows] = sheetData.rows;
      const nameIdx = headers.indexOf('Name');
      const realCount = rows.filter(r => {
        const name = r[nameIdx] || '';
        return name && !TEST_NAMES.includes(name);
      }).length;
      if (realCount >= SEAT_CAP) {
        console.log(`Seat cap reached: ${realCount}/${SEAT_CAP}`);
        return res.status(403).json({ full: true, error: 'Event is full' });
      }
      console.log(`Seat count: ${realCount}/${SEAT_CAP}`);
    }
  } catch (err) {
    console.error('Cap check failed (continuing anyway):', err.message);
  }

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  const credentials = Buffer.from(`${keyId}:${keySecret}`).toString('base64');

  try {
    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: 149900, // ₹1499 in paise
        currency: 'INR',
        receipt: 'kyra_' + Date.now(),
      }),
    });

    const order = await response.json();
    if (!response.ok) throw new Error(order.error?.description || 'Order failed');

    res.status(200).json({ orderId: order.id, amount: order.amount, key: keyId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Failed to create order' });
  }
};
