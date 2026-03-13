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
 *   const { user, isUserLoggedIn, loginUser, logoutUser } = useAuth();
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
  const [user,  setUser]  = useState<AuthUser | null>(null);
  const [admin, setAdmin] = useState<AuthUser | null>(null);

  // On first load: restore session from cookies if tokens exist
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