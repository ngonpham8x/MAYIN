export interface MaintenancePlan {
  id: string;
  name: string;
  targetAudience: string;
  pricePerMonth: string;
  badge?: string;
  isPopular?: boolean;
  features: string[];
  commitments: string[];
}

export interface ServiceBooking {
  id: string;
  customerName: string;
  phoneNumber: string;
  address: string;
  district?: string;
  serviceType: string;
  printerBrand: string;
  printerModel?: string;
  symptoms: string[];
  notes?: string;
  timeSlot?: string;
  preferredDate?: string;
  status: 'pending' | 'confirmed' | 'technician_assigned' | 'completed';
  createdAt: string;
  estimatedPriceRange?: string;
}
