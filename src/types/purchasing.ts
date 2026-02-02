export type OrderStatus = "processed" | "rejected" | "approved" | "completed";
export type ReportType = "supplier" | "proyek" | "barang";
export type AssetLoanStatus = "borrowed" | "returned";

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

// NEW: For dynamic order entry (Pemesanan tab)
export interface OrderItem {
  itemName: string;
  qty: number;
  unit: string;
  pricePerUnit: number;
  totalPrice: number;
  note?: string;
}

// NEW: Master Data - Unit/Satuan
export interface UnitMaster {
  id: string;
  name: string;
  createdAt: string;
}

// NEW: Master Data - Project
export interface ProjectMaster {
  id: string;
  name: string;
  createdAt: string;
}

// NEW: Master Data - Supplier
export interface SupplierMaster {
  id: string;
  name: string;
  phone: string;
  address: string;
  createdAt: string;
}

// NEW: Asset Loan Management
export interface AssetLoan {
  id: string;
  loanDate: string;
  picName: string;
  projectName: string;
  itemName: string;
  qty: number;
  unit: string;
  status: AssetLoanStatus;
  note?: string;
  returnDate?: string;
  missingQty?: number;
  missingEvidenceUrl?: string;
  createdAt: string;
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

export interface FieldRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  unit: string;
  projectName: string;
  itemName: string;
  photoUrl: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  qty?: number;
  pricePerUnit?: number;
  note?: string;
  totalPrice?: number;
  destination?: string;
}
