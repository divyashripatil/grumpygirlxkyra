const { google } = require('googleapis');

const SHEET_ID = '1xSW4cCSwrgdOrD_RfBljXFRXQ5TkPk2LrytYKlwOYj0';

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const data = req.body;
  const time = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  // Always log to Vercel — recoverable even if Sheets fails
  console.log('=== KYRA APPLICATION ===');
  console.log('time:     ', time);
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
  console.log('========================');

  // Write directly to Google Sheets via API — reliable, no CORS, no Apps Script
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: 'Sheet1!A:M',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          time,
          data.ref,
          data.name,
          data.phone,
          data.location,
          data.pickup,
          data.instagram || '',
          data.food,
          data.drink,
          data.notes || '',
          data.story,
          data.paymentId || '',
          '₹100 · held',
        ]],
      },
    });

    console.log('Sheets: saved OK ✓');
    res.status(200).json({ ok: true });

  } catch (err) {
    console.error('Sheets: FAILED —', err.message);
    res.status(500).json({ ok: false, error: err.message });
  }
};
