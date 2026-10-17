export type PricingCategory = 'ink' | 'parts' | 'repair' | 'software' | 'custom';

export type PriceDisplayMode = 'zalo_contact' | 'custom_price';

export interface PricingItem {
  id: string;
  category: PricingCategory;
  categoryName: string;
  serviceName: string;
  applicableModels: string;
  price: string;
  rawPrice?: number;
  warranty: string;
  description: string;
  popular?: boolean;
  contactNote?: string;
  imageUrl?: string;
}
