import type {
  PurchasingOrder,
  InventoryStock,
  MonitorLoan,
  ReportDetail,
  UnitMaster,
  AssetLoan,
  FieldRequest,
} from "@/types/purchasing";

// NEW: Master Data - Units
export const unitsMock: UnitMaster[] = [
  { id: "unit-1", name: "Pcs", createdAt: "2025-01-01T00:00:00Z" },
  { id: "unit-2", name: "Kg", createdAt: "2025-01-01T00:00:00Z" },
  { id: "unit-3", name: "Sak", createdAt: "2025-01-01T00:00:00Z" },
  { id: "unit-4", name: "Liter", createdAt: "2025-01-01T00:00:00Z" },
  { id: "unit-5", name: "M²", createdAt: "2025-01-01T00:00:00Z" },
];

// NEW: Asset Loans
export const assetLoansMock: AssetLoan[] = [
  {
    id: "loan-1",
    loanDate: "2026-01-15",
    picName: "Budi Santoso",
    projectName: "Perumahan laguna",
    itemName: "Mesin Bor",
    qty: 2,
    unit: "Pcs",
    status: "borrowed",
    note: "Untuk pekerjaan blok A",
    createdAt: "2026-01-15T08:00:00Z",
  },
  {
    id: "loan-2",
    loanDate: "2026-01-10",
    picName: "Agus Wijaya",
    projectName: "Perumahan mekar",
    itemName: "Tangga Aluminium",
    qty: 1,
    unit: "Pcs",
    status: "returned",
    returnDate: "2026-01-17",
    note: "Dikembalikan lengkap",
    createdAt: "2026-01-10T09:00:00Z",
  },
];

// NEW: Field Requests (Employee Purchasing - Pengajuan → Barang Keluar flow)
export const fieldRequestsMock: FieldRequest[] = [
  {
    id: "freq-001",
    employeeId: "user-002",
    employeeName: "Budi Santoso",
    date: "2026-01-20",
    unit: "Pcs",
    projectName: "Perumahan Laguna",
    itemName: "Batu bata merah",
    photoUrl:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
    status: "pending",
    createdAt: "2026-01-20T08:30:00",
  },
  {
    id: "freq-002",
    employeeId: "user-003",
    employeeName: "Siti Rahma",
    date: "2026-01-19",
    unit: "Sak",
    projectName: "Ruko Sentosa",
    itemName: "Semen Gresik",
    photoUrl:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
    status: "approved",
    createdAt: "2026-01-19T10:15:00",
    qty: 50,
    pricePerUnit: 75000,
    totalPrice: 3750000,
    destination: "Site Ruko Sentosa",
    note: "Sudah diapprove, siap kirim",
  },
  {
    id: "freq-003",
    employeeId: "user-004",
    employeeName: "Andi Wijaya",
    date: "2026-01-18",
    unit: "Kg",
    projectName: "Perumahan Mekar",
    itemName: "Paku 2 inch",
    photoUrl:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
    status: "rejected",
    createdAt: "2026-01-18T14:20:00",
  },
];

export const purchasingOrdersMock: PurchasingOrder[] = [
  {
    id: "1",
    itemName: "Batu bata",
    supplier: "toko a",
    qty: 1,
    poDate: "2025-10-26",
    destination: "Perumahan laguna",
    note: "Blok D No 3",
    pricePerUnit: 50000,
    totalPrice: 50000,
    status: "processed",
  },
  {
    id: "2",
    itemName: "Pasir",
    supplier: "toko b",
    qty: 5,
    poDate: "2025-11-15",
    destination: "Perumahan mekar",
    note: "Urgent",
    pricePerUnit: 120000,
    totalPrice: 600000,
    status: "approved",
  },
  {
    id: "3",
    itemName: "Semen",
    supplier: "toko a",
    qty: 10,
    poDate: "2025-11-20",
    destination: "Perumahan harmony",
    note: "Sebelum tanggal 25",
    pricePerUnit: 65000,
    totalPrice: 650000,
    status: "rejected",
  },
  {
    id: "4",
    itemName: "Cat Tembok",
    supplier: "toko c",
    qty: 20,
    poDate: "2025-12-01",
    destination: "Perumahan indah",
    note: "Warna putih",
    pricePerUnit: 45000,
    totalPrice: 900000,
    status: "approved",
  },
  {
    id: "5",
    itemName: "Paku",
    supplier: "toko b",
    qty: 100,
    poDate: "2025-12-10",
    destination: "Gudang pusat",
    note: "Ukuran 3 inch",
    pricePerUnit: 500,
    totalPrice: 50000,
    status: "processed",
  },
];

export const inventoryStockMock: InventoryStock[] = [
  {
    id: "1",
    itemName: "Batu Bata",
    unit: "Pcs",
    supplier: "Toko a",
    itemIn: 12,
    itemOut: 3,
    currentStock: 9,
  },
  {
    id: "2",
    itemName: "Semen",
    unit: "Sak",
    supplier: "Toko b",
    itemIn: 50,
    itemOut: 20,
    currentStock: 30,
  },
  {
    id: "3",
    itemName: "Pasir",
    unit: "M³",
    supplier: "Toko a",
    itemIn: 100,
    itemOut: 45,
    currentStock: 55,
  },
  {
    id: "4",
    itemName: "Cat Tembok",
    unit: "Kaleng",
    supplier: "Toko c",
    itemIn: 80,
    itemOut: 30,
    currentStock: 50,
  },
  {
    id: "5",
    itemName: "Paku",
    unit: "Kg",
    supplier: "Toko b",
    itemIn: 200,
    itemOut: 150,
    currentStock: 50,
  },
  {
    id: "6",
    itemName: "Besi Beton",
    unit: "Batang",
    supplier: "Toko d",
    itemIn: 300,
    itemOut: 200,
    currentStock: 100,
  },
];

export const monitorLoansMock: MonitorLoan[] = [
  {
    id: "1",
    loanDate: "2026-01-05",
    itemName: "Scapolding",
    picName: "Pak Gabe",
    qtyBorrowed: 110,
    projectName: "Perumahan harmony",
    qtyReturn: 5,
    missingQty: 0,
    photoEvidenceUrl:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400",
  },
  {
    id: "2",
    loanDate: "2026-01-03",
    itemName: "Mesin Bor",
    picName: "Pak Andi",
    qtyBorrowed: 5,
    projectName: "Perumahan laguna",
    qtyReturn: 4,
    missingQty: 1,
    photoEvidenceUrl:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400",
  },
  {
    id: "3",
    loanDate: "2025-12-28",
    itemName: "Generator",
    picName: "Bu Siti",
    qtyBorrowed: 2,
    projectName: "Perumahan indah",
    qtyReturn: 2,
    missingQty: 0,
    photoEvidenceUrl:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400",
  },
  {
    id: "4",
    loanDate: "2025-12-20",
    itemName: "Tangga Lipat",
    picName: "Pak Budi",
    qtyBorrowed: 10,
    projectName: "Perumahan mekar",
    qtyReturn: 9,
    missingQty: 1,
    photoEvidenceUrl:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400",
  },
];

export const suppliersMock: import("@/types/purchasing").SupplierMaster[] = [
  {
    id: "toko-a",
    name: "Toko A",
    phone: "081234567890",
    address: "Jl. Contoh No. 1",
    createdAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: "toko-b",
    name: "Toko B",
    phone: "081234567891",
    address: "Jl. Contoh No. 2",
    createdAt: "2025-01-02T00:00:00.000Z",
  },
  {
    id: "toko-c",
    name: "Toko C",
    phone: "081234567892",
    address: "Jl. Contoh No. 3",
    createdAt: "2025-01-03T00:00:00.000Z",
  },
  {
    id: "toko-d",
    name: "Toko D",
    phone: "081234567893",
    address: "Jl. Contoh No. 4",
    createdAt: "2025-01-04T00:00:00.000Z",
  },
];

export const projectsMock: import("@/types/purchasing").ProjectMaster[] = [
  {
    id: "proj-1",
    name: "Perumahan Laguna",
    createdAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: "proj-2",
    name: "Perumahan Mekar",
    createdAt: "2025-01-02T00:00:00.000Z",
  },
  {
    id: "proj-3",
    name: "Perumahan Harmony",
    createdAt: "2025-01-03T00:00:00.000Z",
  },
  {
    id: "proj-4",
    name: "Perumahan Indah",
    createdAt: "2025-01-04T00:00:00.000Z",
  },
];

export const itemsMock = [
  { id: "item-1", name: "Batu Bata" },
  { id: "item-2", name: "Semen" },
  { id: "item-3", name: "Pasir" },
  { id: "item-4", name: "Cat Tembok" },
  { id: "item-5", name: "Paku" },
  { id: "item-6", name: "Scapolding" },
];

export function getReportDetails(
  _type: "supplier" | "proyek" | "barang",
  _entityId: string,
  _dateFrom: string,
  _dateTo: string,
): ReportDetail[] {
  const baseData: ReportDetail[] = [
    {
      no: 1,
      itemName: "Batu Bata",
      poDate: "2023-08-22",
      qty: 500,
      destination: "Perumahan Laguna",
      pricePerUnit: 1500,
      totalPrice: 750000,
      arrivalDate: "2023-09-22",
      proofOfGoods: "bukti_barang_001.jpg",
      proofOfTransfer: "bukti_tf_001.jpg",
      deliveryNote: "SJ-001/VIII/2023",
    },
    {
      no: 2,
      itemName: "Semen",
      poDate: "2023-08-25",
      qty: 100,
      destination: "Perumahan Harmony",
      pricePerUnit: 65000,
      totalPrice: 6500000,
      arrivalDate: "2023-09-25",
      proofOfGoods: "bukti_barang_002.jpg",
      proofOfTransfer: "bukti_tf_002.jpg",
      deliveryNote: "SJ-002/VIII/2023",
    },
    {
      no: 3,
      itemName: "Pasir",
      poDate: "2023-09-01",
      qty: 50,
      destination: "Perumahan Mekar",
      pricePerUnit: 120000,
      totalPrice: 6000000,
      arrivalDate: "2023-09-15",
      proofOfGoods: "bukti_barang_003.jpg",
      proofOfTransfer: "bukti_tf_003.jpg",
      deliveryNote: "SJ-003/IX/2023",
    },
  ];

  return baseData;
}

export function updateOrderStatus(
  orderId: string,
  newStatus: "approved" | "rejected",
): boolean {
  const order = purchasingOrdersMock.find((o) => o.id === orderId);
  if (order) {
    order.status = newStatus;
    return true;
  }
  return false;
}
