// Admin endpoint — pulls all rows from Google Sheet via Apps Script
// Usage: GET /api/get-submissions?key=KYRA_ADMIN_2026
// Returns JSON array of all submissions

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwgJKUcD14aem-Sehk1udvk9bzL78VF2dzlwr1opd2J_-xbA8IG-Miw5nlbPHiC540/exec';
const ADMIN_KEY = process.env.ADMIN_KEY || 'KYRA_ADMIN_2026';

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // Simple key-gate so the endpoint isn't public
  const key = req.query.key || req.headers['x-admin-key'];
  if (key !== ADMIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const response = await fetch(
      `${APPS_SCRIPT_URL}?action=read`,
      { method: 'GET', redirect: 'follow' }
    );
    const text = await response.text();

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = { raw: text };
    }

    // If Apps Script returned rows array, format nicely
    if (parsed.rows && Array.isArray(parsed.rows)) {
      const [headers, ...dataRows] = parsed.rows;
      const submissions = dataRows.map(row => {
        const obj = {};
        headers.forEach((h, i) => { obj[h] = row[i] ?? ''; });
        return obj;
      });
      return res.status(200).json({
        count: submissions.length,
        submissions,
      });
    }

    // Return raw if format unexpected
    return res.status(200).json({ raw: parsed });

  } catch (err) {
    console.error('get-submissions error:', err.message);
    return res.status(500).json({ error: err.message });
  }
};
