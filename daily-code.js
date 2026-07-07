// ===================================================
// Rushhour Cinematic - 오늘의 암호 생성 로직 (공용)
// rushhour-staff 페이지와 동일한 로직이어야 함
// ===================================================

const DAILY_SALT = "rushhour-cinematic-2026-secret";

async function sha256Hex(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function getTodayDateString() {
  const now = new Date();
  const kstOffset = 9 * 60;
  const localOffset = now.getTimezoneOffset();
  const kstTime = new Date(now.getTime() + (kstOffset + localOffset) * 60000);
  const y = kstTime.getFullYear();
  const m = String(kstTime.getMonth() + 1).padStart(2, '0');
  const d = String(kstTime.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

async function getTodayCode() {
  const dateStr = getTodayDateString();
  const input = `${dateStr}-${DAILY_SALT}`;
  const hash = await sha256Hex(input);
  const digitsOnly = hash.replace(/[^0-9]/g, '');
  let code = digitsOnly.slice(0, 4);
  if (code.length < 4) code = code.padEnd(4, '0');
  return code;
}
