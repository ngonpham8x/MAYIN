import { useState, useCallback } from 'react';

const ADMIN_SESSION_KEY = 'anphat_admin_session';

export function useAdminAuth() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      const local = localStorage.getItem(ADMIN_SESSION_KEY);
      const session = sessionStorage.getItem(ADMIN_SESSION_KEY);
      const raw = local || session;
      if (raw) {
        const parsed = JSON.parse(raw);
        return Boolean(parsed.isLoggedIn);
      }
      return false;
    } catch {
      return false;
    }
  });

  const loginSuccess = useCallback(() => {
    setIsAdminLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsAdminLoggedIn(false);
    try {
      localStorage.removeItem(ADMIN_SESSION_KEY);
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
    } catch (error) {
      console.error('Lỗi khi đăng xuất:', error);
    }
  }, []);

  return {
    isAdminLoggedIn,
    loginSuccess,
    logout
  };
}
