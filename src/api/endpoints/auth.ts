import { axiosInstance } from "../axiosInstance";
import type {
  SignInResponse,
  SelfSessionResponse,
  ApiUser,
  UserRole,
} from "@/features/auth/types/authTypes";

export const mapApiRoleToFrontend = (apiRole: string): UserRole => {
  if (apiRole === "Admin") return "admin";
  if (apiRole === "Employee") return "karyawan";
  return "karyawan";
};

export const mapApiUserToFrontend = (apiUser: ApiUser) => {
  let avatarUrl = `https://i.pravatar.cc/150?u=${apiUser.id}`;

  if (apiUser.photo_url) {
    if (apiUser.photo_url.startsWith("http")) {
      avatarUrl = apiUser.photo_url;
    } else {
      avatarUrl = `https://decintan-api.iyh.app/s3/decintan/${apiUser.photo_url}`;
    }
  }

  return {
    id: apiUser.id,
    name: apiUser.name,
    email: apiUser.email,
    role: mapApiRoleToFrontend(apiUser.role),
    jabatan: apiUser.position || (apiUser.role === "Admin" ? "Admin" : "Staff"),
    avatarUrl,
  };
};

export const signIn = async (email: string, password: string) => {
  const response = await axiosInstance.post<SignInResponse>("/auth", {
    email,
    password,
  });

  const { token, user } = response.data.payload;

  localStorage.setItem("decintan_token", token);

  return {
    token,
    user: mapApiUserToFrontend(user),
  };
};

export const selfSession = async () => {
  const response = await axiosInstance.get<SelfSessionResponse>("/auth");
  return mapApiUserToFrontend(response.data.payload);
};

export const signOut = () => {
  localStorage.removeItem("decintan_token");
};

export const changePassword = async (
  password: string,
  confirm_password: string,
) => {
  const response = await axiosInstance.put<void>("/auth/password", {
    password,
    confirm_password,
  });

  return response.status === 200;
};

export const updateProfile = async (payload: {
  name: string;
  email: string;
  position: string;
  photo_url: string;
}) => {
  const response = await axiosInstance.put<SelfSessionResponse>(
    "/auth/profile",
    payload,
  );
  return mapApiUserToFrontend(response.data.payload as ApiUser);
};
