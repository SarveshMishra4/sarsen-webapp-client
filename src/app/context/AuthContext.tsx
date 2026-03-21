'use client';

/**
 * src/context/AuthContext.tsx
 *
 * Central auth state for the entire frontend.
 * Holds who is logged in (user or admin or both).
 * Reads from cookies on app load to restore sessions.
 *
 * Setup: wrap your root layout with <AuthProvider>
 *
 * Usage in any component:
 *   import { useAuth } from '@/context/AuthContext';
 *   const { user, isUserLoggedIn, isAuthReady, loginUser, logoutUser } = useAuth();
 *
 * ── What changed and WHY ────────────────────────────────────────────────────
 *
 * FIX — isAuthReady flag
 *
 *   The original code started with user = null and admin = null.
 *   The useEffect that reads cookies and restores the session only runs
 *   AFTER the first render — this is how React works; effects are always
 *   asynchronous and post-render.
 *
 *   So the sequence on every page load was:
 *     1. AuthProvider renders → user = null, admin = null
 *     2. Dashboard page renders → sees isUserLoggedIn = false
 *     3. Dashboard page redirects to /user/login  ← BUG: premature redirect
 *     4. useEffect fires → reads cookie → sets user   ← too late, already gone
 *
 *   The fix is a third piece of state: isAuthReady (starts false).
 *   It flips to true only after the useEffect has finished reading cookies.
 *
 *   Dashboard pages (and any component that needs to gate on auth) should
 *   check isAuthReady FIRST:
 *
 *     const { isAuthReady, isUserLoggedIn } = useAuth();
 *     if (!isAuthReady) return <Loader />; // wait — don't redirect yet
 *     if (!isUserLoggedIn) router.push('/user/login');
 *
 *   This eliminates the flash-of-unauthenticated-content AND the incorrect
 *   logout-on-refresh, because we never redirect until we actually know
 *   whether a token exists in the cookie.
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import {
  getUserToken,
  getAdminToken,
  setUserToken,
  setAdminToken,
  clearUserToken,
  clearAdminToken,
} from '../../services/cookies';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AuthUser {
  _id:   string;
  email: string;
}

interface AuthContextType {
  // Current logged-in user and admin
  user:  AuthUser | null;
  admin: AuthUser | null;

  // Convenience booleans
  isUserLoggedIn:  boolean;
  isAdminLoggedIn: boolean;

  /**
   * isAuthReady
   *
   * Starts as FALSE. Flips to TRUE after the initial cookie-read useEffect
   * has completed on the client. Use this in dashboard pages to avoid
   * redirecting to login before we even know if a token exists:
   *
   *   if (!isAuthReady) return <FullPageLoader />;
   *   if (!isUserLoggedIn) { router.push('/user/login'); return null; }
   */
  isAuthReady: boolean;

  // Call these after a successful login API response
  loginUser:  (user: AuthUser, token: string) => void;
  loginAdmin: (admin: AuthUser, token: string) => void;

  // Call these on logout button click
  logoutUser:  () => void;
  logoutAdmin: () => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType | null>(null);

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Decodes a JWT payload without any library.
// Only reads the public payload — does NOT verify the signature.
// Signature verification happens on the backend on every request.
function decodeJwtPayload(token: string): { userId?: string; adminId?: string; email?: string } | null {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

function payloadToUser(token: string): AuthUser | null {
  const payload = decodeJwtPayload(token);
  if (!payload || (!payload.userId && !payload.adminId) || !payload.email) {
    return null;
  }
  return {
    _id:   payload.userId ?? payload.adminId ?? '',
    email: payload.email,
  };
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user,        setUser]        = useState<AuthUser | null>(null);
  const [admin,       setAdmin]       = useState<AuthUser | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false); // FIX: starts false

  // On first load: restore session from cookies if tokens exist.
  // We set isAuthReady=true in the finally-equivalent position so that
  // even if both tokens are absent, the flag still flips and dashboard
  // pages know the check is complete.
  useEffect(() => {
    const userToken  = getUserToken();
    const adminToken = getAdminToken();

    if (userToken) {
      const restored = payloadToUser(userToken);
      if (restored) setUser(restored);
      else clearUserToken(); // token malformed — clear it
    }

    if (adminToken) {
      const restored = payloadToUser(adminToken);
      if (restored) setAdmin(restored);
      else clearAdminToken();
    }

    // FIX: only NOW do we tell the rest of the app that auth state is known.
    // Any component that checks isAuthReady before redirecting will now wait
    // for this line before making any routing decisions.
    setIsAuthReady(true);
  }, []);

  const loginUser = useCallback((userData: AuthUser, token: string) => {
    setUserToken(token);
    setUser(userData);
  }, []);

  const loginAdmin = useCallback((adminData: AuthUser, token: string) => {
    setAdminToken(token);
    setAdmin(adminData);
  }, []);

  const logoutUser = useCallback(() => {
    clearUserToken();
    setUser(null);
  }, []);

  const logoutAdmin = useCallback(() => {
    clearAdminToken();
    setAdmin(null);
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      admin,
      isUserLoggedIn:  !!user,
      isAdminLoggedIn: !!admin,
      isAuthReady,        // FIX: exposed to consumers
      loginUser,
      loginAdmin,
      logoutUser,
      logoutAdmin,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth() must be called inside <AuthProvider>. Wrap your layout.tsx with it.');
  }
  return ctx;
}