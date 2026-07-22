/**
 * Order API — sends orders to YOUR Telegram via a bot (customer never opens Telegram).
 *
 * Deploy on Vercel and set environment variables:
 *   TELEGRAM_BOT_TOKEN  — from @BotFather
 *   TELEGRAM_CHAT_ID    — your numeric chat id (see api/SETUP.txt)
 *
 * Optional: ORDER_API_SECRET — if set, requests must send header X-Order-Secret
 */

const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((s) => s.trim())
  : ['*'];

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

function setCors(req, res) {
  const origin = req.headers.origin || '';
  if (ALLOWED_ORIGINS.includes('*') || ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Order-Secret');
}

async function sendTelegramMessage(token, chatId, text) {
  const chatIdValue = String(chatId).trim();
  const response = await fetch(`https://api.telegram.org/bot${token.trim()}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatIdValue,
      text,
      disable_web_page_preview: true,
    }),
  });

  const data = await response.json();
  if (!response.ok || !data.ok) {
    const desc = data.description || response.statusText;
    throw new Error(desc);
  }
  return data;
}

module.exports = async (req, res) => {
  setCors(req, res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return res.status(503).json({
      ok: false,
      error: 'Telegram bot not configured on server',
    });
  }

  const secret = process.env.ORDER_API_SECRET;
  if (secret && req.headers['x-order-secret'] !== secret) {
    return res.status(401).json({ ok: false, error: 'Unauthorized' });
  }

  let body = req.body;
  if (body == null || body === '') {
    const raw = await readRequestBody(req);
    if (raw) {
      try {
        body = JSON.parse(raw);
      } catch {
        return res.status(400).json({ ok: false, error: 'Invalid JSON' });
      }
    }
  }
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ ok: false, error: 'Invalid JSON' });
    }
  }

  if (!body || typeof body.message !== 'string' || !body.message.trim()) {
    return res.status(400).json({ ok: false, error: 'Missing order message' });
  }

  if (body.honeypot) {
    return res.status(200).json({ ok: true });
  }

  try {
    await sendTelegramMessage(token, chatId, body.message.trim());
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Telegram send failed:', err.message);
    return res.status(502).json({
      ok: false,
      error: 'Failed to send to Telegram',
      detail: err.message,
    });
  }
};
