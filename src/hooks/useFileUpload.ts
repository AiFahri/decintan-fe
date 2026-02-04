import { useState } from "react";
import { uploadFile as uploadFileAPI } from "@/api/endpoints/files";

interface UseFileUploadReturn {
  uploadFile: (file: File) => Promise<string>;
  isUploading: boolean;
  uploadError: string | null;
  resetError: () => void;
}

export const useFileUpload = (): UseFileUploadReturn => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const uploadFile = async (file: File): Promise<string> => {
    setIsUploading(true);
    setUploadError(null);

    try {
      const publicUrl = await uploadFileAPI(file);
      setIsUploading(false);
      return publicUrl;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Gagal mengupload file. Silakan coba lagi.";

      setUploadError(errorMessage);
      setIsUploading(false);

      throw new Error(errorMessage);
    }
  };

  const resetError = () => {
    setUploadError(null);
  };

  return {
    uploadFile,
    isUploading,
    uploadError,
    resetError,
  };
};
