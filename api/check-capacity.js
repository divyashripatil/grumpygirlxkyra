const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzDyxb4HpVTWJnaEGZggA6-sMsj-BEDybsFlHwvSvpsIIMubgWIbD1-JiweryeHXsIC8g/exec';
const SEAT_CAP = 30;
const TEST_NAMES = ['Test Submission', 'Live Pipeline Test', 'Divyashri test'];

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store');
  try {
    const r = await fetch(`${APPS_SCRIPT_URL}?action=read`, { redirect: 'follow' });
    const data = await r.json();
    let count = 0;
    if (data.rows && data.rows.length > 1) {
      const [headers, ...rows] = data.rows;
      const nameIdx = headers.indexOf('Name');
      count = rows.filter(row => {
        const name = row[nameIdx] || '';
        return name && !TEST_NAMES.includes(name);
      }).length;
    }
    res.status(200).json({
      count,
      cap: SEAT_CAP,
      remaining: Math.max(0, SEAT_CAP - count),
      full: count >= SEAT_CAP,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
