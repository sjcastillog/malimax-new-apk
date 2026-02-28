import { useClients } from "@/common/hooks";
import { API_URL } from "@/core/api/puceApi";
import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import UploadVideoScreen from "@/presentation/container-one-video/page";
import React from "react";
import { SafeAreaView } from "react-native";

const VideoUploadScreen = () => {
  const { token } = useAuthStore();

  const API_ENDPOINT = `${API_URL}/malimax-videos`;

  const handleUploadSuccess = (responseData: any) => {
    console.log("Video subido exitosamente:", responseData);
    // Aquí puedes navegar a otra pantalla, actualizar el estado global, etc.
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F7FA" }}>
      <UploadVideoScreen
        useClients={useClients}
        videoType="videoMalimax1"
        containerType="malimax"
        title="Video Contenedor"
        subtitle="Proceso de Inspección"
        iconName="cube-outline"
        apiEndpoint={API_ENDPOINT}
        authToken={token}
        onUploadSuccess={handleUploadSuccess}
      />
    </SafeAreaView>
    // </View>
  );
};

export default VideoUploadScreen;
