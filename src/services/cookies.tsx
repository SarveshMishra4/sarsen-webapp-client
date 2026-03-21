/**
 * src/services/cookies.ts
 *
 * All token storage and retrieval for the frontend.
 * User token: 30 days (matches backend JWT expiry)
 * Admin token: 7 days (matches backend JWT expiry)
 *
 * Usage:
 *   import { setUserToken, getUserToken, clearUserToken } from '@/services/cookies';
 *   import { setAdminToken, getAdminToken, clearAdminToken } from '@/services/cookies';
 */

const USER_TOKEN_KEY  = 'user_token';
const ADMIN_TOKEN_KEY = 'admin_token';

// ─── Internal helpers ────────────────────────────────────────────────────────

function setCookie(name: string, value: string, days: number): void {
  if (typeof document === 'undefined') return;
  const expires = new Date();
  expires.setDate(expires.getDate() + days);
  const isSecure = window.location.protocol === 'https:';
  console.log(`[setCookie] Setting ${name} with days=${days}, isSecure=${isSecure}`);
  const cookieParts = [
    `${name}=${value}`,
    `expires=${expires.toUTCString()}`,
    'path=/',
    'SameSite=Lax',
  ];
  if (isSecure) cookieParts.push('Secure');
  const cookieString = cookieParts.join('; ');
  document.cookie = cookieString;
  console.log(`[setCookie] Cookie string: ${cookieString}`);
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  const value = match ? decodeURIComponent(match[2]) : null;
  console.log(`[getCookie] ${name} => ${value ? value.substring(0, 20) + '...' : 'null'}`);
  return value;
}

function deleteCookie(name: string): void {
  if (typeof document === 'undefined') return;
  console.log(`[deleteCookie] Deleting ${name}`);
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
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
  console.log('[setAdminToken] called with token:', token.substring(0, 20) + '...');
  setCookie(ADMIN_TOKEN_KEY, token, 7);
}

export function getAdminToken(): string | null {
  const token = getCookie(ADMIN_TOKEN_KEY);
  console.log('[getAdminToken] returning:', token ? token.substring(0, 20) + '...' : null);
  return token;
}

export function clearAdminToken(): void {
  console.log('[clearAdminToken] called');
  deleteCookie(ADMIN_TOKEN_KEY);
}