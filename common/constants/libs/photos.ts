import { File, Paths } from "expo-file-system";

export const PHOTOS_DIR = Paths.document.uri + "workflow_photos/";

export class PhotosHelper2 {
  static isRemoteOrBase64(filename: string): boolean {
    return (
      filename.startsWith("http://") ||
      filename.startsWith("https://") ||
      filename.startsWith("data:")
    );
  }

  static async deletePhotoFile(filename: string): Promise<void> {
    if (!filename || this.isRemoteOrBase64(filename)) {
      return;
    }

    try {
      const photoPath = `${PHOTOS_DIR}${filename}`;
      const file = new File(photoPath);

      if (file.exists) {
        file.delete();
        console.log(`🗑️ Archivo eliminado: ${filename}`);
      }
    } catch (error) {
      console.error(`⚠️ Error eliminando archivo ${filename}:`, error);
    }
  }

  static async cleanupWorkflowMultimedia(
    state: any,
    photoKeys: string[],
    videoKeys: string[],
  ): Promise<void> {
    // Eliminar fotos
    const photoPromises = photoKeys.map((key) =>
      this.deletePhotoFile(state[key] as string),
    );

    // Eliminar videos
    const videoPromises = videoKeys.map((key) =>
      this.deletePhotoFile(state[key] as string),
    );

    // Ejecutar todas las eliminaciones en paralelo
    await Promise.all([...photoPromises, ...videoPromises]);
  }
}
