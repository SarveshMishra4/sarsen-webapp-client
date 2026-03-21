/**
 * src/services/cookies.ts
 *
 * All token storage and retrieval for the frontend.
 * User token: 30 days (matches backend JWT expiry)
 * Admin token: 7 days (matches backend JWT expiry)
 *
 * ── What changed and WHY ────────────────────────────────────────────────────
 *
 * FIX 1 — SameSite=Lax  (was: SameSite=Strict)
 *   SameSite=Strict means the browser will NOT send the cookie when the user
 *   arrives at your site from ANY external source — including a hard refresh
 *   that some browsers treat as a cross-site navigation, bookmarks, or links
 *   from other tabs. This caused the middleware to see no cookie → redirect
 *   to login even though the user was genuinely logged in.
 *   Lax is the correct value here: it sends the cookie on all same-site
 *   requests AND on top-level navigations (hard refresh, bookmark, external
 *   link). It still blocks the cookie on cross-site sub-requests (e.g. a
 *   foreign iframe loading your API), which is all CSRF protection requires.
 *
 * FIX 2 — encodeURIComponent when setting
 *   getCookie already called decodeURIComponent when reading.
 *   setCookie was NOT encoding when writing, so special characters in JWTs
 *   (the '=' padding at the end of base64 segments) could corrupt the stored
 *   value and make decoding silently return null, triggering clearUserToken()
 *   in AuthContext and wiping the session.
 *
 * FIX 3 — deleteCookie now includes the same path and SameSite attributes
 *   The browser matches a cookie for deletion by name + path + domain.
 *   If the attributes don't match what was used when setting, some browsers
 *   silently ignore the deletion (or worse, create a second cookie with the
 *   same name). Now both set and delete use identical attributes.
 */

const USER_TOKEN_KEY  = 'user_token';
const ADMIN_TOKEN_KEY = 'admin_token';

// ─── Internal helpers ─────────────────────────────────────────────────────────

function setCookie(name: string, value: string, days: number): void {
  if (typeof document === 'undefined') return;
  const expires = new Date();
  expires.setDate(expires.getDate() + days);
document.cookie = [
  `${name}=${encodeURIComponent(value)}`,
  `expires=${expires.toUTCString()}`,
  'path=/',
  'SameSite=Lax',
  'Secure',          // ← add this line
].join('; ');
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
}

function deleteCookie(name: string): void {
  if (typeof document === 'undefined') return;
  // FIX 3: use the same path and SameSite as setCookie so the browser
  // correctly matches and removes the right cookie.
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`;
}

// ─── User token ───────────────────────────────────────────────────────────────

export function setUserToken(token: string): void {
  setCookie(USER_TOKEN_KEY, token, 30);
}

export function getUserToken(): string | null {
  return getCookie(USER_TOKEN_KEY);
}

export function clearUserToken(): void {
  deleteCookie(USER_TOKEN_KEY);
}

// ─── Admin token ──────────────────────────────────────────────────────────────

export function setAdminToken(token: string): void {
  setCookie(ADMIN_TOKEN_KEY, token, 7);
}

export function getAdminToken(): string | null {
  return getCookie(ADMIN_TOKEN_KEY);
}

export function clearAdminToken(): void {
  deleteCookie(ADMIN_TOKEN_KEY);
}