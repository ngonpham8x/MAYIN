import { useState, useEffect, useCallback } from 'react';
import { PricingItem, PriceDisplayMode } from '../types';
import { DEFAULT_PRICING_LIST } from '../data/pricing.data';

const PRICING_LIST_KEY = 'anphat_pricing_list';
const PRICE_DISPLAY_MODE_KEY = 'anphat_price_display_mode';

export function usePricing() {
  const [pricingList, setPricingList] = useState<PricingItem[]>(() => {
    try {
      const saved = localStorage.getItem(PRICING_LIST_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_PRICING_LIST;
    } catch (error) {
      console.warn('Lỗi đọc bảng giá từ localStorage:', error);
      return DEFAULT_PRICING_LIST;
    }
  });

  const [priceDisplayMode, setPriceDisplayMode] = useState<PriceDisplayMode>(() => {
    try {
      const saved = localStorage.getItem(PRICE_DISPLAY_MODE_KEY);
      return (saved as PriceDisplayMode) || 'zalo_contact';
    } catch (error) {
      console.warn('Lỗi đọc chế độ giá từ localStorage:', error);
      return 'zalo_contact';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(PRICING_LIST_KEY, JSON.stringify(pricingList));
    } catch (error) {
      console.error('Lỗi lưu bảng giá vào localStorage:', error);
    }
  }, [pricingList]);

  useEffect(() => {
    try {
      localStorage.setItem(PRICE_DISPLAY_MODE_KEY, priceDisplayMode);
    } catch (error) {
      console.error('Lỗi lưu chế độ hiển thị giá vào localStorage:', error);
    }
  }, [priceDisplayMode]);

  const resetToDefault = useCallback(() => {
    setPricingList(DEFAULT_PRICING_LIST);
    setPriceDisplayMode('zalo_contact');
    try {
      localStorage.removeItem(PRICING_LIST_KEY);
      localStorage.removeItem(PRICE_DISPLAY_MODE_KEY);
    } catch (error) {
      console.error('Lỗi xóa cache bảng giá:', error);
    }
  }, []);

  return {
    pricingList,
    setPricingList,
    priceDisplayMode,
    setPriceDisplayMode,
    resetToDefault
  };
}
