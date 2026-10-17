import { PrinterProduct } from './product.types';

export interface CartItem {
  product: PrinterProduct;
  quantity: number;
}
