import NetInfo from '@react-native-community/netinfo';

const PING_TIMEOUT = 3000; // 3 segundos
const PING_URL = "https://puce.younet.ec";

export const checkInternetQuality = async (): Promise<boolean> => {
  console.log("📡 Verificando conexión a internet...");
  // 1. Verificar si hay conexión
  const netInfo = await NetInfo.fetch();
  if (!netInfo.isConnected) return false;

  // 2. Verificar calidad con ping
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), PING_TIMEOUT);

  try {
    const startTime = Date.now();
    const response = await fetch(PING_URL, {
      method: "HEAD",
      signal: controller.signal,
      cache: "no-cache",
    });
    clearTimeout(timeoutId);

    const responseTime = Date.now() - startTime;
    
    // Buena calidad: responde OK y en menos de 3 segundos
    return response.ok && responseTime < 3000;
  } catch (error) {
    clearTimeout(timeoutId);
    return false;
  }
};