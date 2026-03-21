/**
 * src/services/cookies.ts
 *
 * Temporary: using localStorage for token persistence.
 * This helps diagnose cookie issues.
 */

const USER_TOKEN_KEY  = 'user_token';
const ADMIN_TOKEN_KEY = 'admin_token';

// ─── User token (localStorage) ───────────────────────────────────────────────

export function setUserToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(USER_TOKEN_KEY, token);
    console.log('[setUserToken] stored in localStorage');
  }
}

export function getUserToken(): string | null {
  if (typeof window === 'undefined') return null;
  const token = localStorage.getItem(USER_TOKEN_KEY);
  console.log('[getUserToken] from localStorage:', token ? 'present' : 'null');
  return token;
}

export function clearUserToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(USER_TOKEN_KEY);
    console.log('[clearUserToken] removed from localStorage');
  }
}

// ─── Admin token (localStorage) ──────────────────────────────────────────────

export function setAdminToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(ADMIN_TOKEN_KEY, token);
    console.log('[setAdminToken] stored in localStorage');
  }
}

export function getAdminToken(): string | null {
  if (typeof window === 'undefined') return null;
  const token = localStorage.getItem(ADMIN_TOKEN_KEY);
  console.log('[getAdminToken] from localStorage:', token ? 'present' : 'null');
  return token;
}

export function clearAdminToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    console.log('[clearAdminToken] removed from localStorage');
  }
}