import React from 'react';
import {
  Header,
  Hero,
  ServicesOverview,
  PricingSection,
  PrinterCatalog,
  GoogleMapsLocation,
  Footer,
  FloatingContactButtons,
  Chat247Support,
  CartModal,
  ServiceSettingsModal,
  AdminLoginModal,
  ScrollReveal,
} from './modules';
import { useCart, usePricing, useAdminAuth, useModalManager } from './hooks';

export default function App() {
  // 1. Isolated Business Logic Hooks
  const { cart, addToCart, updateQuantity, removeFromCart, clearCart } = useCart();
  const { pricingList, setPricingList, priceDisplayMode, setPriceDisplayMode, resetToDefault } = usePricing();
  const { isAdminLoggedIn, loginSuccess, logout } = useAdminAuth();
  const modalManager = useModalManager();

  // 2. Navigation smooth-scroll helper
  const handleScrollToPricing = () => {
    const element = document.getElementById('bang-gia');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 3. Settings modal trigger with authentication guard
  const handleOpenSettings = () => {
    if (isAdminLoggedIn) {
      modalManager.openSettings();
    } else {
      modalManager.openAdminLogin();
    }
  };

  const handleAdminLoginSuccess = () => {
    loginSuccess();
    modalManager.closeAdminLogin();
    modalManager.openSettings();
  };

  const handleAdminLogout = () => {
    logout();
    modalManager.closeSettings();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white w-full overflow-x-hidden">
      {/* Module 1: Header & Navigation */}
      <Header
        cart={cart}
        isAdminLoggedIn={isAdminLoggedIn}
        onOpenCart={modalManager.openCart}
        onOpenChat={modalManager.openChat}
        onOpenSettings={handleOpenSettings}
        onAdminLogout={handleAdminLogout}
      />

      {/* Main Page Content Flow with Scroll Reveal Animations */}
      <main className="flex-1 w-full overflow-hidden">
        {/* Module 2: Hero Banner */}
        <ScrollReveal delay={0} duration={0.4} distance={15}>
          <Hero onOpenChat={modalManager.openChat} />
        </ScrollReveal>

        {/* Module 3: Services Overview */}
        <ScrollReveal threshold={0.08} delay={50} duration={0.5} distance={20}>
          <ServicesOverview
            onSelectService={handleScrollToPricing}
            onBookNow={handleScrollToPricing}
          />
        </ScrollReveal>

        {/* Module 4: Pricing & Instant Estimator */}
        <ScrollReveal threshold={0.08} delay={50} duration={0.5} distance={20}>
          <PricingSection
            pricingList={pricingList}
            priceDisplayMode={priceDisplayMode}
            isAdminLoggedIn={isAdminLoggedIn}
            onOpenSettings={handleOpenSettings}
            onSelectServiceToBook={handleScrollToPricing}
          />
        </ScrollReveal>

        {/* Module 5: Printer Catalog */}
        <ScrollReveal threshold={0.08} delay={50} duration={0.5} distance={20}>
          <PrinterCatalog
            onAddToCart={addToCart}
            onOpenOrderModal={addToCart}
          />
        </ScrollReveal>

        {/* Module 6: Google Maps & Location */}
        <ScrollReveal threshold={0.08} delay={50} duration={0.5} distance={20}>
          <GoogleMapsLocation />
        </ScrollReveal>
      </main>

      {/* Module 7: Footer */}
      <Footer />

      {/* Module 8: Floating Contact CTAs */}
      <FloatingContactButtons
        onOpenChat={modalManager.openChat}
        onQuickBookClick={handleScrollToPricing}
      />

      {/* Module 9: 24/7 Diagnostic Chat Widget */}
      <Chat247Support
        isOpen={modalManager.isChatOpen}
        onClose={modalManager.closeChat}
        onSelectBookingService={handleScrollToPricing}
      />

      {/* Module 10: Shopping Cart & Checkout */}
      <CartModal
        isOpen={modalManager.isCartOpen}
        onClose={modalManager.closeCart}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
      />

      {/* Module 11: Service & Pricing Settings */}
      <ServiceSettingsModal
        isOpen={modalManager.isSettingsOpen}
        onClose={modalManager.closeSettings}
        pricingList={pricingList}
        onSavePricingList={setPricingList}
        priceDisplayMode={priceDisplayMode}
        onSavePriceDisplayMode={setPriceDisplayMode}
        onResetDefaults={resetToDefault}
        onLogout={handleAdminLogout}
      />

      {/* Module 12: Admin Authentication Guard */}
      <AdminLoginModal
        isOpen={modalManager.isAdminLoginOpen}
        onClose={modalManager.closeAdminLogin}
        onLoginSuccess={handleAdminLoginSuccess}
      />
    </div>
  );
}
