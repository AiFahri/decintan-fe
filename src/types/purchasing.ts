export type OrderStatus = 'processed' | 'rejected' | 'approved';
export type ReportType = 'supplier' | 'proyek' | 'barang';

export interface PurchasingOrder {
  id: string;
  itemName: string;
  supplier: string;
  qty: number;
  poDate: string; 
  destination: string;
  note: string;
  pricePerUnit: number;
  totalPrice: number;
  status: OrderStatus;
}

export interface InventoryStock {
  id: string;
  itemName: string;
  unit: string;
  supplier: string;
  itemIn: number;
  itemOut: number;
  currentStock: number;
}

export interface MonitorLoan {
  id: string;
  loanDate: string; 
  itemName: string;
  picName: string;
  qtyBorrowed: number;
  projectName: string;
  qtyReturn: number;
  missingQty: number;
  photoEvidenceUrl: string;
}

export interface ReportDetail {
  no: number;
  itemName: string;
  poDate: string;
  qty: number;
  destination: string;
  pricePerUnit: number;
  totalPrice: number;
  arrivalDate: string;
  proofOfGoods: string; 
  proofOfTransfer: string; 
  deliveryNote: string; 
}

export interface ReportFilter {
  type: ReportType;
  entityId: string;
  entityName: string;
  dateFrom: string;
  dateTo: string;
}
