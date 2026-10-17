export type PrinterBrand = 'Canon' | 'HP' | 'Brother' | 'Epson' | 'Pantum';
export type ProductCondition = 'new' | 'used';
export type StockStatus = 'in_stock' | 'low_stock' | 'contact';

export interface PrinterSpecs {
  type: string;
  functions: string;
  speed: string;
  connection: string;
  duplex: string;
  cartridge: string;
}

export interface PrinterProduct {
  id: string;
  name: string;
  brand: PrinterBrand;
  condition: ProductCondition;
  conditionText: string;
  price?: number;
  originalPrice?: number;
  priceContactText?: string;
  warranty: string;
  imageUrl: string;
  badge?: string;
  features: string[];
  specs: PrinterSpecs;
  gifts: string[];
  stockStatus: StockStatus;
}
