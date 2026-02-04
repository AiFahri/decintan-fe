import { axiosInstance } from "../axiosInstance";
import axios from "axios";

export interface CreatePresignURLRequest {
  filename: string;
  content_type: string;
  size: number;
}

export interface PresignURLResponse {
  key: string;
  public_url: string;
  put_url: string;
}

export const createPresignURL = async (
  request: CreatePresignURLRequest,
): Promise<PresignURLResponse> => {
  const response = await axiosInstance.post<{
    message: string;
    payload: PresignURLResponse;
  }>("/files", request);

  return response.data.payload;
};

/**
 * Upload to S3 using presigned URL
 * Note: Do NOT use axiosInstance (S3 rejects Authorization headers)
 */
export const uploadBinaryToS3 = async (
  putUrl: string,
  file: File,
): Promise<void> => {
  await axios.put(putUrl, file, {
    headers: {
      "Content-Type": file.type,
    },
  });
};

export const uploadFile = async (file: File): Promise<string> => {
  const presignData = await createPresignURL({
    filename: file.name,
    content_type: file.type,
    size: file.size,
  });

  if (
    presignData.put_url.includes("localhost") ||
    presignData.put_url.includes("127.0.0.1")
  ) {
    throw new Error(
      "Backend mengembalikan localhost URL untuk upload. " +
        "S3 URL harus menggunakan public domain. " +
        "Hubungi backend developer untuk fix konfigurasi S3.",
    );
  }

  await uploadBinaryToS3(presignData.put_url, file);

  return presignData.key;
};
