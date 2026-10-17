import { useState, useCallback } from 'react';

export function useModalManager() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const openChat = useCallback(() => setIsChatOpen(true), []);
  const closeChat = useCallback(() => setIsChatOpen(false), []);

  const openSettings = useCallback(() => setIsSettingsOpen(true), []);
  const closeSettings = useCallback(() => setIsSettingsOpen(false), []);

  const openAdminLogin = useCallback(() => setIsAdminLoginOpen(true), []);
  const closeAdminLogin = useCallback(() => setIsAdminLoginOpen(false), []);

  const closeAll = useCallback(() => {
    setIsCartOpen(false);
    setIsChatOpen(false);
    setIsSettingsOpen(false);
    setIsAdminLoginOpen(false);
  }, []);

  return {
    isCartOpen,
    openCart,
    closeCart,
    isChatOpen,
    openChat,
    closeChat,
    isSettingsOpen,
    openSettings,
    closeSettings,
    isAdminLoginOpen,
    openAdminLogin,
    closeAdminLogin,
    closeAll
  };
}
