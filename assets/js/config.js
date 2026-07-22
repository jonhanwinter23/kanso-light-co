/**
 * Order API: POST JSON { message, honeypot? } → your Telegram via bot.
 * - Local dev (npm run dev): use '/api/order'
 * - Production: full URL e.g. 'https://your-app.vercel.app/api/order'
 */
const KANSO_ORDER_API_URL = '/api/order';

/** Optional — only if ORDER_API_SECRET is set on the server */
const KANSO_ORDER_API_SECRET = '';

/** Shop contact (for display / fallback) */
const KANSO_TELEGRAM_PHONE = '85566599288';
const KANSO_TELEGRAM_LINK = `https://t.me/+${KANSO_TELEGRAM_PHONE}`;
