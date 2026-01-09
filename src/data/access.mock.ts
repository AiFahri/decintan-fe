// Mock data untuk access matrix / RBAC system
export interface UserPermission {
  userId: string;
  userName: string;
  position: string;
  permissions: {
    purchasing: {
      satuan: boolean;
      proyek1: boolean;
      proyek2: boolean;
      stok: boolean;
      pemesanan: boolean;
      barangKeluar: boolean;
      persetujuang: boolean;
      permintaanAset: boolean;
    };
    // Future: add more modules (absensi, keuangan, etc.)
  };
}

// Mock users dengan permissions
let usersPermissions: UserPermission[] = [
  {
    userId: "1",
    userName: "Admin - Syifa",
    position: "Administrator",
    permissions: {
      purchasing: {
        satuan: true,
        proyek1: false,
        proyek2: true,
        stok: false,
        pemesanan: true,
        barangKeluar: false,
        persetujuang: true,
        permintaanAset: false,
      },
    },
  },
  {
    userId: "2",
    userName: "Admin - Bella",
    position: "Administrator",
    permissions: {
      purchasing: {
        satuan: false,
        proyek1: true,
        proyek2: false,
        stok: true,
        pemesanan: false,
        barangKeluar: true,
        persetujuang: false,
        permintaanAset: true,
      },
    },
  },
  {
    userId: "3",
    userName: "Staff - Andi",
    position: "Staff Purchasing",
    permissions: {
      purchasing: {
        satuan: true,
        proyek1: true,
        proyek2: false,
        stok: true,
        pemesanan: true,
        barangKeluar: false,
        persetujuang: false,
        permintaanAset: false,
      },
    },
  },
  {
    userId: "4",
    userName: "Manager - Budi",
    position: "Manager",
    permissions: {
      purchasing: {
        satuan: true,
        proyek1: true,
        proyek2: true,
        stok: true,
        pemesanan: true,
        barangKeluar: true,
        persetujuang: true,
        permintaanAset: true,
      },
    },
  },
  {
    userId: "5",
    userName: "Staff - Citra",
    position: "Staff Gudang",
    permissions: {
      purchasing: {
        satuan: false,
        proyek1: false,
        proyek2: false,
        stok: true,
        pemesanan: false,
        barangKeluar: true,
        persetujuang: false,
        permintaanAset: false,
      },
    },
  },
];

// Get all users permissions
export function getAllUsersPermissions(): UserPermission[] {
  return [...usersPermissions];
}

// Update user permission for specific feature
export function updateUserPermission(
  userId: string,
  module: "purchasing",
  feature: keyof UserPermission["permissions"]["purchasing"],
  value: boolean
): boolean {
  const userIndex = usersPermissions.findIndex((u) => u.userId === userId);
  if (userIndex === -1) return false;

  usersPermissions[userIndex].permissions[module][feature] = value;
  return true;
}

// Get permission for specific user
export function getUserPermissions(userId: string): UserPermission | null {
  return usersPermissions.find((u) => u.userId === userId) || null;
}

// Reset permissions (for testing)
export function resetPermissions(): void {
  // Reset to default state
  usersPermissions = getAllUsersPermissions();
}
