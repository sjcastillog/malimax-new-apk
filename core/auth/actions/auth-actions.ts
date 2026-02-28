import { puceApi } from "@/core/api/puceApi";
import { checkInternetQuality } from "@/helpers";
import { SecureStorageAdapter } from "@/helpers/adapters/secure-storage.adapter";
import { ServiceResponseI, UsersLoginResponseI } from "../interface/";

const CACHE_KEY = "auth_user_cache";

const returnUserToken = (data: UsersLoginResponseI) => {
  const { token, ...user } = data;
  return { user: data, token };
};

const saveToCache = async (data: any) => {
  try {
    await SecureStorageAdapter.setItem(CACHE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error guardando caché:", error);
  }
};

const getFromCache = async () => {
  try {
    const cached = await SecureStorageAdapter.getItem(CACHE_KEY);
    return cached ? JSON.parse(cached) : null;
  } catch (error) {
    return null;
  }
};

export const clearAuthCache = async () => {
  await SecureStorageAdapter.deleteItem(CACHE_KEY);
};

export const authLogin = async (user: string, password: string) => {
  user = user.trim();
  try {
    const { data: ladata } = await puceApi.post<
      ServiceResponseI<UsersLoginResponseI>
    >("/users/login", { user, password });

    const result = returnUserToken(ladata.data!);
    await saveToCache(result);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const authCheckStatus = async () => {
  const hasGoodInternet = await checkInternetQuality();

  if (!hasGoodInternet) {
    console.log("📡 Usando caché (sin internet o conexión lenta)");
    return await getFromCache();
  }

  try {
    const { data: dataAuth } = await puceApi.get<
      ServiceResponseI<UsersLoginResponseI>
    >("/users/check-status");

    if (!dataAuth) return false;

    const result = returnUserToken(dataAuth.data!);
    await saveToCache(result);
    return result;
  } catch (error) {
    console.log("⚠️ Error en servidor, usando caché");
    return false;
  }
};
