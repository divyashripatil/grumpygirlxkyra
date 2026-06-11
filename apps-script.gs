// ─────────────────────────────────────────────────────────────────
// KYRA × GRUMPY GIRL — Google Apps Script
// Paste the entire contents of this file into your Apps Script editor.
// Deploy as: Execute as → Me  |  Who has access → Anyone, even anonymous
// ─────────────────────────────────────────────────────────────────

const SHEET_ID = '1HBc4M1Vv9gYm20zRlzUYAixFUvm1I6SDzlIYxCLT71o';
const SHEET_NAME = 'Sheet1'; // change if your tab has a different name

const HEADERS = [
  'Time (IST)', 'Ref', 'Name', 'Phone', 'Location',
  'Pickup', 'Instagram', 'Food', 'Drink', 'Notes', 'Story', 'PaymentId'
];

// ── WRITE: called by /api/log-submission on each paid form submission ──────
function doPost(e) {
  try {
    const raw = e.postData ? e.postData.contents : '{}';
    const data = JSON.parse(raw);

    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];

    // Add headers if the sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length)
        .setFontWeight('bold')
        .setBackground('#3D0808')
        .setFontColor('#F4D5A3');
    }

    const time = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    sheet.appendRow([
      time,
      data.ref        || '',
      data.name       || '',
      data.phone      || '',
      data.location   || '',
      data.pickup     || '',
      data.instagram  || '',
      data.food       || '',
      data.drink      || '',
      data.notes      || '',
      data.story      || '',
      data.paymentId  || '',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, ref: data.ref }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ── READ: called by /api/get-submissions?action=read ──────────────────────
function doGet(e) {
  const action = e && e.parameter ? e.parameter.action : '';

  if (action === 'read') {
    try {
      const ss = SpreadsheetApp.openById(SHEET_ID);
      const sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];
      const rows = sheet.getDataRange().getValues();
      return ContentService
        .createTextOutput(JSON.stringify({ rows }))
        .setMimeType(ContentService.MimeType.JSON);
    } catch (err) {
      return ContentService
        .createTextOutput(JSON.stringify({ error: err.toString() }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }

  // Health check ping
  return ContentService
    .createTextOutput(JSON.stringify({ success: true, status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
