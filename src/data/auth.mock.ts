import type { User } from "@/features/auth/types/authTypes";

export const mockUsers: User[] = [
  {
    id: "user-001",
    name: "Syifa",
    email: "admin@decintan.com",
    role: "admin",
    jabatan: "Admin",
    avatarUrl: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: "user-002",
    name: "Budi Santoso",
    email: "budi@decintan.com",
    role: "karyawan",
    jabatan: "Staff IT",
    avatarUrl: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: "user-003",
    name: "Siti Nurhaliza",
    email: "siti@decintan.com",
    role: "karyawan",
    jabatan: "HRD Manager",
    avatarUrl: "https://i.pravatar.cc/150?img=45",
  },
];

// Mock current logged in user (for demo purposes)
export let currentUser: User | null = mockUsers[1]; // Default: Karyawan

export const mockLogin = (email: string, password: string): User | null => {
  const user = mockUsers.find((u) => u.email === email);
  if (user && password === "password123") {
    currentUser = user;
    return user;
  }
  return null;
};

export const mockLogout = () => {
  currentUser = null;
};

export const getCurrentUser = (): User | null => {
  return currentUser;
};

export const updateUserProfile = (
  userId: string,
  updates: Partial<User>
): User | null => {
  const userIndex = mockUsers.findIndex((u) => u.id === userId);
  if (userIndex !== -1) {
    mockUsers[userIndex] = { ...mockUsers[userIndex], ...updates };
    if (currentUser?.id === userId) {
      currentUser = mockUsers[userIndex];
    }
    return mockUsers[userIndex];
  }
  return null;
};

export const changePassword = (
  userId: string,
  newPassword: string
): boolean => {
  // In real app, this would hash and store password
  console.log(`Password changed for user ${userId}:`, newPassword);
  return true;
};
