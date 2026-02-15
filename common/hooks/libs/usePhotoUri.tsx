import { PHOTOS_DIR } from "@/common/constants/libs/photos";

export function usePhotoUri(filename: string | null | undefined): string {
  if (!filename) return "";
  return `${PHOTOS_DIR}${filename}`;
}