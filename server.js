const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.post('/api/contact', (req, res) => {
  const { firstName, lastName, email, phone, subject, message } = req.body || {};

  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({
      ok: false,
      error: 'firstName, lastName, email, and message are required.'
    });
  }

  console.log('[CONTACT REQUEST]', {
    firstName,
    lastName,
    email,
    phone: phone || '',
    subject: subject || 'General Inquiry',
    message,
    receivedAt: new Date().toISOString()
  });

  return res.status(200).json({
    ok: true,
    message: 'Contact request received.'
  });
});

app.get('/health', (_, res) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Live Corps website running at http://localhost:${PORT}`);
});
