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
  document.cookie = [
    `${name}=${value}`,
    `expires=${expires.toUTCString()}`,
    'path=/',
    'SameSite=Strict',
  ].join('; ');
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
}

function deleteCookie(name: string): void {
  if (typeof document === 'undefined') return;
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
  setCookie(ADMIN_TOKEN_KEY, token, 7);
}

export function getAdminToken(): string | null {
  return getCookie(ADMIN_TOKEN_KEY);
}

export function clearAdminToken(): void {
  deleteCookie(ADMIN_TOKEN_KEY);
}