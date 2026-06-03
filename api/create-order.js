module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

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
        amount: 10000, // ₹100 in paise
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
